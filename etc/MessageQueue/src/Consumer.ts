import { Socket, connect } from 'net';

export class Consumer<T> {
  private socket: Socket;
  private messageBuffer = '';

  constructor(
    private readonly id: string,
    private readonly processMessage: (message: T) => Promise<void>
  ) {
    this.socket = connect({ port: 11111 });

    this.socket.on('connect', () => {
      this.sendMessage({
        type: 'register',
        consumerId: this.id
      });
    });
    
    this.socket.on('data', (data) => {
      this.messageBuffer += data.toString();
      this.processBuffer();
    });

    this.socket.on('error', (error) => {
      console.error(`CONSUMER ${this.id}: Connection error:`, error);
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
          console.error(`CONSUMER ${this.id}: Failed to parse message:`, message);
        }
      }
    }
  }

  private sendMessage(message: any) {
    this.socket.write(JSON.stringify(message) + '\n');
  }

  async start(): Promise<void> {
    while (true) {
      try {
        const message = await this.dequeue();
        if (message) {
          await this.processMessage(message);
          console.log(`CONSUMER ${this.id}: Processed message:`, message);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`CONSUMER ${this.id}: Error processing message:`, error);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  private dequeue(): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.sendMessage({ type: 'dequeue' });
      
      this.socket.once('message', (response) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }
} 