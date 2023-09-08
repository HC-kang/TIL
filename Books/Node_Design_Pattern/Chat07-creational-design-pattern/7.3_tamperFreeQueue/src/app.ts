import Queue from './queue';
import http from 'http';

const NUM_CONSUMERS = 2;
const messageQueue = new Queue((enqueue: Function) => {
  http // Light weight Http server to use 'enqueue' function.
    .createServer((req, res) => {
      if (req.method === 'POST' && req.url === '/enqueue') {
        let body = "";
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          enqueue(body);
          res.end('Message enqueued');
        });
      } else {
        res.end('Invalid request');
      }
    })
    .listen(3000, () => {
      console.log('Listening on port 3000');
    });
});

async function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function consumeMessages() {
  const message = await messageQueue.dequeue(); // pushing resolve function to consumers array through 'enqueue' function.
  console.log('- Start Consuming:', message);
  await sleep(5000);
  console.log('- Done:', message);
  consumeMessages();
}

console.log(NUM_CONSUMERS);

for (let i = 0; i < NUM_CONSUMERS; i++) {
  consumeMessages();
}