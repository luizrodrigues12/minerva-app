# Design

## Context

Ver `proposal.md - Why`. Fatos do repositório que moldam a abordagem:

- Dois lockfiles versionados: `yarn.lock` (Yarn 1) e `package-lock.json`. A Vercel buildou com `yarn run build`; `yarn` não está instalado localmente. Node `v24.21.0`, npm `12.1.0`, `corepack 0.36.0` disponível.
- Não existe suíte de testes automatizados. A verificação é `npm run lint` + `npm run build` + smoke manual.
- Lint acabou de ser zerado (change `fix-vercel-lint-build`). O upgrade reabre essa superfície.
- Mapa de uso das libs de risco: `motion/react` em ~17 componentes; `flowbite-react` + `flowbite-react-icons` em quase toda a UI; `tailwind.config.ts` usa `content()`/`plugin()` de `flowbite-react/tailwind`; `postcss.config.mjs` usa o plugin `tailwindcss` do v3; `mongoose`/`mongodb` nos models e rotas de API; `bcrypt`, `nodemailer`, `jsonwebtoken` nos fluxos de conta.
- Sem uso encontrado para: `swr`, `jose`, `sharp`, `@as-integrations/next` (e `npm` como dependência). `mongodb` e `@types/mongoose` precisam de confirmação no apply.

## Goals / Non-Goals

**Goals:**
- npm como único gerenciador; `yarn.lock` removido; Vercel instalando via npm.
- Atualizar todas as dependências, incluindo majors, **sem regressão funcional**.
- Manter `npm run lint` e `npm run build` verdes ao fim de cada fase.

**Non-Goals:**
- Adicionar features ou refatorar lógica de negócio.
- Criar suíte de testes automatizados (fora de escopo; recomendação separada).
- Redesenhar UI/estilo — apenas compatibilizar com Tailwind 4.

## Decisions

**1. Padronizar no npm (não no Yarn).**
npm já está instalado (12.1.0), o `package-lock.json` já é versionado, e a Vercel detecta o gerenciador pelo lockfile. Alternativa de habilitar Yarn via `corepack` foi rejeitada por adicionar uma ferramenta a mais sem ganho.

**2. Atualização em fases, um grupo por vez, validando a cada fase.**
Sem testes automatizados, "atualizar tudo de uma vez" tornaria impossível isolar uma regressão. Cada fase termina com `npm run lint` + `npm run build` e um commit próprio (rollback granular).

**3. Ordem das fases (do menor para o maior risco, isolando o framework por último):**

```
Fase 0  Padronizar no npm (SEM subir versoes) -> baseline verde
Fase 1  npm update (minors/patch dentro da faixa)
Fase 2  Tailwind 4 + flowbite + PostCSS
Fase 3  Libs isoladas: motion, react-dropzone, cookies-next, uuid, dotenv,
        nodemailer, bcrypt, @tanstack/react-query, uploadthing, react-to-print
Fase 4  Camada de dados: mongoose 9 + mongodb 7
Fase 5  Framework + toolchain: next 16, react 19.3, eslint 10 + flat config,
        eslint-config-next 16, typescript 7, @types/node 26
Fase 6  Limpeza (remover nao usadas) + verificacao final
```

**4. ESLint 10 exige flat config.** Migrar `.eslintrc.json` → `eslint.config.mjs` (export flat do `eslint-config-next`) e trocar o script `lint` de `next lint` (removido no Next 16) para `eslint .`. O `.eslintrc.json` atual não tem regras customizadas além das desligadas — reproduzi-las no flat config.

**5. Tailwind 4 com caminho de menor churn.** Usar o modo de compatibilidade `@config` (mantém `tailwind.config.ts`) e trocar o PostCSS para `@tailwindcss/postcss`. A compatibilidade do helper `flowbite-react/tailwind` com v4 precisa ser confirmada; fallback: embutir `content()`/`plugin()` diretamente ou fixar `flowbite-react` numa versão compatível. Se nem isso funcionar, **pausar** e decidir com o usuário (não silenciar).

> **Atualização (apply):** `flowbite-react@0.12.17` declara `tailwindcss: "^3 || ^4"` — suporta v4. **Porém o subpath `flowbite-react/tailwind` foi removido em 0.12** (o `tailwind.config.ts` importa `content`/`plugin` de lá). A integração passa a ser por `flowbite-react/plugin/tailwindcss` (que expõe um `style`/CSS) e/ou `@source`. A migração desse import (e do `globals.css` para `@import "tailwindcss"` + `@plugin`/`@config`) é parte da Fase 2. A API exata deve ser confirmada na doc do flowbite-react 0.12 antes de aplicar.

**6. `resolutions` → `overrides`.** O npm ignora `resolutions`. Migrar os pins de `@types/react`/`@types/react-dom` para `overrides`.

**7. Remover dependências não usadas em vez de subir majors delas.** `swr`, `jose`, `sharp`, `@as-integrations/next` não são importados; `npm` não é dependência de app. Reduz superfície de risco. (`mongodb`, `@types/mongoose` só remover se o audit confirmar; `@types/mongoose` está obsoleto.)

**8. Verificação por fase + smoke manual final.** Fases: `lint` + `build`. Final (fluxos que tocam os pacotes migrados): cadastro + login (bcrypt/jwt), criar aluno/matérias (mongoose), gerar planejamento + PDF (react-to-print/motion), upload de avatar (uploadthing/sharp), verificar email e recuperar senha (nodemailer/jwt).

**9. Branch dedicada e commit por fase.** Deploy de preview na Vercel depois de fases-chave para validar a instalação via npm.

**10. Trocar `bcrypt` por `bcryptjs` (decidido durante o apply).**
O npm 12 bloqueia scripts de instalação por padrão (`allow-scripts`), e o `bcrypt@5` depende de `node-pre-gyp`/`node-gyp` para gerar o binário nativo — após `npm ci`, o `bcrypt` fica quebrado (`bcrypt_lib.node` ausente), o que derruba login/registro. Alternativas: aprovar o script (executa código de terceiros no install) ou usar `bcryptjs`, que é JS puro, sem build, e **compatível com os hashes `$2a$/$2b$` já gravados** (usuários existentes continuam logando). Escolhido `bcryptjs`. Troca de import em 4 rotas; `@types/bcrypt` sai (o `bcryptjs` v3 traz tipos próprios).

**11. Corrigir os updates não-atômicos (decidido durante o apply).** A verificação da Fase 4 revelou que várias rotas enviavam documentos de update **sem operador atômico** (`{ alunos: [...] }`, `{ "alunos.$[a].planning": [...] }`, `{ password: ... }`, `{ isVerified: true }`, `{ avatar: null }`, etc.) e uma usava `$Set` (maiúsculo). O MongoDB rejeita ambos (`Update document requires atomic operators` / `Unknown modifier: $Set`) — **não é regressão do mongoose 9**, foi reproduzido com o driver cru. Corrigido envolvendo em `$set`/`$pull` e trocando `$Set`→`$set` em 10 arquivos, com E2E real (CRUD de aluno e de planejamento) validando.

## Risks / Trade-offs

- **[Tailwind 4 incompatível com flowbite]** → confirmar cedo; fallback com `@config`/pins; se bloquear, pausar e decidir.
- **[ESLint 10 flat config reabre erros de lint]** → corrigir incrementalmente; manter o portão de "zero erros".
- **[Next 16 muda API (ex.: `next lint` removido, request APIs assíncronas, middleware)]** → usar `npx @next/codemod@latest upgrade latest`, depois build/lint.
- **[TypeScript 7 incompatível com o ecossistema/Next]** → se a tipagem quebrar de forma insolúvel, **pausar e expor**; manter TS 5.x como exceção decidida pelo usuário, não silenciada.
- **[Mongoose 9 quebra API]** → revisar changelog; exercitar as rotas de API que usam `findOneAndUpdate`/`arrayFilters`.
- **[Sem testes automatizados]** → regressão silenciosa; mitigado por fases + smoke checklist; sugere-se change futura de testes.
- **[Vercel instalando errado após remover yarn.lock]** → adicionar `packageManager`/`engines.node` e validar num deploy de preview.
- **[npm 12 bloqueia install-scripts de módulos nativos]** → `bcrypt` quebra após `npm ci`; mitigado trocando por `bcryptjs` (decisão 10). Reavaliar em qualquer outro módulo nativo.
- **[Um major exigir refactor real além de bump]** → pausar e criar task/change adicional; não absorver em silêncio.

## Migration Plan

1. Branch dedicada; garantir baseline verde (`lint` + `build`) na Fase 0.
2. Executar fases em ordem, commit por fase, testando a cada uma.
3. Deploy de preview na Vercel após as fases 0, 2, 4 e 5.
4. Rollback: reverter os commits da fase; restaurar `yarn.lock` só como medida extrema de emergência (não é o estado desejado).

## Open Questions

- `mongodb`, `@types/mongoose`, `sharp` e `@as-integrations/next` são realmente não usados? Confirmar com busca no apply; a resposta só muda a Fase 6 (remover vs. atualizar), não a abordagem. (O audit já sinalizou `swr`/`jose`/`sharp`/`@as-integrations/next` como sem import.)
