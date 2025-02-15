import { Consumer } from './Consumer';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

async function main() {
  const consumer = new Consumer<Message>(
    process.env.CONSUMER_ID || 'consumer-1',
    async (message) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Processed message: ${message.content}`);
    }
  );

  await consumer.start();
}

main().catch(console.error); 