import * as path from 'path';
import { promises as fs } from 'fs';
import { Migrator, FileMigrationProvider } from 'kysely';

import db from './client';

const migrateToLatest = new Promise(async (resolve, reject) => {
  // Output all files in the current directory to the console.
  const migrationsPath = path.join(__dirname, 'migrations');
  const files = await fs.readdir(migrationsPath);

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: migrationsPath,
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  console.error('Error test');

  if (error) {
    console.error('failed to migrate');
    console.error(error);

    reject(error);
  } else {
    console.log('Migration results', results);

    results?.forEach((it) => {
      console.log('Migration result', it);

      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was executed successfully`
        );
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    resolve(results);
  }
});

export default migrateToLatest;
