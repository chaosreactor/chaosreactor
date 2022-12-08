import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@chaosreactor/trpc';

export const trpc = createTRPCReact<AppRouter>();
