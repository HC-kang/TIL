import Redis from 'ioredis';
import type { QueueOptions, Message, QueueAdapter } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class AtMostOnceRedisAdapter implements QueueAdapter {
  private client: Redis;
  private options: QueueOptions;

  constructor(redisUrl: string, options: QueueOptions) {
    this.client = new Redis(redisUrl);
    this.options = options;
  }

  async connect(): Promise<void> {
    // Redis 연결은 생성자에서 이미 처리됨
    return Promise.resolve();
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
    
    await this.client.lpush(
      this.options.queueName,
      JSON.stringify(messageWithId)
    );
  }

  async receiveMessage(): Promise<Message | null> {
    const result = await this.client.rpop(this.options.queueName);
    if (!result) return null;
    
    return JSON.parse(result) as Message;
  }

  async acknowledgeMessage(message: Message): Promise<void> {
    // Redis의 rpop은 이미 메시지를 큐에서 제거하므로 별도 작업 필요 없음
    return Promise.resolve();
  }
}
