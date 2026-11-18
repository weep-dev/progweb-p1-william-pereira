# FitPlan — Documentação das Telas

## 1. Visão geral

O frontend do FitPlan foi desenvolvido utilizando HTML, CSS, Bootstrap 5.3.8 e JavaScript puro (Vanilla JS), consumindo a API REST desenvolvida com Express.

A aplicação permite gerenciar usuários e treinos, mantendo o relacionamento entre essas entidades.

## 2. Arquitetura

O frontend está organizado nas seguintes camadas:

- **API:** realiza as requisições HTTP ao backend.
- **Services:** concentra as operações e validações de usuários e treinos.
- **State:** gerencia os estados da aplicação.
- **UI:** controla a renderização das telas e os eventos dos elementos.
- **Main:** conecta as camadas e inicializa a aplicação.

## 3. Telas e funcionalidades

### 3.1. Usuários

Permite:
- Cadastrar usuários.
- Listar usuários.
- Editar usuários.
- Remover usuários.

### 3.2. Treinos

Permite:
- Cadastrar treinos.
- Listar treinos.
- Editar treinos.
- Remover treinos.
- Associar cada treino a um usuário existente.

A tabela de treinos apresenta o nome do usuário associado.

## 4. Estados da interface

As listagens de usuários e treinos possuem quatro estados:

- **Carregando:** exibido durante a requisição à API.
- **Vazio:** exibido quando não existem registros.
- **Erro:** exibido quando ocorre uma falha na comunicação com a API.
- **Sucesso:** exibe os registros retornados pelo backend.

## 5. Tratamento de erros

A aplicação apresenta mensagens de erro retornadas pela API.

Foi testada a tentativa de cadastrar um treino associado a um usuário inexistente. O backend retornou HTTP 422, e o frontend apresentou a mensagem:

"Não é possível criar um treino para um usuário inexistente".

## 6. Segurança

Os dados recebidos da API são inseridos na interface utilizando `textContent` e elementos criados com `document.createElement`, evitando a interpretação direta de conteúdo recebido como HTML.

## 7. Tecnologias utilizadas

- HTML5
- CSS3
- Bootstrap 5.3.8
- JavaScript ES Modules
- Fetch API
- Node.js
- Express
