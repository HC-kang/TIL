const fs = require('fs');
const http2 = require('http2');
const path = require('path');

const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-cert.pem'))
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {

  console.log('Received request for:', headers[':path']);


  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200
  });

  stream.end('<h1>Hello, HTTP/2 with pure Node.js!</h1>');
});

server.on('error', (err) => {
  console.error('HTTP/2 server error:', err);
});

server.listen(3000, () => {
  console.log('HTTP/2 server listening on port 3000');
});
