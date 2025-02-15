import { Queue } from './Queue';
import { Producer } from './Producer';
import { Consumer } from './Consumer';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

async function* generateMessages(): AsyncGenerator<Message, never, unknown> {
  let i = 0;
  while (true) {
    yield {
      id: `msg-${i}`,
      content: `Message ${i}`,
      timestamp: new Date()
    };
    i++;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function main() {
  // 생산자 생성 - queue 파라미터 제거
  const producer = new Producer<Message>('producer-1');

  // 소비자 생성 - queue 파라미터 제거하고 processMessage 함수만 전달
  const consumer = new Consumer<Message>('consumer-1', async (message: Message) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Processed message: ${message.content}`);
  });

  // 소비자 시작
  consumer.start().catch(console.error);

  // 무한 메시지 생성
  for await (const message of generateMessages()) {
    await producer.produce(message);
  }
}

main().catch(console.error); 