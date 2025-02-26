import type { Message, QueueAdapter } from '../types';
import { config } from '../config';
import { MessageCounter } from './MessageCounter';
const { consumer } = config;
/**
 * 메시지 큐 테스트를 위한 메시지 소비자.
 * 메시지 처리시간을 임의의 시간으로 조정하여 실제 메시지 처리를 모의한다.
 */
export class Consumer {
  private adapter: QueueAdapter;
  private messageCounter: MessageCounter;

  constructor(adapter: QueueAdapter, messageCounter: MessageCounter) {
    this.adapter = adapter;
    this.messageCounter = messageCounter;
  }

  async connect(): Promise<void> {
    await this.adapter.connect();
  }

  async disconnect(): Promise<void> {
    await this.adapter.disconnect();
  }

  /**
   * 큐로부터 메시지를 수신한다.
   * 이 과정에서 약 lossRate의 유실 확률을 가진다.
   */
  async receiveMessage(lossRate = consumer.lossRate): Promise<Message | null> {
    // 수신 소요시간 약 10ms
    await new Promise((resolve) => setTimeout(resolve, 10));

    const message = await this.adapter.receiveMessage();
    if (!message) {
      console.log('[Consumer] No message received');
      return null;
    }

    // 유실 확률을 처리한다.
    if (Math.random() < lossRate) {
      console.log(
        `[Consumer] Message loss - ${message?.id} ${message?.content}`
      );
      this.messageCounter.incrementLostMessages();
      return null;
    }

    return message;
  }

  /**
   * 메시지 처리 시간을 랜덤하게 조정하여 부하를 분산한다.
   * 처리 중 실패 확률을 10%로 가정한다.
   * @param processTimeAboutMS 처리 시간 기본값. Jitter 처리되므로 about으로 명시
   */
  async processMessage(
    processTimeAboutMS = consumer.processTimeAboutMS,
    failureRate = consumer.failureRate
  ): Promise<void> {
    const message = await this.receiveMessage();
    if (!message) {
      console.log('[Consumer] No message received');
      return;
    }

    console.log(
      `[Consumer] Processing message: ${message.id} ${message.content}`
    );

    // +- 20% 랜덤 조정
    const jitteredProcessTime =
      processTimeAboutMS + (Math.random() - 0.5) * 2 * processTimeAboutMS * 0.2;

    await new Promise((resolve) => setTimeout(resolve, jitteredProcessTime));

    if (Math.random() < failureRate) {
      console.log(
        `[Consumer] Message processing failed: ${message.id} ${message.content}`
      );
      this.messageCounter.incrementFailedMessages();
      throw new Error('[Consumer] Message processing failed');
    }

    this.messageCounter.incrementConsumedMessages();

    console.log(
      `[Consumer] Processed message: ${message.id} ${message.content}`
    );
  }
}
