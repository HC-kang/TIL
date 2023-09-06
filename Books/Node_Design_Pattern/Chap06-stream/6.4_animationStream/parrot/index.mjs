import { createReadStream } from 'fs';

const totalFrame = 10;
const frameRate = 10;

let currentFrame = 0;

while (true) {
  await frameStreamer(currentFrame);
  currentFrame = (currentFrame + 1) % totalFrame;
}

function frameStreamer(frame) {
  return new Promise((resolve, reject) => {
    process.stdout.write('\u001b[2J\u001b[0;0H');
    const read = createReadStream(`./frames/${frame}.txt`, {
      encoding: 'utf8',
    });
    read.pipe(process.stdout);
    read.on('end', () => {
      setTimeout(() => {
        resolve();
      }, 1000 / frameRate);
    });
  });
}
