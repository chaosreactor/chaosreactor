import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

import type { AppRouter } from './server';
import { CreateBlockInput, UpdateBlockInput } from './schemas/block.schema';

const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const procedure = t.procedure;

export { AppRouter };
export type { CreateBlockInput, UpdateBlockInput };
