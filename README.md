# FinApp - Controle Financeiro Full Stack

Projeto de desafio técnico para estágio - App de controle financeiro.

## 🚀 Tecnologias utilizadas

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + TypeScript + Express + TypeORM
- **Banco de dados**: PostgreSQL (rodando em Docker)
- **Gerenciamento de dependências**: npm
- **API testada com**: Postman

## ⚙️ Funcionalidades

✅ Cadastro de transações financeiras (crédito e débito)  
✅ Suporte a múltiplas moedas (BRL, USD, EUR)  
✅ Filtros por mês, descrição e tipo de transação  
✅ Totais por moeda, respeitando filtros aplicados  
✅ Botão de deletar transações com senha protegida  
✅ Backend seguro com variável de ambiente para senha  
✅ CRUD completo de transações  
✅ Integração Frontend + Backend + Banco via Docker Compose

## 🗂️ Estrutura do projeto

```
fin-app/
├── backend/            # API + Banco de dados
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── Dockerfile
├── frontend/           # Aplicação React
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
├── docker-compose.yml
├── .gitignore
├── README.md
```

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js
- Docker e Docker Compose
- Git

### Passo a passo

#### Backend + Banco de Dados

```bash
docker-compose up --build
```

👉 Após a primeira vez, você pode rodar apenas:

```bash
docker-compose up
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Banco de dados (Docker)

O serviço `db` (PostgreSQL) já é iniciado automaticamente via `docker-compose`.

## ✨ Sobre a segurança

- A senha de administração para deletar transações está armazenada em variável de ambiente `.env`:

```env
ADMIN_PASSWORD=admin123
```

- Pode ser alterada a qualquer momento sem precisar mudar o código.

## ✅ Testando a API

### Verificar transações (GET)

```http
GET http://localhost:3333/transactions
```

### Adicionar transação (POST)

```http
POST http://localhost:3333/transactions
```

Body (JSON):

```json
{
  "date": "2025-06-08",
  "description": "Compra de exemplo",
  "amount": 150,
  "type": "debit",
  "currency": "BRL",
  "id": "UUID_AQUI"
}
```

### Deletar transação (DELETE)

```http
DELETE http://localhost:3333/transactions/:id
```

Body (JSON):

```json
{
  "password": "admin123"
}
```

---

Desenvolvido por [Seu Nome] 🚀  
Desafio Técnico - Estágio em Desenvolvimento Full Stack