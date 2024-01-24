const net = require('net');

const clients = [];

const server = net.createServer((socket) => {
  const client = { socket, nickname: '' };
  clients.push(client);

  socket.on('data', (data) => {
    const message = data.toString().trim();

    if (!client.nickname) {
      client.nickname = message;
      console.log(`[${client.nickname}] joined the chat`);
      broadcast(`[${client.nickname}] joined the chat`, client);
      return;
    }

    console.log(`[${client.nickname}] ${message}`);
    broadcast(`[${client.nickname}] ${message}`, client);
  });

  socket.on('end', () => {
    console.log(`[${client.nickname}] left the chat`);
    broadcast(`[${client.nickname}] left the chat`, client);

    const index = clients.indexOf(client);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

const broadcast = (message, sender) => {
  clients.forEach(client => {
    if (client !== sender) {
      client.socket.write(message);
    }
  });
};

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
