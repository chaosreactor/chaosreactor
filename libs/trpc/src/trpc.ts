import { initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import type { AppRouter } from './router';
import { CreateBlockInput, UpdateBlockInput } from './schemas/block.schema';

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const procedure = t.procedure;

export const createContext = async (opts: CreateNextContextOptions) => {
  return {};
};

export type { AppRouter, CreateBlockInput, UpdateBlockInput };
