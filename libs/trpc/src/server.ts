// @filename: server.ts
import * as http from 'http';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import 'reflect-metadata';

import migrateToLatest from '../db/migrator';
import { ChaosReactorDB } from '../db/data-source';
import appRouter from './router';

console.log('Launching server...');

const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext() {
    return {};
  },
});

// Run database migrations
console.log('Running migrations...');
migrateToLatest.then(() => {
  // Connect TypeORM to the migrated database
  console.log('Connecting to database...');
  ChaosReactorDB.initialize().then(() => {
    // Create and listen to the server handler
    console.log('Booting trpc server...');

    http
      .createServer((req, res) => {
        // act on the req/res objects

        // enable CORS
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1420');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );

        // accepts OPTIONS
        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          return res.end();
        }

        // then we can pass the req/res to the tRPC handler
        trpcHandler(req, res);
      })
      .listen(2022);
  });
});
