# Spec Delta

## Purpose

Define como o cliente do Minerva chama a própria API: sempre same-origin (URL relativa), para funcionar em qualquer domínio de deploy, e com estado de submissão que não fica preso.

## ADDED Requirements

### Requirement: Chamadas same-origin à API de primeira parte

As chamadas do cliente à API do próprio app SHALL usar URL relativa (same-origin) e NÃO SHALL depender de um host absoluto fixo definido em configuração.

#### Scenario: Requisição em domínio de preview

- **WHEN** o app roda em um domínio diferente de `minerva-gamma.vercel.app` (por exemplo, um preview da Vercel) e o usuário dispara uma ação que chama a API
- **THEN** a requisição é enviada para a mesma origem da página
- **AND** não é bloqueada por CORS

#### Scenario: Sem host absoluto fixo no cliente

- **WHEN** as chamadas de API do cliente são inspecionadas
- **THEN** nenhuma delas usa uma URL absoluta proveniente de `process.env.HOST`

### Requirement: Estado de carregamento encerra em sucesso e falha

Formulários que enviam dados SHALL encerrar o estado de carregamento (spinner) tanto em caso de sucesso quanto de falha da requisição.

#### Scenario: Falha na requisição

- **WHEN** a requisição de um formulário falha (erro de rede, bloqueio de CORS, HTTP não-2xx ou corpo de resposta inválido)
- **THEN** o spinner de carregamento é removido
- **AND** uma mensagem de erro é exibida ao usuário

#### Scenario: Sucesso na requisição

- **WHEN** a requisição conclui com sucesso
- **THEN** o spinner de carregamento é removido
