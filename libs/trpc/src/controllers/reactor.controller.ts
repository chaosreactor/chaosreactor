import { TRPCError } from '@trpc/server';
import { Graph, isBrowser } from 'noflo';

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
    const graph = new Graph('reactor');
    console.log('graph', graph);
    console.log('isBrowser', isBrowser());
    if (process.execPath) console.log('execPath', process.execPath);

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
