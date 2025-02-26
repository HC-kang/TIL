export class MessageCounter {
  private producedMessages = 0;
  private consumedMessages = 0;
  private lostMessages = 0;
  private failedMessages = 0;
  private totalMessages = 0;

  public incrementProducedMessages() {
    this.producedMessages++;
  }

  public incrementConsumedMessages() {
    this.consumedMessages++;
    this.totalMessages++;
  }

  public incrementLostMessages() {
    this.lostMessages++;
    this.totalMessages++;
  }

  public incrementFailedMessages() {
    this.failedMessages++;
    this.totalMessages++;
  }

  public getProducedMessages() {
    return this.producedMessages;
  }

  public getConsumedMessages() {
    return this.consumedMessages;
  }

  public getLostMessages() {
    return this.lostMessages;
  }

  public getFailedMessages() {
    return this.failedMessages;
  }

  public getTotalMessages() {
    return this.totalMessages;
  }
}
