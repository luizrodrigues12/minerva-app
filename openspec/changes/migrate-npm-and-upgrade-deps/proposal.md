# Proposal

## Why

O projeto versiona **dois lockfiles** (`yarn.lock` v1 e `package-lock.json`), mas a Vercel builda com `yarn` enquanto localmente `yarn` nem está instalado. Isso é uma armadilha: qualquer `npm install`/`npm update` local atualiza o `package-lock.json` e deixa o `yarn.lock` velho, então a Vercel instala uma árvore de dependências **diferente** da que foi testada. Ao mesmo tempo, as dependências estão bastante atrasadas, com vários majors acumulados (Next 16, React 19.3, Tailwind 4, TypeScript 7, Mongoose 9, motion 14...). Padronizar em npm e atualizar tudo remove a ambiguidade e a dívida técnica.

## What Changes

- **BREAKING (build/instalação)**: remover `yarn.lock` e padronizar o projeto em **npm** (`package-lock.json` + `package.json` como únicas fontes).
- Converter o campo `resolutions` (específico do Yarn) para `overrides` (do npm), que o npm ignora hoje.
- Adicionar `packageManager` (e `engines.node`) ao `package.json`; remover `npm` de `dependencies` (não é dependência de aplicação).
- Auditar e **remover dependências não importadas** em nenhum lugar (`swr`, `jose`, `sharp`, `@as-integrations/next`; `mongodb` e `@types/mongoose` a confirmar), em vez de subir majors de pacotes sem uso.
- Atualizar as demais dependências, **incluindo majors**:
  - Framework: `next` 15→16, `react`/`react-dom` 19.0→19.3, `eslint-config-next` 15→16.
  - Lint/tipos: `eslint` 9→10, `@tanstack/eslint-plugin-query`, `typescript` 5→7, `@types/node` 22→26.
  - Estilo/build: `tailwindcss` 3→4, `postcss`, `autoprefixer`.
  - Dados: `mongoose` 8→9, `mongodb` 6→7.
  - Libs: `motion` 11→14, `flowbite-react` 0.10→0.12, `flowbite-react-icons`, `nodemailer` 6→10, `bcrypt` 5→6, `react-dropzone` 14→20, `uuid` 11→14, `cookies-next` 5→6, `dotenv` 16→18, `@tanstack/react-query`, `uploadthing`, `nextjs-toploader`, `react-to-print`, `jsonwebtoken`.
- **Migração de configuração de lint**: `.eslintrc.json` → flat config `eslint.config.mjs` (ESLint 10 remove o formato `.eslintrc`; e o comando `next lint` sai no Next 16).
- **Sem mudança funcional**: nenhuma feature nova/alterada. Critério central é "não quebrar nada" — build e lint continuam passando e os fluxos principais seguem funcionando.

## Capabilities

### New Capabilities

Nenhuma. É manutenção de dependências/tooling, sem alteração de comportamento observável; a change declara `skip_specs: true`.

### Modified Capabilities

Nenhuma.

## Impact

- **Dependências/lockfile**: toda a árvore; `package.json`; remoção de `yarn.lock`.
- **Configuração**: `.eslintrc.json` → `eslint.config.mjs`; `postcss.config.mjs`; `tailwind.config.ts` (ou config CSS-first no v4); possivelmente `tsconfig.json` e `next.config.ts`.
- **Vercel**: passa a instalar via npm (detecção por lockfile); mudança no tempo/modo de build.
- **Código em risco de API quebrada**: `mongoose`/`mongodb` (rotas de API e models), `motion` (~17 componentes), `react-dropzone`, `cookies-next`, `bcrypt`, `nodemailer`, `uuid`, `@tanstack/react-query`.
- **Maior risco de regressão**: Tailwind 4 + `flowbite-react/tailwind`, migração de ESLint para flat config, salto Next 15→16, e Mongoose 8→9.
