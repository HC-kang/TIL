import Redis from 'ioredis';
import type { QueueOptions, Message, QueueAdapter } from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Stream을 사용하기 위한 Redis 어댑터
 */
export class RedisAdapter implements QueueAdapter {
  private client: Redis;
  private options: QueueOptions;
  private processedSetKey: string;

  constructor(redisUrl: string, options: QueueOptions) {
    this.client = new Redis(redisUrl);
    this.options = options;
    // 처리된 메시지 ID를 저장할 Redis Set의 키
    this.processedSetKey = `${this.options.queueName}:processed`;
  }

  async connect(): Promise<void> {
    // Redis 연결 확인
    await this.client.ping();
    console.log('Redis에 연결되었습니다.');
    
    // 스트림이 존재하는지 확인하고 없으면 빈 메시지로 생성
    const streamExists = await this.client.exists(this.options.queueName);
    if (!streamExists) {
      // 스트림 생성 (더미 메시지 추가 후 바로 삭제)
      const dummyId = await this.client.xadd(
        this.options.queueName,
        '*',
        'dummy', 'true'
      );
      if (dummyId) {
        await this.client.xdel(this.options.queueName, dummyId);
      }
      console.log(`스트림 ${this.options.queueName}이(가) 생성되었습니다.`);
    }
    
    // 소비자 그룹 생성 (이미 존재하는 경우 에러 무시)
    try {
      const groupName = this.options.queueName + '-group';
      await this.client.xgroup('CREATE', 
        this.options.queueName, 
        groupName, 
        '0', // 처음부터 모든 메시지 처리
        'MKSTREAM' // 스트림이 없으면 생성
      );
      console.log(`소비자 그룹 ${groupName}이(가) 생성되었습니다.`);
    } catch (error: unknown) {
      // BUSYGROUP 에러는 이미 그룹이 존재한다는 의미이므로 무시
      if (typeof error === 'object' && error !== null && 'message' in error && 
          typeof error.message === 'string' && !error.message.includes('BUSYGROUP')) {
        throw error;
      }
      console.log(`소비자 그룹이 이미 존재합니다.`);
    }
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
    console.log('Redis 연결이 종료되었습니다.');
  }

  async sendMessage(message: Message): Promise<void> {
    const streamId = await this.client.xadd(
      this.options.queueName,
      '*',  // 자동 ID 생성
      'applicationId', message.id || uuidv4(),
      'data', JSON.stringify(message.content),
      'timestamp', Date.now().toString()
    );
    
    // 메시지 객체에 streamId 추가 (참조로 전달된 경우 유용)
    message.streamId = streamId || undefined;
    console.log(`메시지가 전송되었습니다. 애플리케이션 ID: ${message.id}, Stream ID: ${streamId}`);
  }

  async receiveMessage(): Promise<Message | null> {
    // 스트림에서 메시지 읽기 (XREADGROUP 사용)
    const result = await this.client.xreadgroup(
      'GROUP', 
      this.options.queueName + '-group', 
      'consumer-1',
      'COUNT', '1',
      'BLOCK',  1000,
      'STREAMS', 
      this.options.queueName,
      '>'  // 아직 처리되지 않은 메시지만
    ) as [string, [string, string[]]][];

    if (!result || result.length === 0) {
      return null;
    }

    const stream = result[0];
    const messages = stream[1];
    
    if (!messages) {
      return null;
    }

    const messageFields = messages[0][1];
    
    // 메시지 필드를 객체로 변환
    const messageData: Record<string, string> = {};
    for (let i = 0; i < messageFields.length; i += 2) {
      messageData[messageFields[i]] = messageFields[i + 1];
    }

    const streamId = messages[0][0]; // Redis Stream ID

    return {
      id: messageData['applicationId'],
      streamId: streamId,
      content: JSON.parse(messageData['data']),
    };
  }

  async acknowledgeMessage(message: Message): Promise<void> {
    // 항상 streamId를 사용하여 명확하게 구분
    if (!message.streamId) {
      throw new Error('Stream ID가 없어 메시지를 확인할 수 없습니다.');
    }
    
    await this.client.xack(
      this.options.queueName,
      this.options.queueName + '-group',
      message.streamId
    );
    console.log(`메시지 확인됨 - 애플리케이션 ID: ${message.id}, Stream ID: ${message.streamId}`);
  }

  async getPendingMessages(): Promise<Message[]> {
    // 처리 대기 중인 메시지 상세 정보 조회
    const pendingMessages = await this.client.xpending(
      this.options.queueName,
      this.options.queueName + '-group',
      '-', // 시작 ID (최소값)
      '+', // 종료 ID (최대값)
      10   // 최대 조회 개수
    ) as any[];

    if (!pendingMessages || pendingMessages.length === 0) {
      return [];
    }

    const messages: Message[] = [];
    
    // 각 pending 메시지에 대해 실제 데이터 조회
    for (const pendingInfo of pendingMessages) {
      const streamId = pendingInfo[0];
      
      // XRANGE로 메시지 내용 조회
      const messageData = await this.client.xrange(
        this.options.queueName,
        streamId,
        streamId
      );
      
      if (messageData && messageData.length > 0) {
        const fields = messageData[0][1];
        const data: Record<string, string> = {};
        
        for (let i = 0; i < fields.length; i += 2) {
          data[fields[i]] = fields[i + 1];
        }
        
        messages.push({
          id: data['applicationId'],
          streamId: streamId,
          content: JSON.parse(data['data']),
        });
      }
    }
    
    return messages;
  }

  async claimMessage(message: Message): Promise<void> {
    if (!message.streamId) {
      throw new Error('Stream ID가 없어 메시지를 재할당할 수 없습니다.');
    }
    
    // 메시지 재할당 (다른 소비자가 처리 중이던 메시지를 현재 소비자가 가져옴)
    const claimedMessages = await this.client.xclaim(
      this.options.queueName,
      this.options.queueName + '-group',
      'consumer-retry', // 재시도 전용 소비자 이름
      60000,            // 최소 유휴 시간 (ms)
      message.streamId, // 재할당할 메시지의 Stream ID
      'JUSTID'          // ID만 반환 (메시지 내용은 필요 없음)
    );
    
    if (claimedMessages && claimedMessages.length > 0) {
      console.log(`메시지 재할당 성공 - 애플리케이션 ID: ${message.id}, Stream ID: ${message.streamId}`);
    } else {
      console.log(`메시지 재할당 실패 - 애플리케이션 ID: ${message.id}, Stream ID: ${message.streamId} (이미 다른 소비자에게 할당되었거나 존재하지 않음)`);
    }
  }

  /**
   * 메시지가 이미 처리되었는지 확인
   */
  async isMessageProcessed(messageId: string): Promise<boolean> {
    const exists = await this.client.sismember(this.processedSetKey, messageId);
    return exists === 1;
  }

  /**
   * 처리된 메시지 ID를 Redis에 저장
   */
  async markMessageAsProcessed(messageId: string): Promise<void> {
    await this.client.sadd(this.processedSetKey, messageId);
  }
}
