import { Producer } from './Producer';
import process from 'process';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

async function* generateMessages(): AsyncGenerator<Message, never, unknown> {
  const pid = process.pid;
  let i = 0;
  
  while (true) {
    yield {
      id: `pid${pid}-msg${i}`,
      content: `Message from producer ${process.env.PRODUCER_ID || 'unknown'}: ${i}`,
      timestamp: new Date()
    };
    i++;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function main() {
  const producer = new Producer<Message>(process.env.PRODUCER_ID || 'producer-1');
  console.log(`PRODUCER: Started with ID ${process.env.PRODUCER_ID}`);

  for await (const message of generateMessages()) {
    await producer.produce(message);
  }
}

main().catch(console.error); 