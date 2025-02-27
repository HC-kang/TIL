export type QueueAdapter = {
  // 기본 메서드
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  // 메시지 처리
  sendMessage(message: Message): Promise<void>;
  receiveMessage(): Promise<Message | null>;
  acknowledgeMessage(message: Message): Promise<void>;
  getPendingMessages(): Promise<Message[]>;
  claimMessage(message: Message): Promise<void>;
};

export type QueueOptions = {
  queueName: string;
};

// 메시지 인터페이스
export type Message = {
  id: string;            // 애플리케이션 메시지 ID (비즈니스 ID)
  streamId?: string;     // Redis Stream ID
  content: string;
};

export type MessageStats = {
  produced: number;
  consumed: number;
  lost: number;
  failed: number;
  total: number;
};
