export type QueueAdapter = {
  // 기본 메서드
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  // 메시지 처리
  sendMessage(message: Message): Promise<void>;
  receiveMessage(): Promise<Message | null>;
};

export type QueueOptions = {
  queueName: string;
};

// 메시지 인터페이스
export type Message = {
  id: string;
  content: string;
};

export type MessageStats = {
  produced: number;
  consumed: number;
  lost: number;
  failed: number;
  total: number;
};
