import { Kysely, sql } from 'kysely';
import Dolt from '../dolt';

// Commit the initial schema.
export async function up(db: Kysely<any>): Promise<void> {
  const dolt = new Dolt(db);

  await dolt.add('blocks');
  await dolt.commit('Add initial schema');
}

export async function down(db: Kysely<any>): Promise<void> {
  const dolt = new Dolt(db);

  await dolt.revert('HEAD');
}
