import { sql, QueryResult } from 'kysely';
import { TRPCError } from '@trpc/server';
// import noflo from 'noflo';

import { FilterQueryInput } from '../schemas/block.schema';
import db from '../../db/client';
import type { BlockInterface } from '../../db/client';
import Dolt from '../../db/dolt';
import { ChaosReactorDB } from '../../db/data-source';
import { Block } from '../../src/entities/block';

// @see https://codevoweb.com/build-a-fullstack-trpc-crud-app-with-nextjs
export const runReactorController = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    console.log('Running reactor', filterQuery);

    const blocksRepository = ChaosReactorDB.getRepository(Block);
    const blocks = await blocksRepository.find();

    // Create a new NoFlo graph. This will be used to run the reactor.
    // const graph = new noflo.Graph('reactor');
    // console.log(noflo.isBrowser());
    console.log(typeof process);
    if (process.execPath) console.log(process.execPath.match(/node|iojs/));

    // Add a node for each block.
    blocks.forEach((block) => {
      console.log('block', block);
    });

    return blocks;
  } catch (error) {
    console.log('Error running reactor', error);

    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Eror running reactor',
      cause: error,
    });
  }
};
