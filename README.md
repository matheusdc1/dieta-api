## Daily Diet API

## Funcionalidades

Esta é uma API desenvolvida para o controle de dieta diária. Com esta aplicação, você pode cadastrar novas refeições, excluir refeições existentes e visualizar métricas importantes para sua dieta, como quantidades totais de alimentos dentro e fora da dieta.

## Rotas de Usuários

- Retorna todos os usuários cadastrados.
```Bash
GET /api/users
```

- Cria um novo usuário.
```Bash
POST /api/users
```
- Exemplo de JSON
```Bash
{
  "name": "Nome do Usuário",
  "email": "exemplo@dominio.com",
  "password": "senha123"
}
```

- Faz login de um usuário existente e retorna um token JWT para autenticação.
```Bash
POST /api/login
```
- Exemplo de JSON
```Bash
{
  "email": "exemplo@dominio.com",
  "password": "senha123"
}

```
- Para acessar as rotas protegidas pela autenticação JWT, é necessário incluir o token JWT no cabeçalho Authorization da requisição HTTP.
- Exemplo de cabeçalho de autorização -> Authorization: Bearer seu-token-jwt

## Rotas de Refeições

- Cria uma nova refeição.
```Bash
POST /api/meals
```
- Exemplo de JSON
```Bash
{
  "name": "Nome da Refeição",
  "description": "Descrição da refeição",
  "isInDiet": true
}
```

- Atualiza uma refeição existente.
```Bash
PUT /api/meals/:id
```

- Exclui uma refeição existente.
```Bash
DELETE /api/meals/:id
```

- Retorna detalhes de uma refeição específica.
```Bash
GET /api/meals/:id
```

- Retorna todas as refeições de um usuário específico.
```Bash
GET /api/users/:userId/meals
```

- Retorna as métricas de consumo de um usuário específico.
```Bash
GET /api/users/:userId/metrics
```

## Regras da aplicação

- [x] Deve ser possível criar um usuário.
- [x] Deve ser possível identificar o usuário entre as requisições.
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e hora
  - Está dentro ou não da dieta

- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima.
- [x] Deve ser possível apagar uma refeição.
- [x] Deve ser possível listar todas as refeições de um usuário.
- [x] Deve ser possível visualizar uma única refeição.
- [ ] Deve ser possível recuperar as métricas de um usuário.
  - [x] Quantidade total de refeições registradas.
  - [x] Quantidade total de refeições dentro da dieta.
  - [x] Quantidade total de refeições fora da dieta.
  - [ ] Melhor sequência de refeições dentro da dieta.
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou.

## :hammer_and_wrench: Tecnologias

* **Node.Js**
* **Express**
* **Prisma**
* **MySQL**

## Instalação

- Clone o repositório
```Bash
git clone https://github.com/matheusdc1/dieta-api.git
```

- Vá para a pasta do server
```Bash
cd dieta-api
```

- Instalar dependências
```Bash
npm install
```
## Como usar

- Criar um database no MySQL 

```Bash
CREATE DATABASE nome_do_banco_de_dados;
```

- Criar um arquivo .env na pasta raiz do projeto
```Bash
DATABASE_URL="mysql://seu-usuario-db:sua-senha@localhost:3306/nome-do-banco-de-dados"
JWT_SECRET=sua-chave-secreta
PORT=3333
```

- Gerar as migrations
```Bash
npx prisma migrate dev
```

- Iniciar o server
```Bash
npm run dev
```

- Acessar localhost
```Bash
http://localhost:3333
```