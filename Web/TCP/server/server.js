const net = require('net');

const PORT = 3000;

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log(`Received data: ${data}`);

    socket.write(data);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
