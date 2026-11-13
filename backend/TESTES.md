# Testes da API FitPlan

## 1. Informações gerais

- **Projeto:** FitPlan API
- **Tecnologia:** Node.js e Express
- **Porta:** 3001
- **Armazenamento:** Em memória
- **Ferramenta de testes:** Thunder Client

## 2. Testes de Usuários

| Nº | Método | Endpoint | Descrição | Status esperado | Resultado |
|---|---|---|---|---|---|
| 1 | POST | `/usuarios` | Cadastrar usuário | 201 | Aprovado |
| 2 | GET | `/usuarios` | Listar usuários | 200 | Aprovado |
| 3 | GET | `/usuarios/1` | Buscar usuário existente | 200 | Aprovado |
| 4 | GET | `/usuarios/99` | Buscar usuário inexistente | 404 | Aprovado |
| 5 | POST | `/usuarios` | Cadastrar e-mail duplicado | 409 | Aprovado |
| 6 | POST | `/usuarios` | Cadastrar sem nome | 400 | Aprovado |
| 7 | PUT | `/usuarios/1` | Atualizar usuário | 200 | Aprovado |
| 8 | DELETE | `/usuarios/1` | Remover usuário | 204 | Aprovado |

## 3. Testes de Treinos

| Nº | Método | Endpoint | Descrição | Status esperado | Resultado |
|---|---|---|---|---|---|
| 1 | POST | `/treinos` | Cadastrar treino | 201 | Aprovado |
| 2 | GET | `/treinos` | Listar treinos | 200 | Aprovado |
| 3 | GET | `/treinos/1` | Buscar treino existente | 200 | Aprovado |
| 4 | GET | `/treinos/usuario/1` | Listar treinos de um usuário | 200 | Aprovado |
| 5 | POST | `/treinos` | Cadastrar treino para usuário inexistente | 422 | Aprovado |
| 6 | POST | `/treinos` | Cadastrar treino sem descrição | 400 | Aprovado |
| 7 | PUT | `/treinos/1` | Atualizar treino | 200 | Aprovado |
| 8 | GET | `/treinos/99` | Buscar treino inexistente | 404 | Aprovado |
| 9 | DELETE | `/treinos/1` | Remover treino | 204 | Aprovado |
| 10 | GET | `/treinos/1` | Confirmar exclusão | 404 | Aprovado |

## 4. Regras de negócio verificadas

- Nome e e-mail são obrigatórios para cadastrar usuários.
- Não é permitido cadastrar usuários com e-mails duplicados.
- Não é permitido atualizar um usuário utilizando o e-mail de outro usuário.
- Nome, descrição e usuário são obrigatórios para cadastrar treinos.
- Um treino deve estar associado a um usuário existente.
- É possível consultar os treinos associados a um usuário específico.
- Não é permitido atualizar ou excluir recursos inexistentes.

## 5. Conclusão

Os testes realizados com o Thunder Client confirmaram o funcionamento das operações CRUD de usuários e treinos, do relacionamento entre as entidades e das regras de negócio implementadas.

Todos os testes executados apresentaram os códigos HTTP esperados.
