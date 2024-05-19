// // import { createServer } from 'http';
// // import { createApp, eventHandler, createRouter, toNodeListener } from 'h3';
// const http = require('http');
// const h3 = require('h3');

// const app = h3.createApp();

// const router = h3.createRouter()
//     .get('/', h3.eventHandler(() => 'Hello World!'))
//     .get('/hello/:name', h3.eventHandler((event) => `Hello ${event.context.params.name}!`)
//     );

// app.use(router);
// http.createServer(h3.toNodeListener(app)).listen(process.env.PORT || 3000);
// console.log('app is running on port 3000')

const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-cert.pem')),
    allowHTTP1: true,
    quic: {
        port: 443,
        key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-privkey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost-cert.pem')),
        maxCachedSessions: 100
    }
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
    stream.respond({ ':status': 200, 'content-type': 'text/plain' });
    stream.end('Hello HTTP/3');
});

server.listen(443, () => {
    console.log('HTTP/3 server is running on port 443');
});