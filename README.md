# API de Autenticação

Backend simples de autenticação utilizando `Node.js`, `Express`, `PostgreSQL`, `bcrypt` e `JWT`.  
Este projeto permite criar usuários, realizar login, alterar senha e buscar usuários pelo username.  
Desenvolvido com foco em estudo e boas práticas de APIs REST.

## 🚀 Tecnologias Utilizadas

- Node.JS
- Express
- PostgreSQL
- Bcrypt
- JsonWebToken
- Dotenv

## 🗄 Pré-requisitos

Você deve ter instalado:
- Node.js (16+)  
- PostgreSQL (13+)  

E deve **criar manualmente um banco de dados vazio** no PostgreSQL antes de rodar o projeto.

## 📁 Estrutura do projeto

```bash
  source/
    ├── controllers/
    │ └── userController.js
    ├── routes/
    │ └── routes.js
    ├── connectionDB.js
    ├── initDB.js
    ├── index.js
    └── .env
```

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` no diretório /source

```env
SERVER_PORT=3000

DB_USER=seu_usuario_postgres
DB_HOST=localhost
DB_NAME=nome_do_banco
DB_PASS=sua_senha
DB_PORT=5432

JWT_SECRET=sua_chave_jwt
```

## 🛠 Como executar o projeto

1. Clone o repositório
   ```bash
   git clone https://github.com/Gut0Rodri/Auth_API.git
   ```
2. Abra o projeto em qualquer editor de código (VS Code, WebStorm, etc.)

3. Entre na pasta `API`

   ```bash
   cd API
   ```

4. Instale as dependências

   ```nginx
   npm install
   ```

5. Entre na pasta `source`

   ```bash
   cd source
   ```

6. Criar manualmente o banco de dados no PostgreSQL

7. Executar script para criar tabela users no banco de dados

   ```nginx
   node initDB.js
   ```

8. Rodar o servidor com nodemon

   ```nginx
   npx nodemon
   ```

9. Servidor disponível em:
   ```arduino
   http://localhost:3000
   ```

## 📡 Endpoints da API

### 🔍 1. Buscar usuário por username

> GET /user/:username

#### Resposta

```json
{
  "User": {
    "id": 1,
    "name": "Fulano",
    "username": "Fulano_"
   }
}
```

### 🧾 2. Criar conta

> POST /user

#### Body

```json
{
  "name": "Fulano",
  "username": "Fulano_",
  "password": "1234567890"
}
```

> **⚠ Regras** <br><br>
A senha deve conter no mínimo 10 caracteres.<br>
Username deve ser único.

>

#### Resposta

```json
{
  "Message": "User created successfully",
  "User": {
    "id": 1,
    "name": "Fulano",
    "username": "Fulano_"
   }
}
```

### ✏️ 3. Alterar senha

> PATCH /user/:username

#### Body

```json
{
  "password": "novaSenha12345"
}
```

#### Resposta

```json
{
  "Message": "Password changed successfully.",
  "User": {
    "id": 1,
    "name": "Fulano",
    "username": "Fulano_"
  }
}
```

### 🔐 4. Login

> POST /user/login

#### Body

```json
{
  "username": "Fulano_",
  "password": "1234567890"
}
```

#### Resposta

```json
{
  "Message": "Authentication successfully.",
  "User": {
    "id": 1,
    "name": "Fulano",
    "username": "Fulano_"
  },
  "Token": "TOKEN_JWT"
}
```

> **⚠ Atenção** <br><br>
O token expira em 1 hora.
>

### 📜 Banco de Dados

A tabela é criada pelo script:

```nginx
node initDB.js
```
#### SQL utilizado:
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔒 Segurança

- Senhas são hasheadas com bcrypt (10 salt rounds).
- JWT utiliza assinatura segura (HS256).
- Sem dados sensíveis retornados nas respostas.

### 🧪 Testes de Endpoints

Os testes dos endpoints da API foram realizados utilizando a ferramenta Insomnia, garantindo a validação das rotas, métodos, parâmetros e respostas retornadas pelo servidor.

**[Baixar arquivo de testes (Insomnia)](./API/test_insomnia/Insomnia_2025-12-02.yaml)**


### 📄 Licença

Projeto desenvolvido para estudo. Sinta-se à vontade para modificar e melhorar.
