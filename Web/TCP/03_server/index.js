const net = require('net');
const fs = require('fs').promises;

const PORT = 3000;

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', async (data) => {
    if (!data) return;

    const request = parseRequest(data);
    console.log(request);

    if (request?.headers['If-None-Match'] == 'W/"d-9gJr5K1Qb5qf3Jqy5xgkQ"') {
      const headers = {
        'Content-Type': 'text/html; charset=utf-8',
        Connection: 'close',
        ETag: 'W/"d-9gJr5K1Qb5qf3Jqy5xgkQ"',
      };
      response(socket, 304, headers, '');
    }

    const body = await fs.readFile('./index.html', 'utf-8');
    const headers = {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': body.length,
      Connection: 'close',
      ETag: 'W/"d-9gJr5K1Qb5qf3Jqy5xgkQ"',
    };

    response(socket, 200, headers, body);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

function parseRequest(data) {
  const temp = data.toString().split('\r\n');
  const firstLine = temp[0];
  const request = {
    method: firstLine.split(' ')[0],
    url: firstLine.split(' ')[1],
    version: firstLine.split(' ')[2],
    headers: {},
    body: temp[temp.length - 1],
  };
  for (let i = 1; i < temp.length - 2; i++) {
    const [key, value] = temp[i].split(': ');
    request.headers[key] = value;
  }
  return request;
}

function response(socket, status, headers, body) {
  socket.write(`HTTP/1.1 ${status} OK\r\n`);
  socket.write(`Content-Length: ${body.length}\r\n`);
  socket.write('Connection: close\r\n');
  socket.write('\r\n');
  socket.write(body);
  socket.end();
}
