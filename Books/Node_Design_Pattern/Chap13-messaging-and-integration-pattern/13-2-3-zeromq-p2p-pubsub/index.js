import { createServer } from 'http';
import staticHandler from 'serve-handler';
import { WebSocketServer, WebSocket } from 'ws';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import zeromq from 'zeromq';

// yargs 설정을 추가
const argv = yargs(hideBin(process.argv)).argv;

const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'www' });
});

let pubSocket;

async function initializeSocket() {
  pubSocket = new zeromq.Publisher();
  await pubSocket.bind(`tcp://127.0.0.1:${argv.pub}`);

  const subSocket = new zeromq.Subscriber();
  const subPorts = [].concat(argv.sub);
  for (const port of subPorts) {
    console.log(`Subscribing to ${port}`);
    subSocket.connect(`tcp://127.0.0.1:${port}`);
  }
  subSocket.subscribe('chat');

  for await (const [msg] of subSocket) {
    console.log(`Message from another server: ${msg}`);
    broadcast(msg.toString().split(' ')[1]);
  }
}

initializeSocket();

const wss = new WebSocketServer({ server });

wss.on('connection', client => {
  console.log('Client connected');
  client.on('message', msg => {
    console.log(`Message: ${msg}`);
    broadcast(msg);
    pubSocket.send(`chat ${msg}`);
  })
});

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  }
}

server.listen(argv.http || 8080);

/**
 * node index.js --http 8080 --pub 5000 --sub 5001 --sub 5002
 * node index.js --http 8081 --pub 5001 --sub 5000 --sub 5002
 * node index.js --http 8082 --pub 5002 --sub 5000 --sub 5001
 */