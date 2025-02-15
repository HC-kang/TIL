import { createServer, Socket } from 'net';
import { Queue } from './Queue';
import Table from 'cli-table3';
import chalk from 'chalk';
import { clearScreen, moveCursor } from './utils/terminal';
import { spawn } from 'child_process';
import readline from 'readline';

interface QueueMessage<T> {
  type: 'enqueue' | 'dequeue' | 'register';
  data?: T;
  consumerId?: string;
  producerId?: string;
}

interface Consumer {
  id: string;
  lastSeen: Date;
  processedCount: number;
  createdAt: Date;
}

interface Producer {
  id: string;
  lastSeen: Date;
  messageCount: number;
  createdAt: Date;
}

class QueueServer<T> {
  private queue: Queue<T> = new Queue<T>();
  private server = createServer();
  private port = 11111;
  private consumers = new Map<string, Consumer>();
  private producers = new Map<string, Producer>();
  private startTime = new Date();
  private totalProcessed = 0;
  private processes = new Map<string, { type: 'producer' | 'consumer', process: any }>();

  private sendMessage(socket: Socket, message: any) {
    socket.write(JSON.stringify(message) + '\n');
  }

  start() {
    this.server.on('connection', (socket: Socket) => {
      let buffer = '';

      socket.on('data', (data) => {
        buffer += data.toString();
        const messages = buffer.split('\n');
        buffer = messages.pop() || '';

        for (const message of messages) {
          if (message) {
            try {
              const parsed: QueueMessage<T> = JSON.parse(message);
              
              switch (parsed.type) {
                case 'register': {
                  (socket as any).consumerId = parsed.consumerId;
                  this.updateConsumer(parsed.consumerId!);
                  this.sendMessage(socket, { success: true });
                  break;
                }
                
                case 'enqueue': {
                  this.queue.enqueue(parsed.data!);
                  if (parsed.producerId) {
                    this.updateProducer(parsed.producerId);
                  }
                  this.sendMessage(socket, { success: true });
                  break;
                }
                
                case 'dequeue': {
                  const item = this.queue.dequeue();
                  if (item) {
                    const consumerId = (socket as any).consumerId;
                    if (consumerId) {
                      this.updateConsumer(consumerId);
                      this.totalProcessed++;
                    }
                  }
                  this.sendMessage(socket, { success: true, data: item });
                  break;
                }
              }
            } catch (error: any) {
              this.sendMessage(socket, { success: false, error: error.message });
            }
          }
        }
      });
    });

    this.server.listen(this.port, () => {
      console.log(chalk.cyan(`QUEUE: Server listening on port ${this.port}`));
      this.startDashboard();
      this.startKeyboardHandler();
    });
  }

  private updateConsumer(consumerId: string) {
    const consumer = this.consumers.get(consumerId) || {
      id: consumerId,
      processedCount: 0,
      lastSeen: new Date(),
      createdAt: new Date()
    };

    consumer.processedCount++;
    consumer.lastSeen = new Date();
    this.consumers.set(consumerId, consumer);
  }

  private updateProducer(producerId: string) {
    const producer = this.producers.get(producerId) || {
      id: producerId,
      messageCount: 0,
      lastSeen: new Date(),
      createdAt: new Date()
    };

    producer.messageCount++;
    producer.lastSeen = new Date();
    this.producers.set(producerId, producer);
  }

  private startDashboard() {
    setInterval(() => {
      this.renderDashboard();
    }, 500);
  }

  private startKeyboardHandler() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        this.shutdown();
      }

      switch (key.name) {
        case 'p':  // 프로듀서 추가
          this.createProducer();
          break;
        case 'o':  // 프로듀서 제거
          this.removeLastProducer();
          break;
        case 'c':  // 컨슈머 추가
          this.createConsumer();
          break;
        case 'x':  // 컨슈머 제거
          this.removeLastConsumer();
          break;
      }
    });

    // 키 가이드 추가
    this.renderKeyGuide();
  }

  private createProducer() {
    const id = `producer-${this.processes.size + 1}`;
    const producer = spawn('bun', ['src/startProducer.ts'], {
      env: { ...process.env, PRODUCER_ID: id }
    });

    this.processes.set(id, { type: 'producer', process: producer });
    console.log(chalk.green(`Created producer: ${id}`));
  }

  private createConsumer() {
    const id = `consumer-${this.processes.size + 1}`;
    const consumer = spawn('bun', ['src/startConsumer.ts'], {
      env: { ...process.env, CONSUMER_ID: id }
    });

    this.processes.set(id, { type: 'consumer', process: consumer });
    console.log(chalk.green(`Created consumer: ${id}`));
  }

  private removeLastProducer() {
    const producers = Array.from(this.processes.entries())
      .filter(([_, info]) => info.type === 'producer');
    
    if (producers.length > 0) {
      const [id, info] = producers[producers.length - 1];
      info.process.kill();
      this.processes.delete(id);
      console.log(chalk.red(`Terminated producer: ${id}`));
    }
  }

  private removeLastConsumer() {
    const consumers = Array.from(this.processes.entries())
      .filter(([_, info]) => info.type === 'consumer');
    
    if (consumers.length > 0) {
      const [id, info] = consumers[consumers.length - 1];
      info.process.kill();
      this.processes.delete(id);
      console.log(chalk.red(`Terminated consumer: ${id}`));
    }
  }

  private renderKeyGuide() {
    const guide = [
      chalk.cyan('Keyboard Controls:'),
      `${chalk.yellow('p')} - Add new producer`,
      `${chalk.yellow('o')} - Remove last producer`,
      `${chalk.yellow('c')} - Add new consumer`,
      `${chalk.yellow('x')} - Remove last consumer`,
      `${chalk.yellow('Ctrl+C')} - Shutdown server`,
    ];

    console.log('\n' + guide.join('\n'));
  }

  private shutdown() {
    console.log(chalk.yellow('\nShutting down...'));
    
    // 모든 프로세스 종료
    this.processes.forEach(({ process }) => {
      process.kill();
    });

    // 서버 종료
    this.server.close(() => {
      console.log(chalk.green('Server shutdown complete'));
      process.exit(0);
    });
  }

  private renderDashboard() {
    clearScreen();
    moveCursor(0, 0);

    // 헤더
    console.log(chalk.bold.cyan('🚀 Message Queue Dashboard'));
    console.log(chalk.gray('━'.repeat(50)));

    // 큐 상태
    const queueTable = new Table({
      head: [
        chalk.cyan('Queue Statistics'),
        chalk.cyan('Value')
      ],
      style: { head: [], border: [] }
    });

    const uptime = Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000);
    
    queueTable.push(
      ['Messages in Queue', chalk.yellow(this.queue.size().toString())],
      ['Total Processed', chalk.green(this.totalProcessed.toString())],
      ['Uptime (seconds)', chalk.blue(uptime.toString())]
    );

    console.log(queueTable.toString());
    console.log(chalk.gray('━'.repeat(50)));

    // 프로듀서 목록
    const producerTable = new Table({
      head: [
        chalk.cyan('Producer ID'),
        chalk.cyan('Messages Sent'),
        chalk.cyan('Last Seen'),
        chalk.cyan('Status'),
        chalk.cyan('Production Rate')
      ],
      style: { head: [], border: [] }
    });

    const now = new Date();
    this.producers.forEach(producer => {
      const lastSeenSeconds = Math.floor((now.getTime() - producer.lastSeen.getTime()) / 1000);
      const producerUptime = Math.max(1, Math.floor((now.getTime() - producer.createdAt.getTime()) / 1000));
      const status = lastSeenSeconds < 5 
        ? chalk.green('● Active')
        : chalk.red('● Inactive');
      
      const rate = producer.messageCount / producerUptime;

      producerTable.push([
        chalk.yellow(producer.id),
        producer.messageCount.toString(),
        `${lastSeenSeconds}s ago`,
        status,
        `${rate.toFixed(2)}/s`
      ]);
    });

    console.log(chalk.bold('Active Producers'));
    console.log(producerTable.toString());
    console.log(chalk.gray('━'.repeat(50)));

    // 컨슈머 목록
    const consumerTable = new Table({
      head: [
        chalk.cyan('Consumer ID'),
        chalk.cyan('Messages Processed'),
        chalk.cyan('Last Seen'),
        chalk.cyan('Status'),
        chalk.cyan('Processing Rate')
      ],
      style: { head: [], border: [] }
    });

    this.consumers.forEach(consumer => {
      const lastSeenSeconds = Math.floor((now.getTime() - consumer.lastSeen.getTime()) / 1000);
      const consumerUptime = Math.max(1, Math.floor((now.getTime() - consumer.createdAt.getTime()) / 1000));
      const status = lastSeenSeconds < 5 
        ? chalk.green('● Active')
        : chalk.red('● Inactive');
      
      const rate = consumer.processedCount / consumerUptime;

      consumerTable.push([
        chalk.yellow(consumer.id),
        consumer.processedCount.toString(),
        `${lastSeenSeconds}s ago`,
        status,
        `${rate.toFixed(2)}/s`
      ]);
    });

    console.log(chalk.bold('Active Consumers'));
    console.log(consumerTable.toString());

    // 전체 처리율
    const totalRate = this.totalProcessed / uptime;
    console.log(chalk.gray('━'.repeat(50)));
    console.log(chalk.bold('Total Processing Rate: ') + 
      chalk.green(`${totalRate.toFixed(2)} messages/second`));

    // 키 가이드 추가
    this.renderKeyGuide();
  }
}

// 큐 서버 시작
new QueueServer().start(); 