import { Kysely, MysqlDialect, Generated } from 'kysely';
import { createPool } from 'mysql2';

export interface BlockInterface {
  id: Generated<number>;
  type: string;
  x: number;
  y: number;
  data: {} | null;
}

export interface Database {
  blocks: BlockInterface;
}

export const DB_PORT = 3306;
export const DB_HOST = '127.0.0.1';
export const DB_USER = 'root';

const db = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool: async () =>
      createPool({
        database: 'reactor',
        host: DB_HOST,
        user: DB_USER,
        port: DB_PORT,
      }),
  }),
});

export default db;
