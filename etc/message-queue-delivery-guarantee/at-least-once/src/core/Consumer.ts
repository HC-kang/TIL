import type { Message, QueueAdapter } from '../types';
import { config } from '../config';
import { MessageCounter } from './MessageCounter';
const { consumer } = config;
/**
 * 메시지 큐 테스트를 위한 메시지 소비자.
 * 메시지 처리시간을 임의의 시간으로 조정하여 실제 메시지 처리를 모의한다.
 */
export class Consumer {
  public messageList: Message[] = []; // 결과 비교를 위한 메시지 별도 저장

  private name: string;
  private adapter: QueueAdapter;
  private messageCounter: MessageCounter;
  private retryInterval: NodeJS.Timer | null = null;

  constructor(name: string, adapter: QueueAdapter, messageCounter: MessageCounter) {
    this.name = name;
    this.adapter = adapter;
    this.messageCounter = messageCounter;
  }

  async connect(): Promise<void> {
    await this.adapter.connect();
    // 주기적으로 처리되지 않은 메시지 재시도
    this.startRetryProcess();
  }

  async disconnect(): Promise<void> {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
      this.retryInterval = null;
    }
    await this.adapter.disconnect();
  }

  /**
   * 큐로부터 메시지를 수신한다.
   * 이 과정에서 약 lossRate의 유실 확률을 가진다.
   */
  async receiveMessage(lossRate = consumer.lossRate): Promise<Message | null> {
    // 수신 소요시간 약 10ms
    const receiveTimeAboutMS = this.jitter(consumer.receiveTimeAboutMS);
    await new Promise((resolve) => setTimeout(resolve, receiveTimeAboutMS));

    const message = await this.adapter.receiveMessage();
    if (!message) {
      console.log(`[${this.name}] No message received`);
      return null;
    }

    // 유실 확률을 처리한다.
    if (Math.random() < lossRate) {
      console.log(
        `[${this.name}] Message loss - ${message?.id} ${message?.content}`
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
      console.log(`[${this.name}] No message received`);
      return;
    }

    console.log(
      `[${this.name}] Processing message: ${message.id} ${message.content}`
    );

    // +- 20% 랜덤 조정
    const jitteredProcessTime = this.jitter(processTimeAboutMS);

    await new Promise((resolve) => setTimeout(resolve, jitteredProcessTime));

    try {
      if (Math.random() < failureRate) {
        console.log(
          `[${this.name}] Message processing failed: ${message.id} ${message.content}`
        );
        this.messageCounter.incrementFailedMessages();
        throw new Error(`[${this.name}] Message processing failed`);
      }

      this.messageCounter.incrementConsumedMessages();
      console.log(
        `[${this.name}] Processed message: ${message.id} ${message.content}`
      );
      
      // 성공적으로 처리된 메시지는 ACK 처리
      await this.adapter.acknowledgeMessage(message);
      this.messageList.push(message);
    } catch (error) {
      // 실패한 메시지는 ACK하지 않음 (자동으로 PEL에 남음)
      console.error(`[${this.name}] Error processing message: ${message.id}`, error);
      // 여기서 ACK를 하지 않으면 메시지는 PEL에 남아 나중에 재처리됨
    }
  }

  /**
   * 처리되지 않은 메시지를 주기적으로 확인하고 재처리한다.
   */
  private startRetryProcess(): void {
    // 지정 시간마다 처리되지 않은 메시지 확인
    this.retryInterval = setInterval(async () => {
      try {
        await this.retryPendingMessages();
      } catch (error) {
        console.error(`[${this.name}] Error in retry process:`, error);
      }
    }, consumer.retryInterval); // 지정 시간마다 실행
  }

  /**
   * 처리되지 않은 메시지를 재처리한다.
   */
  private async retryPendingMessages(): Promise<void> {
    console.log(`[${this.name}] Checking for pending messages...`);
    
    // 처리되지 않은 메시지 조회
    const pendingMessages = await this.adapter.getPendingMessages();
    
    if (pendingMessages.length === 0) {
      console.log(`[${this.name}] No pending messages found`);
      return;
    }
    
    console.log(`[${this.name}] Found ${pendingMessages.length} pending messages`);
    
    // 각 메시지에 대해 재처리
    for (const message of pendingMessages) {
      console.log(`[${this.name}] Retrying message: ${message.id}`);
      
      // 메시지 재할당
      await this.adapter.claimMessage(message);

      // 유실 확률 처리
      if (Math.random() < consumer.lossRate) {
        console.log(`[${this.name}] Message loss - ${message.id} ${message.content}`);
        this.messageCounter.incrementLostMessages();
        continue;
      }
      
      // 메시지 재처리
      try {
        const retryProcessTime = this.jitter(consumer.processTimeAboutMS);
        await new Promise((resolve) => setTimeout(resolve, retryProcessTime));
        
        if (Math.random() < consumer.failureRate) {
          console.log(
            `[${this.name}] Retry failed for message: ${message.id}`
          );
          this.messageCounter.incrementFailedMessages();
          continue;
        }
        
        // 성공적으로 처리
        this.messageCounter.incrementConsumedMessages();
        console.log(`[${this.name}] Successfully retried message: ${message.id}`);
        await this.adapter.acknowledgeMessage(message);
        this.messageList.push(message);
      } catch (error) {
        console.error(`[${this.name}] Error retrying message: ${message.id}`, error);
        // 재시도 실패 시 ACK하지 않음 (다음 재시도 기회에 다시 처리)
      }
    }
  }

  private jitter(value: number): number {
    return value + (Math.random() - 0.5) * 2 * value * 0.2;
  }
}
