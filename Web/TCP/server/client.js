const net = require('net');

const HOST = 'localhost';
const PORT = 3000;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`Connected to server: ${HOST}:${PORT}`);

  client.write('Hello, server!');
});

client.on('data', (data) => {
  console.log(`Received: ${data}`);

  client.destroy();
});

client.on('close', () => {
  console.log('Connection closed');
});
