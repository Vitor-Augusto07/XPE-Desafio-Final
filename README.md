# XPE-Desafio-Final
Criação de uma API REST com Arquitetura MVC


# API de Clientes — Express + Sequelize + SQLite

API REST para cadastro e gestão de **Clientes**, construída com **Node.js + Express**, **Sequelize** e **SQLite** (persistência em arquivo `data.sqlite`).  
Inclui validação com **Joi**, **CORS**, **logs** com morgan e endpoints de **CRUD**, **busca** e **contagem**.

---

## ▶️ Requisitos

- Node.js **>= 18** (testado com Node 22)
- npm **>= 8**

> **Não** precisa instalar cliente do SQLite. O banco é um arquivo (`data.sqlite`) criado automaticamente.

---

## 📁 Estrutura de Pastas

```
.
├─ package.json
├─ data.sqlite           # criado automaticamente na 1ª execução
└─ src/
   ├─ app.js
   ├─ server.js
   ├─ db/
   │  └─ index.js       # conexão Sequelize (SQLite)
   ├─ models/
   │  └─ Cliente.js     # modelo Sequelize
   ├─ services/
   │  └─ clienteService.js
   ├─ controllers/
   │  └─ clienteController.js
   └─ routes/
      └─ clienteRoutes.js
```

---

## ⚙️ Instalação e Execução

```bash
# 1) Instalar dependências
npm install

# 2) Rodar em desenvolvimento (com nodemon, se estiver no package.json)
npm run dev

# 3) Rodar em produção
npm start
```

Ao subir, você deve ver algo como:
```
Banco de dados sincronizado!
API rodando em http://localhost:3000
```

**Healthcheck:**
- `GET http://localhost:3000/health` → `{ "status": "ok" }`

---

## 🧠 Tecnologias

- **Express** (API HTTP)
- **Sequelize** (ORM)
- **SQLite** (persistência local em arquivo)
- **Joi** (validação)
- **morgan** (logs)
- **CORS**

---

## 🔒 Validação

O payload de Cliente é validado com **Joi**:

```json
{
  "nome": "string (min 2) | required",
  "email": "string (email) | required"
}
```

Erros de validação retornam **400** com mensagem.  
`GET /:id` e `PUT /:id`/`DELETE /:id` para IDs inexistentes retornam **404**.

---

## 🧩 Endpoints

Base URL: `http://localhost:3000/api/clientes`

### 1) Criar Cliente — `POST /api/clientes`

**Bash (curl):**
```bash
curl -X POST http://localhost:3000/api/clientes   -H "Content-Type: application/json"   -d '{"nome":"Maria","email":"maria@mail.com"}'
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"nome":"Maria","email":"maria@mail.com"}' | ConvertTo-Json
```

**Resposta 201:**
```json
{ "id": 1, "nome": "Maria", "email": "maria@mail.com" }
```

---

### 2) Listar Todos — `GET /api/clientes`

**Bash (com pretty print usando jq):**
```bash
curl http://localhost:3000/api/clientes | jq
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes" -Method Get | ConvertTo-Json
```

---

### 3) Buscar por ID — `GET /api/clientes/:id`

**Bash:**
```bash
curl http://localhost:3000/api/clientes/1 | jq
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/1" -Method Get | ConvertTo-Json
```

**404 se não existir:**
```json
{ "message": "Cliente não encontrado" }
```

---

### 4) Buscar por Nome — `GET /api/clientes/search?nome=...`

**Bash:**
```bash
curl "http://localhost:3000/api/clientes/search?nome=mar" | jq
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/search?nome=mar" -Method Get | ConvertTo-Json
```

---

### 5) Contar Registros — `GET /api/clientes/count`

**Bash:**
```bash
curl http://localhost:3000/api/clientes/count | jq
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/count" -Method Get | ConvertTo-Json
```

**Resposta:**
```json
{ "total": 3 }
```

---

### 6) Atualizar — `PUT /api/clientes/:id`

**Bash:**
```bash
curl -X PUT http://localhost:3000/api/clientes/1   -H "Content-Type: application/json"   -d '{"nome":"Maria Silva","email":"maria.silva@mail.com"}' | jq
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/1" `
  -Method Put `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"nome":"Maria Silva","email":"maria.silva@mail.com"}' | ConvertTo-Json
```

**404 se não existir:**
```json
{ "message": "Cliente não encontrado" }
```

---

### 7) Deletar — `DELETE /api/clientes/:id`

**Bash:**
```bash
curl -X DELETE http://localhost:3000/api/clientes/1 -i
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/1" -Method Delete
```

**Resposta:** `204 No Content` (sem corpo)

---

## 🧾 Dicas úteis

### Pretty print no Bash
- **jq** (recomendado):  
  `curl http://localhost:3000/api/clientes | jq`
- **python** (alternativa):  
  `curl http://localhost:3000/api/clientes | python -m json.tool`
- **node** (sem instalar nada):  
  ```bash
  curl http://localhost:3000/api/clientes     | node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync(0,'utf8')), null, 2))"
  ```

### PowerShell não é `curl`
No PowerShell, `curl` chama `Invoke-WebRequest` (alias). Prefira **`Invoke-RestMethod`** e sempre finalize com `| ConvertTo-Json` para visualizar o retorno formatado.

### Git Bash no Windows e aspas
Se o JSON “sumir” ou vier `{}`:
- Use **PowerShell** com `Invoke-RestMethod`, **ou**
- No Git Bash, tente `"` dentro de aspas duplas.  
Mais simples: teste com **Postman/Insomnia**.

---

## 🗄️ Banco de Dados

- **Arquivo:** `data.sqlite` (criando e sincronizando com `sequelize.sync()` no `server.js`).
- Para “resetar” o banco em desenvolvimento: **apague** `data.sqlite` e rode `npm run dev` novamente.
- Se alterar o modelo (`models/Cliente.js`), durante o dev você pode usar `sequelize.sync({ alter: true })` para ajustar a tabela (cuidado em produção).

> **Diferencial (opcional):** defina `unique: true` no campo `email` em `Cliente.js`.  
> Se fizer isso, ao tentar inserir um email repetido, o Sequelize lança um erro de unicidade (trate com `try/catch` no controller se quiser mensagem amigável).

---

## 🐞 Troubleshooting

- **`ValidationError: Cliente.nome/email cannot be null`**  
  → O `req.body` chegou vazio. Verifique:
  - `app.use(express.json())` presente em `app.js` (está! ✅)
  - Header `Content-Type: application/json` no request
  - Quoting correto (PowerShell/Bash)

- **`{}` aparecendo no GET**  
  → Esqueceu `await` no controller. (Já corrigido ✅)

- **`SQLITE_CANTOPEN`**  
  → Sem permissão para gravar o arquivo na pasta. Rode o Node com permissão ou mude `storage` em `src/db/index.js`.

- **`no such table: clientes`**  
  → `sequelize.sync()` não rodou. Confira `src/server.js` (sincroniza antes de `app.listen`).

---

## 🧪 Sequência rápida de teste (Bash)

```bash
# Criar
curl -X POST http://localhost:3000/api/clientes -H "Content-Type: application/json" -d '{"nome":"Ana","email":"ana@mail.com"}'
curl -X POST http://localhost:3000/api/clientes -H "Content-Type: application/json" -d '{"nome":"Bruno","email":"bruno@mail.com"}'

# Listar
curl http://localhost:3000/api/clientes | jq

# Buscar por nome
curl "http://localhost:3000/api/clientes/search?nome=an" | jq

# Atualizar
curl -X PUT http://localhost:3000/api/clientes/1 -H "Content-Type: application/json" -d '{"nome":"Ana Paula","email":"ana.paula@mail.com"}' | jq

# Contar
curl http://localhost:3000/api/clientes/count | jq
```

## 🧪 Sequência rápida de teste (PowerShell)

```powershell
# Criar
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes" -Method Post -Headers @{ "Content-Type" = "application/json" } -Body '{"nome":"Ana","email":"ana@mail.com"}' | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes" -Method Post -Headers @{ "Content-Type" = "application/json" } -Body '{"nome":"Bruno","email":"bruno@mail.com"}' | ConvertTo-Json

# Listar
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes" -Method Get | ConvertTo-Json

# Buscar por nome
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/search?nome=an" -Method Get | ConvertTo-Json

# Atualizar
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/1" -Method Put -Headers @{ "Content-Type" = "application/json" } -Body '{"nome":"Ana Paula","email":"ana.paula@mail.com"}' | ConvertTo-Json

# Contar
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/count" -Method Get | ConvertTo-Json
```
