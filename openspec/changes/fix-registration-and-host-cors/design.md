# Design

## Context

Ver `proposal.md - Why`. Fatos do repositório que moldam a abordagem:

- `process.env.HOST` aparece em **31 pontos**. O `next.config.ts` fixa `HOST = "https://minerva-gamma.vercel.app"` via `env`, o que é inlinado no **bundle do cliente** — então toda chamada client-side vai para esse host absoluto.
- Uso por natureza: **cliente** (fetch de API em hooks/componentes/contexts), **servidor** (`proxy.ts` faz fetch interno; rotas de email montam links absolutos).
- `RegisterForm.tsx` faz `setIsPosting(true)`, e no `catch` só seta mensagem de erro — **sem `setIsPosting(false)`** → spinner infinito quando o fetch rejeita.
- `api/user/register/route.ts` chama `newUser.save()` **sem `await`**.
- O projeto não tinha specs; esta change introduz `client-api-requests` e `user-registration`.

## Goals / Non-Goals

**Goals:**
- Cliente fala com a própria API em **same-origin** (sem host fixo), funcionando em qualquer domínio.
- Formulários de submissão **sempre** saem do estado de carregamento.
- Cadastro **persiste antes de responder**.
- Links de email absolutos apontam para o domínio correto.

**Non-Goals:**
- Não redesenhar autenticação nem adicionar CSRF/rate-limiting.
- Não configurar CORS no servidor (desnecessário com same-origin).
- Não refatorar o `proxy.ts` para chamar a lógica de `get_user` diretamente (fica para depois).
- Não alterar schema/banco nem dependências.

## Decisions

**1. URL relativa no cliente.**
Trocar `${process.env.HOST}/api/...` por `/api/...`. same-origin elimina CORS e independe do domínio de deploy. Alternativa (adicionar headers CORS no servidor) foi rejeitada: aumenta superfície e não resolve o host fixo.

**2. Remover `env.HOST` específico do cliente.**
O host absoluto deixa de ser necessário para chamadas do cliente. O `next.config.ts` deixa de expor `HOST`.

**3. Host absoluto no servidor derivado da requisição.**
Onde ainda é preciso URL absoluta (links de email e `proxy.ts`), derivar da origem da requisição (`new URL(path, request.url)` / `request.nextUrl.origin`) em vez de um valor fixo — assim emails e proxy apontam para o domínio efetivo.

**4. Estado de carregamento em `try/finally`.**
`setIsPosting(false)` garantido em `finally` (ou em todos os caminhos). Aplicar também aos demais formulários que hoje possam ficar presos (auditar: login, esqueci senha, reset, verificar/alterar email, alterar senha, avatar).

**5. `await newUser.save()` no registro.**
Garante persistência antes da resposta em ambiente serverless.

**6. Padronizar `Content-Type: application/json`.**
Incluir o header nas requisições com corpo JSON (hoje ausente em pelo menos o registro).

## Risks / Trade-offs

- **[Regressão ao tocar 31 pontos]** → mudança mecânica (HOST → caminho relativo); validar com `lint` + `build` e smoke dos fluxos afetados.
- **[Origem derivada da requisição em produção]** → atrás de proxy/CDN, usar a origem pública correta (Next expõe a URL pública em `request.url` na Vercel); validar no preview.
- **[`finally` esconder o caminho de erro]** → manter as mensagens de erro existentes; o `finally` só limpa o loading.
- **[Fetch relativo não funciona onde não há origem (servidor)]** → usar relativo **apenas no cliente**; no servidor, origem derivada.

## Migration Plan

Deploy único; sem migração de dados. Rollback = reverter o commit. Idealmente validar num **preview da Vercel** (o cenário onde o bug aparece) e depois publicar.

## Open Questions

Nenhuma.
