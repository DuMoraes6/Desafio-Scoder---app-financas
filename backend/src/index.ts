import 'dotenv/config'; 
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import transactionRoutes from './routes/transactions';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/transactions', transactionRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Banco conectado com sucesso!');
    app.listen(3333, () => {
      console.log('🚀 Servidor rodando em http://localhost:3333');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco:', error);
  });