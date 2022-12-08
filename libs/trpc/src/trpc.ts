import { initTRPC } from '@trpc/server';
import type { AppRouter } from './server';

const t = initTRPC.create();

// We explicitly export the methods we use here
// This allows us to create reusable & protected base procedures
export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const procedure = t.procedure;

export { AppRouter };
