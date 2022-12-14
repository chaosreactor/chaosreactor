import { sql, QueryResult } from 'kysely';
import { TRPCError } from '@trpc/server';
import {
  CreateBlockInput,
  FilterQueryInput,
} from '../schemas/block.schema';

import db from '../../db/client';
import type { BlockInterface } from '../../db/client';
import Dolt from '../../db/dolt';
import { ChaosReactorDB } from '../../db/data-source';
import { Block } from '../../src/entities/block';

// @see https://codevoweb.com/build-a-fullstack-trpc-crud-app-with-nextjs
export const createBlockController = async ({
  input,
}: {
  input: CreateBlockInput;
}) => {
  try {
    console.log('Creating block', input);

    // Add the new block to the database.
    const block = (await db
      .insertInto('blocks')
      .values({
        type: input.type,
        x: input.x,
        y: input.y,
        data: input.data,
      })
      .executeTakeFirstOrThrow()) as unknown as BlockInterface;

    // Make a Dolt commit.
    const dolt = new Dolt(db);
    await dolt.add('blocks');
    await dolt.commit(`Created block ${block?.id}`);
    await dolt.tag(Dolt.TAGS.BLOCKS.CREATE, 'HEAD');

    return block;
  } catch (error) {
    console.log('Error creating block', error);

    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Eror creating block',
      cause: error,
    });
  }
};

export const findAllBlocksController = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const blocksRepository = ChaosReactorDB.getRepository(Block);
    const blocks = await blocksRepository.find();

    return {
      status: "success",
      results: blocks.length,
      blocks,
    };
  } catch (error) {
    throw error;
  }
};