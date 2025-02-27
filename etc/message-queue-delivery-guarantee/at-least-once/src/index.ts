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
      await new Promise((resolve) =>
        setTimeout(resolve, config.consumer.additionalWaitTime)
      );

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

function compareMessageLists(
  producerMessageList: Message[],
  consumer1MessageList: Message[],
  consumer2MessageList: Message[]
): void {
  console.log('\n===== 메시지 처리 결과 분석 =====');

  // 고유 메시지 ID 집합 생성
  const uniqueProducedIds = new Set(producerMessageList.map((msg) => msg.id));
  const uniqueConsumedIds = new Set([
    ...consumer1MessageList.map((msg) => msg.id),
    ...consumer2MessageList.map((msg) => msg.id),
  ]);

  // 1. 생성되었지만 소비되지 않은 메시지 분석
  const unprocessedIds = Array.from(uniqueProducedIds).filter(
    (id) => !uniqueConsumedIds.has(id)
  );

  console.log('\n[1] 생성되었지만 소비되지 않은 메시지:');
  if (unprocessedIds.length === 0) {
    console.log('  없음 (모든 생성된 메시지가 처리됨)');
  } else {
    console.log(
      `  총 ${unprocessedIds.length}개 메시지 미처리: ${unprocessedIds.join(
        ', '
      )}`
    );
  }

  // 2. 소비되었지만 생성되지 않은 메시지 분석 (비정상 케이스)
  const unexpectedIds = Array.from(uniqueConsumedIds).filter(
    (id) => !uniqueProducedIds.has(id)
  );

  console.log('\n[2] 소비되었지만 생성되지 않은 메시지 (비정상):');
  if (unexpectedIds.length === 0) {
    console.log('  없음 (정상)');
  } else {
    console.log(
      `  총 ${unexpectedIds.length}개 비정상 메시지: ${unexpectedIds.join(
        ', '
      )}`
    );
  }

  // 3. 메시지별 처리 횟수 계산
  const messageProcessCounts: Record<string, number> = {};

  // 모든 소비자가 처리한 메시지를 합쳐서 ID별 처리 횟수 계산
  [...consumer1MessageList, ...consumer2MessageList].forEach((msg) => {
    messageProcessCounts[msg.id] = (messageProcessCounts[msg.id] || 0) + 1;
  });

  // 4. 중복 처리된 메시지 분석 (at-least-once 특성)
  const duplicateMessages = Object.entries(messageProcessCounts)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1]); // 처리 횟수 내림차순 정렬

  console.log('\n[3] 중복 처리된 메시지 (at-least-once 특성):');
  if (duplicateMessages.length === 0) {
    console.log('  없음 (모든 메시지가 정확히 1번씩 처리됨)');
  } else {
    console.log(`  총 ${duplicateMessages.length}개 메시지가 중복 처리됨:`);
    duplicateMessages.forEach(([id, count]) => {
      console.log(`  - 메시지 ID: ${id}, 처리 횟수: ${count}회`);
    });
  }

  // 5. 전체 통계 요약
  const uniqueProcessedCount = Object.keys(messageProcessCounts).length;
  const totalExpectedCount = config.consumer.produceCount;
  const isAllProcessed = uniqueProcessedCount === totalExpectedCount;

  console.log('\n[4] 전체 처리 통계:');
  console.log(`  - 생산된 메시지 수: ${totalExpectedCount}개`);
  console.log(`  - 처리된 고유 메시지 수: ${uniqueProcessedCount}개`);
  console.log(`  - 중복 처리된 메시지 수: ${duplicateMessages.length}개`);
  console.log(
    `  - 총 처리 횟수: ${
      consumer1MessageList.length + consumer2MessageList.length
    }회`
  );

  console.log('\n[5] 최종 검증 결과:');
  if (isAllProcessed) {
    console.log('  ✅ 성공: 모든 메시지가 최소 1회 이상 처리되었습니다.');
  } else {
    console.log(
      `  ❌ 실패: ${
        totalExpectedCount - uniqueProcessedCount
      }개 메시지가 처리되지 않았습니다.`
    );
  }

  console.log('\n===============================\n');
}
