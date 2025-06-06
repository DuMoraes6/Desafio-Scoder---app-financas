import { DataSource } from 'typeorm';
import { Transaction } from './entity/transaction';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'finances',
  synchronize: true,
  logging: false,
  entities: [Transaction],
});
