export class Queue<T> {
  private messages: T[] = [];

  // 메시지 추가
  enqueue(message: T): void {
    this.messages.push(message);
  }

  // 메시지 가져오기
  dequeue(): T | undefined {
    return this.messages.shift();
  }

  // 큐의 크기
  size(): number {
    return this.messages.length;
  }

  // 큐가 비어있는지 확인
  isEmpty(): boolean {
    return this.messages.length === 0;
  }
} 