import { config } from './config';
import { Producer, Consumer, MessageCounter } from './core';
import { RedisAdapter } from './adapter/RedisAdapter';

/**
 * 메시지 큐 시스템을 실행하는 메인 함수
 * @param produceCount 생성할 메시지 총 개수
 */
async function runMessageQueueSystem(produceCount = 100) {
  const queueName = 'test-queue';

  // 메시지 카운터 초기화
  const messageCounter = new MessageCounter();

  // 프로듀서 설정
  const producerAdapter = new RedisAdapter(config.redis.url, { queueName });
  const producer = new Producer(producerAdapter, messageCounter);
  await producer.connect();

  // 컨슈머 설정
  const consumerAdapter1 = new RedisAdapter(config.redis.url, { queueName });
  const consumer1 = new Consumer(consumerAdapter1, messageCounter);
  await consumer1.connect();

  const consumerAdapter2 = new RedisAdapter(config.redis.url, { queueName });
  const consumer2 = new Consumer(consumerAdapter2, messageCounter);
  await consumer2.connect();

  try {
    // 메시지 처리 루프
    await processMessages(
      producer,
      consumer1,
      consumer2,
      messageCounter,
      produceCount
    );
  } finally {
    // 연결 종료
    await cleanupConnections(producer, consumer1, consumer2);
  }

  console.log('Done');
}

/**
 * 메시지 생성 및 처리 루프
 */
async function processMessages(
  producer: Producer,
  consumer1: Consumer,
  consumer2: Consumer,
  messageCounter: MessageCounter,
  produceCount: number
) {
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

      logMessageStats(messageCounter);
    } catch (error) {
      console.error('메시지 처리 중 오류 발생:', error);
    }
  }
}

/**
 * 메시지 통계 로깅
 */
function logMessageStats(messageCounter: MessageCounter) {
  const stats = messageCounter.getStats();
  
  console.log(
    `[Produced: ${stats.produced}, Consumed: ${stats.consumed}, Lost: ${stats.lost}, Failed: ${stats.failed}, Total: ${stats.total}]`
  );
}

/**
 * 연결 정리 및 종료
 */
async function cleanupConnections(
  producer: Producer,
  consumer1: Consumer,
  consumer2: Consumer
) {
  await producer.disconnect();
  await consumer1.disconnect();
  await consumer2.disconnect();
}

// 메인 함수 실행
runMessageQueueSystem().catch((error) => {
  console.error('애플리케이션 실행 중 오류 발생:', error);
  process.exit(1);
});
