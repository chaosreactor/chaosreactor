import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../src-trpc/server';

export const trpc = createTRPCReact<AppRouter>();
