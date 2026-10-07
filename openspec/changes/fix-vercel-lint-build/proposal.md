# Proposal

## Why

O deploy na Vercel falha no passo `next build` porque o ESLint — agora que a configuração carrega corretamente — reporta 21 erros em 9 arquivos. Enquanto isso não for resolvido, nenhuma publicação passa, mesmo que o código funcione em desenvolvimento (`next dev` não roda lint).

## What Changes

- Corrigir os 21 erros de ESLint que bloqueiam o build, de forma **mecânica e preservando o comportamento**:
  - `String` → `string` em posições de tipo TypeScript (3 ocorrências) — o `type: String` do Mongoose permanece, pois ali é o construtor JS.
  - `let` → `const` para variáveis que nunca são reatribuídas (6 ocorrências).
  - Ternário usado como statement → `if/else` equivalente (4 ocorrências).
  - Passar `children={<X/>}` como prop → aninhar o filho entre as tags (4 ocorrências).
  - Escapar aspas/apóstrofos no texto JSX, mantendo o mesmo caractere renderizado (4 ocorrências).
- Manter as regras de qualidade ativas: **não** desligar regras no ESLint para mascarar os erros.
- Corrigir a configuração `.eslintrc.json`, que referenciava um config inexistente (`"react-hooks"` no `extends`) — essa correção já foi aplicada e é parte do escopo, pois foi o que fez o lint voltar a rodar e revelar os erros.

## Capabilities

### New Capabilities

Nenhuma. Esta é uma mudança de tooling/qualidade de build, sem alteração de comportamento observável em runtime; por isso a change declara `skip_specs: true` e não cria spec.

### Modified Capabilities

Nenhuma.

## Impact

- Código: 9 arquivos em `src/` (actions, components, contexts, models, utils).
- Configuração: `.eslintrc.json`.
- Sem impacto em APIs, banco de dados, dependências, contratos ou comportamento do usuário.
- Efeito observável: `next build` (e o deploy na Vercel) passa a concluir sem erros de lint.
