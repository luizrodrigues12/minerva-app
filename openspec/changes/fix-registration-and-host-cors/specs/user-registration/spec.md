# Spec Delta

## Purpose

Define o comportamento do cadastro de usuários no Minerva: persistir a conta antes de responder e nunca deixar a página presa em carregamento.

## ADDED Requirements

### Requirement: Cadastro persiste o usuário antes de responder

A rota de cadastro SHALL aguardar a persistência do usuário antes de responder com sucesso.

#### Scenario: Cadastro bem-sucedido

- **WHEN** o usuário envia nome, email e senha válidos e o email não está em uso
- **THEN** o usuário é gravado no banco de dados
- **AND** a resposta é de sucesso
- **AND** o usuário consegue fazer login em seguida

#### Scenario: Email já cadastrado

- **WHEN** o email enviado já existe
- **THEN** a resposta indica que o email já está em uso
- **AND** nenhum novo usuário é criado

### Requirement: Formulário de registro não fica preso no carregamento

O formulário de registro SHALL sair do estado de carregamento independentemente do resultado da requisição.

#### Scenario: Falha de rede ou CORS

- **WHEN** a requisição de cadastro falha por rede ou CORS
- **THEN** o spinner de carregamento é removido
- **AND** o usuário vê uma mensagem de erro

#### Scenario: Sucesso

- **WHEN** o cadastro conclui com sucesso
- **THEN** o spinner de carregamento é removido
- **AND** o usuário é encaminhado para o login
