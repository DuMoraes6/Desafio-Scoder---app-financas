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
✅ Integração Frontend + Backend + Banco

## 🗂️ Estrutura do projeto

```
fin-app/
├── backend/            # API + Banco de dados
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
├── frontend/           # Aplicação React
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
├── .gitignore
├── README.md
```

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js
- Docker e Docker Compose
- Git

### Passo a passo

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Banco de dados (Docker)

```bash
docker run --name postgres-finapp -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres
```

## ✨ Sobre a segurança

- A senha de administração para deletar transações está armazenada em variável de ambiente `.env`:

```env
ADMIN_PASSWORD=admin123
```

- Pode ser alterada a qualquer momento sem precisar mudar o código.

---

Desenvolvido por [Seu Nome] 🚀  
Desafio Técnico - Estágio em Desenvolvimento Full Stack