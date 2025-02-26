import Redis from 'ioredis';
import type { QueueOptions, Message, QueueAdapter } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class AtLeastOnceRedisAdapter implements QueueAdapter {
  private client: Redis;
  private options: QueueOptions;
  private consumer: string;
  private consumerGroup: string;
  private streamKey: string;

  constructor(redisUrl: string, options: QueueOptions) {
    this.client = new Redis(redisUrl);
    this.options = options;
    this.streamKey = this.options.queueName;
    this.consumerGroup = `${this.options.queueName}-group`;
    // 각 인스턴스에 고유한 consumer ID 부여
    this.consumer = `consumer-${uuidv4()}`;
  }

  async connect(): Promise<void> {
    try {
      // 스트림 존재 여부 확인
      const exists = await this.client.exists(this.streamKey);
      
      // 스트림이 존재하지 않으면 빈 스트림 생성
      if (exists === 0) {
        await this.client.xadd(this.streamKey, '*', 'init', 'init');
      }
      
      try {
        // 소비자 그룹 생성 시도
        await this.client.xgroup('CREATE', this.streamKey, this.consumerGroup, '0', 'MKSTREAM');
        console.log(`Consumer group '${this.consumerGroup}' created for stream '${this.streamKey}'`);
      } catch (err) {
        // 그룹이 이미 존재할 경우 무시 (BUSYGROUP 에러)
        if (err instanceof Error && err.message.includes('BUSYGROUP')) {
          console.log(`Consumer group '${this.consumerGroup}' already exists`);
        } else {
          throw err;
        }
      }
    } catch (error) {
      console.error('Error during connection:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }

  async sendMessage(message: Message): Promise<void> {
    const messageId = message.id || uuidv4();
    const messageWithId: Message = {
      ...message,
      id: messageId
    };
    
    // Stream에 메시지 추가 - '*'는 Redis가 ID를 자동 생성함을 의미
    await this.client.xadd(
      this.streamKey,
      '*',  // 자동 ID 생성
      'data', JSON.stringify(messageWithId)
    );
  }

  async receiveMessage(): Promise<Message | null> {
    // 소비자 그룹에서 메시지를 가져옴 (최대 1개)
    // '>'는 아직 처리되지 않은 새 메시지만 가져오는 특수 ID
    const streams = await this.client.xreadgroup(
      'GROUP', this.consumerGroup, this.consumer,
      'COUNT', 1,
      'BLOCK', 1000,  // 1초 동안 대기
      'STREAMS', this.streamKey, '>'
    ) as [string, [string, string[]][]][];

    if (!streams || streams.length === 0 || streams[0][1].length === 0) {
      return null;
    }

    const [[, messages]] = streams;
    const [messageId, [, messageData]] = messages[0];
    
    try {
      const parsedMessage = JSON.parse(messageData) as Message;
      // 원본 Redis Stream의 메시지 ID를 저장 (acknowledgeMessage에서 사용)
      return {
        ...parsedMessage,
        _redisStreamId: messageId
      };
    } catch (error) {
      console.error('메시지 파싱 오류:', error);
      // 파싱 오류가 있더라도 메시지를 확인해서 큐에서 제거
      await this.client.xack(this.streamKey, this.consumerGroup, messageId);
      return null;
    }
  }

  async acknowledgeMessage(message: Message): Promise<void> {
    // _redisStreamId가 없으면 처리할 수 없음
    if (!message._redisStreamId) {
      throw new Error('Redis Stream ID가 없어 메시지를 확인할 수 없습니다');
    }

    // 메시지 처리 완료를 확인
    await this.client.xack(
      this.streamKey, 
      this.consumerGroup, 
      message._redisStreamId as string
    );
  }

  // 배달되었지만 아직 확인(ack)되지 않은 메시지들을 다시 처리
  async reclaimPendingMessages(idleTimeMs: number = 30000): Promise<number> {
    // 'IDLE' 값보다 오랫동안 처리 중인 메시지들을 찾음
    const pendingInfo = await this.client.xpending(
      this.streamKey,
      this.consumerGroup,
      '-', '+', 100, // 최대 100개의 pending 메시지 조회
      this.consumer
    );

    if (!pendingInfo || pendingInfo.length === 0) {
      return 0;
    }

    let reclaimedCount = 0;

    for (const [messageId, consumerName, idleTime] of pendingInfo as [string, string, string][]) {
      // 지정된 시간보다 오래 처리 중인 메시지만 재확보
      if (Number(idleTime) >= idleTimeMs) {
        // 메시지를 현재 소비자에게 다시 할당
        const claimResult = await this.client.xclaim(
          this.streamKey,
          this.consumerGroup,
          this.consumer,
          idleTimeMs,
          messageId
        );
        
        if (claimResult && claimResult.length > 0) {
          reclaimedCount++;
        }
      }
    }

    return reclaimedCount;
  }
}