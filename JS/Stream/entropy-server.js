import { createServer } from 'http';
import Chance from 'chance';

const chance = new Chance();
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  while (chance.bool({ likelihood: 95 })) {
    res.write(`${chance.string()}\n`);
  }
  res.end('\nThe end...\n');
  res.on('finish', () => console.log('All data was sent'));
});
server.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
