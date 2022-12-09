import { sql, QueryResult } from 'kysely';
import { TRPCError } from '@trpc/server';
import {
  CreateBlockInput,
  FilterQueryInput,
  ParamsInput,
} from '../schemas/block.schema';

import db from '../../db/client';
import Dolt from '../../db/dolt';

// @see https://codevoweb.com/build-a-fullstack-trpc-crud-app-with-nextjs/#comments
export const createBlockController = async ({
  input,
}: {
  input: CreateBlockInput;
}) => {
  try {
    // Add the new block to the database.
    const block = await db
      .insertInto('blocks')
      .values({
        type: input.type,
        x: input.x,
        y: input.y,
        data: input.data,
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    // Make a Dolt commit.
    const dolt = new Dolt(db);
    await dolt.add('blocks');
    await dolt.commit(`Created block ${block?.id}`);
    await dolt.tag(Dolt.TAGS.BLOCKS.CREATE, 'HEAD');

    return {
      status: 'success',
      data: {
        block,
      },
    };
  } catch (error) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Eror creating block',
    });
    throw error;
  }
};
