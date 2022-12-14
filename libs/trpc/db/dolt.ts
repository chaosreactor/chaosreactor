import { Kysely, sql, QueryResult } from 'kysely';

/**
 * Handles Dolt database version control operations.
 */
export default class Dolt {
  db: Kysely<any>;

  // Dolt commit tags used to distinguish commit types.
  static TAGS = {
    MIGRATION: 'migration',
    BLOCKS: {
      CREATE: 'blocks.create',
    },
  };

  constructor(db: Kysely<any>) {
    this.db = db;
  }

  /**
   * Call `dolt add` on all passed arguments.
   *
   * @see https://docs.dolthub.com/sql-reference/version-control/dolt-sql-procedures#dolt_add
   *
   * @param args
   *   The arguments to pass to `dolt add`.
   *
   * @returns
   *   The result of the `dolt add` operation.
   */
  async add(...args: string[]): Promise<QueryResult<unknown>> {
    return sql`call dolt_add(${sql.join(args, sql`, `)});`.execute(
      this.db
    );
  }

  /**
   * Make a Dolt commit.
   *
   * @see https://docs.dolthub.com/sql-reference/version-control/dolt-sql-procedures#dolt_commit
   *
   * @param message
   *  The commit message.
   *
   * @returns
   *  The result of the commit operation.
   */
  async commit(message: string): Promise<QueryResult<unknown>> {
    return sql`call dolt_commit('-m', ${message});`.execute(this.db);
  }

  /**
   * Revert a Dolt commit.
   *
   * @see https://docs.dolthub.com/sql-reference/version-control/dolt-sql-procedures#dolt_revert
   *
   * @param commit
   *   The commit to revert.
   *
   * @returns
   *   The result of the revert operation.
   */
  async revert(commit: string): Promise<QueryResult<unknown>> {
    return sql`call dolt_revert(${commit});`.execute(this.db);
  }

  /**
   * Tag a Dolt commit.
   *
   * @see https://docs.dolthub.com/sql-reference/version-control/dolt-sql-procedures#dolt_tag
   *
   * @param tag
   *   The tag to apply.
   * @param commit
   *   The commit to tag.
   * @param message
   *   The tag message.
   *
   * @returns
   *   The result of the tag operation.
   */
  async tag(
    tag: string,
    commit: string,
    message?: string
  ): Promise<QueryResult<unknown>> {
    // Build the optional message argument.
    const messageArg = message ? sql`, ${message}` : sql``;

    return sql`call dolt_tag(${tag}, ${commit}${messageArg});`.execute(
      this.db
    );
  }
}
