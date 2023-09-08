export default class Queue {
  private queue: any[] = [];
  private consumers: any[] = [];

  constructor(executor: Function) {
    const enqueue = (item: any) => {
      if (this.consumers.length > 0) { // enqueue looking consumers array directly.
        this.consumers.shift()(item);
      } else {
        this.queue.push(item);
      }
    };

    executor(enqueue);
  }

  dequeue() {
    return new Promise((resolve, reject) => {
      if (this.queue.length === 0) {
        this.consumers.push(resolve);
      } else {
        resolve(this.queue.shift());
      }
    });
  }
}
