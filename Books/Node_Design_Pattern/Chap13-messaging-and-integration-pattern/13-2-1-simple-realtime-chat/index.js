import { createServer } from 'http';
import staticHandler from 'serve-handler';
import { WebSocketServer, WebSocket } from 'ws';

const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'www' })
})

const wss = new WebSocketServer({ server });
wss.on('connection', (client) => {
  console.log('Client connected');
  client.on('message', msg => {
    console.log(`Message: ${msg}`);
    broadcast(msg.toString());
  })
})

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  }
}

server.listen(process.argv[2] || 8080);
