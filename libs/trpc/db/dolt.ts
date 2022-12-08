import { Kysely, sql, QueryResult } from 'kysely';

/**
 * Handles Dolt database version control operations.
 */
export default class Dolt {
  db: Kysely<any>;

  constructor(db: Kysely<any>) {
    this.db = db;
  }

  /**
   * Call `dolt add` on all passed arguments.
   *
   * @param args
   *   The arguments to pass to `dolt add`.
   *
   * @returns
   *   The result of the `dolt add` operation.
   */
  async add(...args: string[]): Promise<QueryResult<unknown>> {
    return await sql`call dolt_add(${sql.join(args, sql`, `)});`.execute(this.db);
  }

  /**
   * Make a Dolt commit.
   *
   * @param message
   *  The commit message.
   *
   * @returns
   *  The result of the commit operation.
   */
  async commit(message: string): Promise<QueryResult<unknown>> {
    return await sql`call dolt_commit('-m', '${message}');`.execute(this.db);
  }

  /**
   * Revert a Dolt commit.
   *
   * @param commit
   *   The commit to revert.
   *
   * @returns
   *   The result of the revert operation.
   */
  async revert(commit: string): Promise<QueryResult<unknown>> {
    return await sql`call dolt_revert('${commit}');`.execute(this.db);
  }
}
