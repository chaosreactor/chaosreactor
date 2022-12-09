import { Kysely, MysqlDialect, Generated } from 'kysely';
import { createPool } from 'mysql2';

export interface BlocksTable {
  id: Generated<number>;
  type: string;
  x: number;
  y: number;
  data: {} | null;
}

export interface Database {
  blocks: BlocksTable;
}

const db = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool: createPool({
      database: 'reactor',
      host: '127.0.0.1',
      user: 'root',
      port: 3306,
    }),
  }),
});

export default db;
