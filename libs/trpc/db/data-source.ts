import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Block } from '../src/entities/block';
import { DB_HOST, DB_PORT, DB_USER } from './client';

export const ChaosReactorDB = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  database: 'reactor',
  synchronize: false,
  logging: true,
  entities: [Block],
  migrations: [],
  subscribers: [],
});
