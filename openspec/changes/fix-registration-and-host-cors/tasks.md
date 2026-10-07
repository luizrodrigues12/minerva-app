# Tasks

## 1. Chamadas same-origin no cliente

- [x] 1.1 Listar os usos de `process.env.HOST` e classificar cliente vs servidor; verificar que a lista bate com a busca no código (31 ocorrências).
- [x] 1.2 Trocar `${process.env.HOST}/api/...` por `/api/...` nos hooks (`useAvatarMutate`, `useDeleteAvatar`, `useAddStudent`, `useChecksMutate`, `useDeleteUser`, `useDeleteStudent`, `useVerifyMutate`, `useParentsData`, `useUserData`, `useGetSubjects`, `useUpdateStudent`, `hooks/planning/*`). Verificar: busca não encontra `process.env.HOST` nesses arquivos.
- [ ] 1.3 Trocar nos componentes/contexts (`RegisterForm`, `LoginForm`, `ForgetPassForm`, `ResetPassForm`, `ChangeEmailForm`, `ChangePasswordForm`, `VerifyEmailForm`, `UserDataComp`, `contexts/userData`) e nas navegações (`AlunosComp`, `NomePreparatorio`, `NomePreparatorioParents`). Verificar: busca não encontra `process.env.HOST` no cliente.
- [x] 1.4 Adicionar `headers: { "content-type": "application/json" }` nas requisições com corpo JSON. Verificar: a requisição envia o header `content-type`.

## 2. Host absoluto no servidor (derivar da requisição)

- [ ] 2.1 `src/proxy.ts`: usar `new URL("/api/user/get_user", request.url)` em vez de `${process.env.HOST}`. Verificar: `npm run build` ok e a navegação protegida ainda redireciona não autenticados para `/login`.
- [ ] 2.2 Rotas de email (`api/user/verify_email`, `api/user/forget_password`, `api/user/change_email`): derivar a origem da requisição para montar os links, em vez de `process.env.HOST`. Verificar: o link gerado aponta para o domínio da requisição.
- [ ] 2.3 `next.config.ts`: remover `env.HOST`. Verificar: `process.env.HOST` não é mais usado no cliente e o build passa.

## 3. Cadastro

- [x] 3.1 `api/user/register/route.ts`: `await newUser.save()` antes de responder. Verificar: o cadastro grava o usuário (login imediato funciona).
- [x] 3.2 `RegisterForm.tsx`: garantir `setIsPosting(false)` em sucesso e falha (ex.: `finally`). Verificar: forçar falha de requisição (ex.: sem rede) e confirmar que o spinner é removido e há mensagem de erro.

## 4. Estado de carregamento nos demais formulários

- [x] 4.1 Auditar os demais formulários que enviam dados (login, esqueci senha, reset, verificar/alterar email, alterar senha, avatar) e garantir que todos saem do estado de carregamento em falha. Verificar: cada fluxo com erro remove o spinner e exibe mensagem.

## 5. Verificação de integração

- [x] 5.1 `npm run lint` (0 erros) e `npm run build` (sucesso).
- [ ] 5.2 Registrar e logar em um **preview da Vercel** (domínio diferente de `minerva-gamma.vercel.app`): o cadastro conclui e não fica preso no spinner.
- [ ] 5.3 Smoke dos fluxos que usam API no mesmo preview (login, planejamento, avatar) para confirmar que o CORS não ocorre mais.
