import * as path from 'path';
import { createPool } from 'mysql2';
import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  MysqlDialect,
  FileMigrationProvider,
  DatabaseConnection,
} from 'kysely';

async function migrateToLatest() {
  const db = new Kysely<DatabaseConnection>({
    dialect: new MysqlDialect({
      pool: createPool({
        database: 'reactor',
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
      }),
    }),
  });

  // Output all files in the current directory to the console.
  const migrationsPath = path.join(__dirname, 'migrations');
  const files = await fs.readdir(migrationsPath);

  console.log(files.join(', '));

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: migrationsPath,
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

export default migrateToLatest;
