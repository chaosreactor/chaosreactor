// @filename: server.ts
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';

const t = initTRPC.create();

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

const appRouter = t.router({
  reactorById: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;
      // const user = userList.find((u) => u.id === input);
      // return user;

      return {
        id: input,
        name: 'I am a block',
      };
    }),
});
export type AppRouter = typeof appRouter;

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);
