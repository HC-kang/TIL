import type { MessageStats } from '../types';

export class MessageCounter {
  private totalMessages: number = 0;
  private producedMessages: number = 0;
  private consumedMessages: number = 0;
  private lostMessages: number = 0;
  private failedMessages: number = 0;

  // 기존 메서드들의 호환성을 위한 래퍼 메서드들
  public incrementProducedMessages(): void {
    this.producedMessages++;
  }

  public incrementConsumedMessages(): void {
    this.consumedMessages++;
    this.totalMessages++;
  }

  public incrementLostMessages(): void {
    this.lostMessages++;
    this.totalMessages++;
  }

  public incrementFailedMessages(): void {
    this.failedMessages++;
    this.totalMessages++;
  }

  public getProducedMessages(): number {
    return this.producedMessages;
  }

  public getConsumedMessages(): number {
    return this.consumedMessages;
  }

  public getLostMessages(): number {
    return this.lostMessages;
  }

  public getFailedMessages(): number {
    return this.failedMessages;
  }

  public getTotalMessages(): number {
    return this.totalMessages;
  }

  /**
   * 모든 메시지 통계를 한 번에 반환
   * @returns 모든 메시지 카운터 값을 포함하는 객체
   */
  public getStats(): MessageStats {
    return {
      produced: this.producedMessages,
      consumed: this.consumedMessages,
      lost: this.lostMessages,
      failed: this.failedMessages,
      total: this.totalMessages,
    };
  }
}
