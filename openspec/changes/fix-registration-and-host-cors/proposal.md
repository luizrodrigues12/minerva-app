# Proposal

## Why

O cadastro do Minerva não funciona no site publicado: ao clicar em "Registrar", a página fica **presa no spinner de carregamento** e o usuário não é criado. A causa é sistêmica, não só do registro:

- **Todas as chamadas do cliente à própria API usam uma URL absoluta fixa** — `${process.env.HOST}/...`, com `next.config.ts` fixando `HOST = "https://minerva-gamma.vercel.app"` (31 usos). Em qualquer domínio diferente desse (preview da Vercel, domínio novo), a requisição vira **cross-origin** e é bloqueada por CORS.
- O **`RegisterForm` não limpa `isPosting` no `catch`**: quando a requisição falha, o `<Loading />` fica visível para sempre.
- A rota de registro faz `newUser.save()` **sem `await`**, o que é pouco confiável em serverless (a função pode encerrar antes de gravar).

## What Changes

- **BREAKING (comportamento de rede)**: trocar as chamadas **client-side** `${process.env.HOST}/...` por **URLs relativas** (same-origin), para o app funcionar em qualquer domínio de deploy, sem CORS.
- Corrigir o **estado de carregamento** dos formulários de submissão para sempre sair do spinner — em sucesso e em falha (começando pelo registro).
- **Aguardar** `newUser.save()` na rota de registro antes de responder com sucesso.
- Manter uso de host **absoluto apenas onde é inevitável** (links de email gerados no servidor) — e derivá-lo da origem da requisição, não de um valor fixo.

## Capabilities

### New Capabilities

- `client-api-requests`: chamadas do cliente à API de primeira parte são feitas em **URL same-origin** (sem host fixo), e formulários de submissão encerram o estado de carregamento tanto em sucesso quanto em falha.
- `user-registration`: o cadastro **persiste o usuário antes de responder** e devolve um resultado claro (sucesso/erro) — sem deixar a página presa.

### Modified Capabilities

Nenhuma (o projeto ainda não tem specs de capabilities).

## Impact

- **Cliente (~28 chamadas em hooks/componentes/contexts)**: `RegisterForm`, `LoginForm`, `ForgetPassForm`, `ResetPassForm`, `ChangeEmailForm`, `ChangePasswordForm`, `VerifyEmailForm`, `UserDataComp`, hooks de aluno/planejamento/avatar/subjects e `contexts/userData.tsx`.
- **Servidor**: `src/proxy.ts` (fetch interno absoluto), `src/app/api/user/register/route.ts` (await no save), rotas de email (uso de HOST em links).
- **Config**: `next.config.ts` (`env.HOST` deixa de ser necessário para chamadas do cliente).
- Sem mudança de banco de dados ou de dependências.
