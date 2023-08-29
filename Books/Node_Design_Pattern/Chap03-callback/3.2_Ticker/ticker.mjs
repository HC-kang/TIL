import { EventEmitter } from 'events';

function ticker(number, cb) {
  const emitter = new EventEmitter();

  const step = 50;
  let count = 0;

  // process.nextTick(() => emitter.emit('tick', 'start tick!!!')); // ----> 3.3
  process.nextTick(() => {
    checkError(); // ----> 3.4
    emitter.emit('tick', 'start tick!!!')
  });

  const checkError = () => {  // ----> 3.4
    const timestamp = Date.now();
    if (timestamp % 5 === 0) {
      const error = new Error(`Error at ${timestamp}`);
      emitter.emit('error', error);
    }
  }

  const repeat = (n) => {
    if (n <= step) {
      return cb(`Done!! Ticked: ${count}`);
    }
    setTimeout(() => {
      checkError(); // ----> 3.4
      emitter.emit('tick', `Ticked: ${count++}`);
      repeat(n - step);
    }, step);
  }
  repeat(number);
  return emitter;
}

const cb = (count) => console.log(count);

ticker(500, cb).on('tick', cb);