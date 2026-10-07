# Design

## Context

Ver `proposal.md - Why`. Em resumo: com o `.eslintrc.json` corrigido, o ESLint passou a rodar no `next build` e reporta 21 erros em 9 arquivos. Nenhum é erro de lógica — são violações de estilo/tipagem que nunca foram vistas porque o lint estava efetivamente desligado (a config não carregava).

Diagnóstico já levantado (`npx next lint`), por regra:

| Regra | Qtd | Arquivos |
|-------|-----|----------|
| `@typescript-eslint/no-wrapper-object-types` | 3 | `idToSubjects.ts:5`, `userModel.ts:24`, `UpdateStudentForm.tsx:18` |
| `prefer-const` | 6 | `AddPlanningSubjects.tsx:42`, `EditPlanningForm.tsx:109`, `SubjectUpdateForm.tsx:45`, `months.ts:172,175,180` |
| `@typescript-eslint/no-unused-expressions` | 4 | `LoginForm.tsx:49`, `RegisterForm.tsx:67`, `ChangeEmailPage.tsx:31`, `darkMode.tsx:33` |
| `react/no-children-prop` | 4 | `UserDataComp.tsx:90,97,102,108` |
| `react/no-unescaped-entities` | 4 | `TermsOfUse.tsx:61,80` |

## Goals / Non-Goals

**Goals:**
- Fazer `next build` concluir com zero erros de ESLint, destravando o deploy na Vercel.
- Preservar 100% do comportamento em runtime.
- Manter as regras de qualidade ativas (não silenciar o lint).

**Non-Goals:**
- Resolver os `Warning` (`react-hooks/exhaustive-deps`, `@next/next/no-img-element`, `jsx-a11y/alt-text`). Warnings não falham o build.
- Migrar para ESLint flat config (`eslint.config.mjs`).
- Refatorar a lógica de planejamento/matérias.

## Decisions

**1. Corrigir o código, não desligar regras.**
Alternativa considerada: adicionar `"@typescript-eslint/no-unused-expressions": "off"` etc. ao `.eslintrc.json`. Rejeitada porque oficializa dívida e as correções são mecânicas e seguras. Desligar regras é o padrão que já causou confusão antes (o `no-unused-expressions` base não desligava a versão TS).

**2. Mapa de correção por regra (todas semanticamente equivalentes):**

| Regra | Correção |
|-------|----------|
| `no-wrapper-object-types` | `Array<String>` → `Array<string>`; `useState(Array<String>)` → `useState<string[]>([])`. O `type: String` do Mongoose **não** muda (é construtor JS, não tipo TS). |
| `prefer-const` | `let` → `const` apenas nas variáveis nunca reatribuídas. Em `months.ts`, `subjectIndex`/`portuguesIndex`/`matematicaIndex` continuam `let`. |
| `no-unused-expressions` | Ternário-como-statement → `if/else` equivalente. |
| `no-children-prop` | `children={<X/>}` → `<X/>` aninhado entre as tags. (`Accordion` já renderiza `{children}`.) |
| `no-unescaped-entities` | Usar `&apos;`/`&quot;` para manter exatamente o mesmo caractere renderizado. |

**3. `useState(Array<String>)` é um lazy initializer que retorna `[]`.** Trocar por `useState<string[]>([])` mantém o estado inicial idêntico.

## Risks / Trade-offs

- **[Alguma edição mudar comportamento]** → Todas as 21 correções são equivalentes semânticas; verificação por `npx next lint` (zero erros) e `npx next build` (conclusão).
- **[Escapar entidades alterar o texto exibido]** → Mitigado usando `&apos;`/`&quot;`, que renderizam o mesmo `'` e `"` do texto original.
- **[Warnings continuarem acumulando]** → Fora de escopo; não bloqueiam build. Podem ser tratados depois (task separada) sem afetar esta mudança.

## Migration Plan

Sem migração de dados ou runtime. Aplicar as correções, confirmar `next lint`/`next build` localmente e publicar. Rollback = reverter o commit.

## Open Questions

Nenhuma.
