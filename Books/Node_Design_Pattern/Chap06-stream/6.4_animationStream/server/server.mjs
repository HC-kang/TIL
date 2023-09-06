import fs from 'fs';
import http from 'http';
import { Readable } from 'stream';
import { clearInterval } from 'timers';

const root = 'data';
const files = fs.readdirSync(root);

http
  .createServer((req, res) => {
    if (
      req.headers?.['user-agent'] &&
      !req.headers?.['user-agent'].includes('curl')
    ) {
      res.writeHead(302, {
        Location:
          'https://google.com',
      });
      return res.end();
    }

    const stream = new Readable();
    stream._read = function noop() {};
    stream.pipe(res);
    let fileIndex = 0;

    const interval = setInterval(() => {
      if (++fileIndex >= files.length) {
        fileIndex = 1;
      }
      const data = fs.readFileSync(`${root}/${files[fileIndex - 1]}`);
      stream.push('\u001b[2J\u001b[0;0H');
      stream.push(data.toString());
    }, 100);

    req.on('close', () => {
      console.log('Close request');
      clearInterval(interval);
    });
  })
  .listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
