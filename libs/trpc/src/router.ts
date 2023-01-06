import { Block } from '../src/entities/block';
import { procedure, publicProcedure, router } from './trpc';
import {
  createBlockSchema,
  updateBlockSchema,
  filterQuery,
} from './schemas/block.schema';
import {
  createBlockController,
  updateBlockController,
  findAllBlocksController,
} from './controllers/block.controller';
import {
  runReactorController,
  reactorSubscriptionController,
} from './controllers/reactor.controller';


interface Reactor {
  id: string;
  name: string;
}

const reactorList: Reactor[] = [
  {
    id: '1',
    name: 'Intro',
  },
];

const appRouter = router({
  // Find a reactor by ID.
  reactorById: procedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      const reactor = reactorList.find((r) => r.id === input);
      return reactor;
    }),

  // Run the reactor.
  runReactor: procedure
    .input(filterQuery)
    .mutation(({ input }) => runReactorController({ filterQuery: input })),

  // Observe the reactor as it runs.
  reactorSubscription: procedure.subscription(() =>
    reactorSubscriptionController()
  ),

  // Find all blocks.
  blocksAll: procedure
    .input(filterQuery)
    .query(({ input }) => findAllBlocksController({ filterQuery: input })),

  // Create a new block.
  createBlock: procedure
    .input(createBlockSchema)
    .mutation(({ input }) => createBlockController({ input })),

  // Update a block.
  updateBlock: procedure
    .input(updateBlockSchema)
    .mutation(({ input }) => updateBlockController({ input })),
});
export type AppRouter = typeof appRouter;
export default appRouter;
