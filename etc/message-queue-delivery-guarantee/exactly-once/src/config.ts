export const config = {
  redis: {
    url: 'redis://localhost:6379',
  },
  producer: {
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'],
  },
  consumer: {
    // 생산 메시지 개수
    produceCount: 100,
    // 수신 대기 시간
    receiveTimeAboutMS: 10,
    // 유실 비율
    lossRate: 0.2,
    // 실패 비율
    failureRate: 0.1,
    // 처리 시간
    processTimeAboutMS: 50,
    // 재시도 시간 간격
    retryInterval: 3000,
    // 추가 대기 시간
    additionalWaitTime: 10000,
  },
};
