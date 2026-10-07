# Tasks

## 1. Padronizar no npm (Fase 0)

- [x] 1.1 Criar branch dedicada e confirmar baseline verde: `npm run lint` (0 erros) e `npm run build` (sucesso) antes de qualquer mudança.
- [x] 1.2 Remover `yarn.lock` do repositório (e do git); garantir `package-lock.json` como única fonte. Verificar: `git ls-files` não lista mais `yarn.lock`.
- [x] 1.3 Migrar `resolutions` → `overrides` no `package.json`; adicionar `"packageManager": "npm@12.1.0"` e `engines.node`; remover `npm` de `dependencies`. Verificar: `npm install` conclui e `npm ls @types/react` mostra o pin via `overrides`.
- [x] 1.4 Substituir `bcrypt` por `bcryptjs` (npm 12 bloqueia o build nativo do bcrypt): `npm uninstall bcrypt @types/bcrypt` + `npm install bcryptjs`, e trocar `import bcrypt from "bcrypt"` por `"bcryptjs"` nas 4 rotas de auth (login, register, change_password, reset_password). Verificar: `node dep-check.cjs` reporta `bcryptjs OK` e o hash continua compatível.
- [x] 1.5 Validação de instalação limpa: `npm ci` e `npm run build` (sem binário nativo de bcrypt). Verificar: build conclui com sucesso.

## 2. Atualizar dentro das faixas (Fase 1)

- [x] 2.1 Rodar `npm update` (minors/patch dentro das faixas). Verificar: `npm run lint` (0 erros) e `npm run build` (sucesso).
- [x] 2.2 Registrar no diff o que subiu nesta fase e commitar separadamente. Verificar: commit contém apenas `package.json` + `package-lock.json` desta fase.

## 3. Tailwind 4 + flowbite + PostCSS (Fase 2)

- [x] 3.1 Confirmar suporte do `flowbite-react` (versão alvo 0.12.x) ao Tailwind 4, incluindo `flowbite-react/tailwind` (`content()`/`plugin()`). Verificar: achado registrado; se incompatível, **pausar** e decidir (fallback `@config`/pin).
- [x] 3.2 Atualizar `tailwindcss` 3→4, `postcss` e `autoprefixer`; ajustar `postcss.config.mjs` para `@tailwindcss/postcss` e adotar `@config` no `globals.css`/`tailwind.config.ts`. Verificar: `npm run build` gera CSS sem erro.
- [x] 3.3 Smoke visual de tema/componentes (variáveis CSS + Flowbite) em login, home e planning. Verificar: cores/tema e componentes renderizam como antes.

## 4. Libs isoladas (Fase 3)

- [x] 4.1 `motion` 11→14: confirmar que `motion/react` resolve e as animações de `Button`/`Header` funcionam. Verificar: build + animação observada.
- [x] 4.2 `react-dropzone` 14→20: abrir a dropzone em `PhotoForm` e enviar uma imagem. Verificar: seleção de arquivo funciona; build ok.
- [x] 4.3 `cookies-next` 5→6: ler/remover cookie no login e no logout. Verificar: sessão persiste/limpa como antes.
- [x] 4.4 `uuid` 11→14: geração de id em `add_student` e `add_planning`. Verificar: id válido gerado; build ok.
- [x] 4.5 `dotenv` 16→18 e `nodemailer` 6→10 (o `bcrypt` já saiu na Fase 0): exercitar verificação de email e recuperação de senha. Verificar: email dispara sem erro.
- [x] 4.6 `@tanstack/react-query`, `uploadthing`, `react-to-print`, `jsonwebtoken`, `nextjs-toploader` (últimas): rodar `npm run lint` + `npm run build`. Verificar: ambos verdes.

## 5. Camada de dados (Fase 4)

- [x] 5.1 `mongoose` 8→9 (e `mongodb` 6→7, ou remover se não usado): revisar changelog e ajustar `dbConfig`, models e rotas que usam `findOneAndUpdate`/`arrayFilters`/`ObjectId`. Verificar: build + login (busca por email) e CRUD de aluno funcionando.
- [x] 5.2 Smoke das rotas de planejamento (add/update/delete). Verificar: criar, editar e excluir planejamento sem erro.

## 6. Framework + toolchain (Fase 5)

- [x] 6.1 Migrar ESLint para flat config (`eslint.config.mjs`) reproduzindo as regras atuais e trocar o script `lint` para `eslint .`. Verificar: `npm run lint` retorna o mesmo resultado (0 erros) que antes da migração.
- [x] 6.2 `next` 15→16, `react`/`react-dom` 19.0→19.3, `eslint-config-next` 15→16, `eslint` 9→10; rodar `npx @next/codemod@latest upgrade latest` e ajustar `next.config.ts`/middleware conforme o changelog. Verificar: `npm run build` sucesso e app sobe.
- [ ] 6.3 `typescript` 5→7, `@types/node` 22→26 e `@types/react`/`@types/react-dom`/`@types/nodemailer` alinhados. Verificar: `npx tsc --noEmit` e `npm run build`; se o TS 7 for incompatível, **pausar** e decidir.

## 7. Limpeza e verificação final (Fase 6)

- [ ] 7.1 Auditar imports e remover dependências não usadas (`swr`, `jose`, `sharp`, `@as-integrations/next`, `npm`; `mongodb`/`@types/mongoose` se confirmado). Verificar: `npm run lint` + `npm run build` verdes sem elas.
- [ ] 7.2 Rodar `npm audit` e resolver vulnerabilidades sem `--force` cego. Verificar: sem vulnerabilidade alta/crítica (ou exceção registrada).
- [ ] 7.3 Smoke manual completo: cadastro, login, criar aluno/matérias, gerar planejamento + PDF, upload de avatar, verificar email, recuperar senha. Verificar: todos os fluxos concluem sem erro.
- [ ] 7.4 Deploy de preview na Vercel e confirmar build via npm (sem `yarn.lock`) com app funcional. Verificar: preview verde.
