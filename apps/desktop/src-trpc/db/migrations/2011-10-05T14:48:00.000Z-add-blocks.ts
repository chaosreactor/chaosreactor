import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('blocks')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('type', 'varchar(255)', (col) => col.notNull())
    .addColumn('x', 'integer', (col) => col.notNull())
    .addColumn('y', 'integer', (col) => col.notNull())
    .addColumn('data', 'json', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('blocks').execute();
}
