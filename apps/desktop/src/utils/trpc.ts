import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../../libs/trpc/src/trpc';

export const trpc = createTRPCReact<AppRouter>();
