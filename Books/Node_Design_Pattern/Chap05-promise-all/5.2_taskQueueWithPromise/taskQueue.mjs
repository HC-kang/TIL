export class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task().finally(() => {
        this.running--;
        this.next();
      });
      this.running++;
    }
  }
  runTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await task());
        } catch (err) {
          reject(err);
        }
      });
      process.nextTick(this.next.bind(this));
    });
  }
}

const queue = new TaskQueue(2);
function createTask(id) {
  return () =>
    new Promise((resolve) => {
      console.log(`Task ${id} started`);
      setTimeout(() => {
        console.log(`Task ${id} completed`);
        resolve();
      }, 1000);
    });
}

// Push tasks to the queue
for (let i = 1; i <= 5; i++) {
  queue.runTask(createTask(i));
}

console.log("All tasks pushed to the queue");

/**
 * Task 1 started
 * Task 2 started
Task 1 completed
Task 3 started
Task 2 completed
Task 4 started
Task 3 completed
Task 5 started
Task 4 completed
Task 5 completed
 */