# FinApp - Controle Financeiro Full Stack

Projeto de desafio técnico para estágio - App de controle financeiro.

## 🚀 Tecnologias utilizadas

- **Frontend**: React + TypeScript + Vite (build + serve rodando em container)
- **Backend**: Node.js + TypeScript + Express + TypeORM (rodando em container)
- **Banco de dados**: PostgreSQL (rodando em container)
- **Gerenciamento de dependências**: npm
- **Orquestração de containers**: Docker Compose
- **API testada com**: Postman

## ⚙️ Funcionalidades

✅ Cadastro de transações financeiras (crédito e débito)  
✅ Suporte a múltiplas moedas (BRL, USD, EUR)  
✅ Filtros por mês, descrição e tipo de transação  
✅ Totais por moeda, respeitando filtros aplicados  
✅ Botão de deletar transações com senha protegida  
✅ Backend seguro com variável de ambiente para senha  
✅ CRUD completo de transações  
✅ Integração Frontend + Backend + Banco via Docker Compose (tudo em container)

## 🗂️ Estrutura do projeto

```
fin-app/
├── backend/            # API + Banco de dados
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── Dockerfile
├── frontend/           # Aplicação React (build + serve em container)
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── README.md
```

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Docker e Docker Compose
- Git

### Passo a passo

#### Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd fin-app
```

#### Rodar tudo em container

```bash
docker-compose up --build
```

👉 O comando acima sobe:

✅ Banco de dados (PostgreSQL)  
✅ Backend (Node.js + Express)  
✅ Frontend (React + Vite build + serve)  

#### Acessar o app

- Frontend: [http://localhost:5000](http://localhost:5000)
- Backend (API): [http://localhost:3333](http://localhost:3333)

### 🚩 Observação

- O frontend roda no container em modo **build + serve** → ideal para evitar problemas de hot reload em container no Windows.
- O backend e banco rodam em container normalmente.

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