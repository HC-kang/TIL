const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Node.js server is running on http://localhost:3000/');
});
