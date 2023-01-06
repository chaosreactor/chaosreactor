import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import appRouter from './router';
// import { createContext } from './trpc';

const WEBSOCKET_PORT = 5002;
const wss = new ws.Server({
  port: WEBSOCKET_PORT,
});
const handler = applyWSSHandler({ wss, router: appRouter });

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log(
  `🧪 Launching Chaos Reactor WebSocket Server on ws://localhost:${WEBSOCKET_PORT}`
);

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});
