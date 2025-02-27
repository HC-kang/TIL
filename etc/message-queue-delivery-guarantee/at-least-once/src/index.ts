import { config } from './config';
import { Producer, Consumer, MessageCounter } from './core';
import { RedisAdapter } from './adapter/RedisAdapter';
import type { Message } from './types';

/**
 * 메시지 큐 시스템을 실행하는 메인 함수
 * @param produceCount 생성할 메시지 총 개수
 */
async function runMessageQueueSystem(
  produceCount = config.consumer.produceCount
) {
  const queueName = 'test-queue-at-least-once';

  // 메시지 카운터 초기화
  const messageCounter = new MessageCounter();

  // 프로듀서 설정
  const producerAdapter = new RedisAdapter(config.redis.url, { queueName });
  const producer = new Producer(producerAdapter, messageCounter);
  await producer.connect();

  // 컨슈머 설정
  const consumerAdapter1 = new RedisAdapter(config.redis.url, { queueName });
  const consumer1 = new Consumer(
    'consumer-1',
    consumerAdapter1,
    messageCounter
  );
  await consumer1.connect();

  const consumerAdapter2 = new RedisAdapter(config.redis.url, { queueName });
  const consumer2 = new Consumer(
    'consumer-2',
    consumerAdapter2,
    messageCounter
  );
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

  // 결과 비교
  compareMessageLists(
    producer.messageList,
    consumer1.messageList,
    consumer2.messageList
  );
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
  // 최대 실행 시간 설정 (5분)
  const maxRunTime = 5 * 60 * 1000;
  const startTime = Date.now();

  while (true) {
    // 최대 실행 시간 초과 시 종료
    if (Date.now() - startTime > maxRunTime) {
      console.log('최대 실행 시간 초과. 프로그램을 종료합니다.');
      break;
    }

    // 모든 메시지가 생산되고, 처리된 메시지(성공+실패+유실)가 생산된 메시지 이상이면 종료
    const stats = messageCounter.getStats();
    if (
      stats.produced >= produceCount &&
      stats.consumed + stats.lost + stats.failed >= stats.produced
    ) {
      console.log('모든 메시지가 처리되었습니다.');

      // 추가 대기 시간 (재시도 메커니즘이 한 번 더 실행될 수 있도록)
      console.log(
        `추가 대기 시간 시작 - ${config.consumer.additionalWaitTime}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, config.consumer.additionalWaitTime));

      // 마지막 상태 확인
      const finalStats = messageCounter.getStats();
      console.log('최종 메시지 처리 상태:');
      console.log(
        `생산: ${finalStats.produced}, 소비: ${finalStats.consumed}, 유실: ${finalStats.lost}, 실패: ${finalStats.failed}`
      );
      break;
    }

    // 메시지 생산 (목표치에 도달하지 않은 경우)
    if (stats.produced < produceCount) {
      producer.produceMessages(2);
    }

    try {
      // 메시지 처리
      await consumer1.processMessage();
      await consumer2.processMessage();

      logMessageStats(messageCounter);
    } catch (error) {
      console.error('메시지 처리 중 오류 발생:', error);
    }

    // 처리 간격 추가 (CPU 사용률 감소)
    await new Promise((resolve) => setTimeout(resolve, 50));
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

/**
 * 생성, 소비된 메시지를 ID 기반으로 비교
 */
function compareMessageLists(
  producerMessageList: Message[],
  consumer1MessageList: Message[],
  consumer2MessageList: Message[]
) {
  const uniqueProduced = new Set(producerMessageList.map((msg) => msg.id));
  const uniqueConsumed = new Set([
    ...consumer1MessageList.map((msg) => msg.id),
    ...consumer2MessageList.map((msg) => msg.id),
  ]);

  // 생성되었지만 소비되지 않은 메시지
  const unprocessedMessages = Array.from(uniqueProduced).filter(
    (id) => !uniqueConsumed.has(id)
  );
  console.log(
    '생성되었지만 소비되지 않은 메시지:',
    unprocessedMessages.length === 0 ? '없음' : unprocessedMessages
  );

  // 소비되었지만 생성되지 않은 메시지
  const unproducedMessages = Array.from(uniqueConsumed).filter(
    (id) => !uniqueProduced.has(id)
  );
  console.log(
    '소비되었지만 생성되지 않은 메시지:',
    unproducedMessages.length === 0 ? '없음' : unproducedMessages
  );

  // 처리된 고유 메시지, 횟수
  const processedMessages = [...consumer1MessageList, ...consumer2MessageList]
    .filter((msg) => uniqueConsumed.has(msg.id))
    .reduce((acc, msg) => {
      acc[msg.id] = (acc[msg.id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // 2회 이상 처리된 고유 메시지만 필터링
  const duplicateMessages = Object.entries(processedMessages).filter(
    ([_, count]) => count >= 2
  );

  // 전체 생산 메시지 수 = 모든 컨슈머가 소비한 메시지 수 - 중복 처리된 메시지 수 + 생산되었으나 소비되지 않은 메시지 수
  const uniqueProcessedMessages = processedMessages.length;
  console.log('생산된 메시지 수:', config.consumer.produceCount);
  console.log('1회이상 처리된 고유메시지 수:', uniqueProcessedMessages ?? '없음');
  console.log(
    `전체 수행결과 검증: ${config.consumer.produceCount === uniqueProcessedMessages}`
  );

  console.log(
    '2회 이상 처리된 고유 메시지/횟수:',
    duplicateMessages.length === 0 ? '없음' : duplicateMessages
  );
}
