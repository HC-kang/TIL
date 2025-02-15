import { Socket, connect } from 'net';

export class Producer<T> {
  private socket: Socket;
  private messageBuffer = '';

  constructor(private readonly id: string) {
    this.socket = connect({ port: 11111 });
    
    this.socket.on('data', (data) => {
      this.messageBuffer += data.toString();
      this.processBuffer();
    });

    this.socket.on('error', (error) => {
      console.error(`PRODUCER ${this.id}: Connection error:`, error);
    });
  }

  private processBuffer() {
    const messages = this.messageBuffer.split('\n');
    this.messageBuffer = messages.pop() || '';

    for (const message of messages) {
      if (message) {
        try {
          const response = JSON.parse(message);
          this.socket.emit('message', response);
        } catch (error) {
          console.error(`PRODUCER ${this.id}: Failed to parse message:`, message);
        }
      }
    }
  }

  private sendMessage(message: any) {
    this.socket.write(JSON.stringify(message) + '\n');
  }

  produce(message: T): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sendMessage({
        type: 'enqueue',
        data: message,
        producerId: this.id
      });

      this.socket.once('message', (response) => {
        if (response.success) {
          console.log(`PRODUCER ${this.id}: Produced message:`, message);
          resolve();
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }
} 