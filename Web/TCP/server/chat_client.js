const net = require('net');
const readline = require('readline');

const HOST = 'localhost';
const PORT = 3000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();
client.connect(PORT, HOST, () => {
  rl.question('Enter your nickname: ', (nickname) => {
    client.write(nickname);

    rl.on('line', (line) => {
      if (line === 'exit') {
        client.end();
      } else {
        client.write(line);
      }
    });
  });
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('end', () => {
  console.log('Disconnected from server');
  rl.close();
  process.exit(0);
});
