import { config } from '../config';
import type { Message, QueueAdapter } from '../types';
import { MessageCounter } from './MessageCounter';
import { v4 as uuidv4 } from 'uuid';

/**
 * 메시지 큐 테스트를 위한 메시지 생산자.
 * 7가지 색상 중 랜덤하게 하나를 선택하여 메시지를 생산한다.
 */
export class Producer {
  private adapter: QueueAdapter;
  private colors: string[];
  private messageCounter: MessageCounter;
  constructor(adapter: QueueAdapter, messageCounter: MessageCounter ) {
    this.adapter = adapter;
    this.colors = config.producer.colors;
    this.messageCounter = messageCounter;
  }

  async connect(): Promise<void> {
    await this.adapter.connect();
  }

  async disconnect(): Promise<void> {
    await this.adapter.disconnect();
  }

  /**
   * 복잡도를 낮추기 위해, 메시지가 생산되고 큐에 저장되는 과정은 100% 성공한다고 가정한다.
   */
  async sendMessage(message: Message): Promise<void> {
    await this.adapter.sendMessage(message);
  }

  private async generateMessage(): Promise<Message> {
    // 생성 소요시간 약 10ms
    await new Promise((resolve) => setTimeout(resolve, 10));

    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    return {
      id: uuidv4(),
      content: color,
    };
  }

  async produceMessages(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      const message = await this.generateMessage();
      await this.sendMessage(message);
      this.messageCounter.incrementProducedMessages();
      console.log(`[Producer] Produced message: ${message.content}`);
    }
  }
}
