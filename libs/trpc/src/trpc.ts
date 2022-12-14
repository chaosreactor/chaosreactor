import { initTRPC } from '@trpc/server';

import type { AppRouter } from './server';
import { CreateBlockInput, UpdateBlockInput } from './schemas/block.schema';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const procedure = t.procedure;

export type { AppRouter, CreateBlockInput, UpdateBlockInput };
