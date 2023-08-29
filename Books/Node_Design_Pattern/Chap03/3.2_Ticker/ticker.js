import { EventEmitter } from 'events';

function ticker(number, cb) {
  const eventEmitter = new EventEmitter();
  const step = 50;
  let cnt = 0;
  const repeat = (n) => {
    if (n < step) {
      return cb(`Done. Ticked: ${cnt}`);
    }
    setTimeout(() => {
      eventEmitter.emit('tick', `Ticked: ${cnt++}`);
      repeat(n - step);
    }, step);
  };
  repeat(number);
  return eventEmitter;
}
const cb = (count) => console.log(`Tik-Tok: ${count}`);

ticker(500, cb).on('tick', console.log);