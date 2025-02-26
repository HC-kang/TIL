import { config } from './config';
import { Producer, Consumer, MessageCounter } from './core';
import { AtMostOnceRedisAdapter } from './adapter/AtMostOnceRedisAdapter';
import { AtLeastOnceRedisAdapter } from './adapter/AtLeastOnceRedisAdapter';
// const server = Bun.serve({
//   port: config.server.port,
//   fetch(req) {
//     return new Response('Hello, world!');
//   },
// });

// console.log(`Server is running on ${server.url}`);

// 메시지 처리 방식 선택
// AtMostOnceRedisAdapter : 메시지 처리 방식 1
// const redisAdapter = new AtMostOnceRedisAdapter(config.redis.url, {
//   queueName: 'test-queue',
// });
// AtLeastOnceRedisAdapter : 메시지 처리 방식 2
const redisAdapter = new AtLeastOnceRedisAdapter(config.redis.url, {
  queueName: 'test-queue',
});

const messageCounter = new MessageCounter();

const producer = new Producer(redisAdapter, messageCounter);

const consumer1 = new Consumer(redisAdapter, messageCounter);
const consumer2 = new Consumer(redisAdapter, messageCounter);

const produceCount = 100;
while (true) {
  const totalMessages = messageCounter.getTotalMessages();
  if (totalMessages >= produceCount) {
    break;
  }

  if (messageCounter.getProducedMessages() < produceCount) {
    producer.produceMessages(2);
  }
  try {
    await consumer1.processMessage();
    await consumer2.processMessage();

    const producedMessages = messageCounter.getProducedMessages();
    const consumedMessages = messageCounter.getConsumedMessages();
    const lostMessages = messageCounter.getLostMessages();
    const failedMessages = messageCounter.getFailedMessages();
    const totalMessages = messageCounter.getTotalMessages();

    console.log(
      `[Produced: ${producedMessages}, Consumed: ${consumedMessages}, Lost: ${lostMessages}, Failed: ${failedMessages}, Total: ${totalMessages}]`
    );
  } catch (error) {
    console.error(error);
  }
}
