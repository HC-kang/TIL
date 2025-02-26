import Redis from 'ioredis';
import type { QueueOptions, Message, QueueAdapter } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class RedisAdapter implements QueueAdapter {
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
}
