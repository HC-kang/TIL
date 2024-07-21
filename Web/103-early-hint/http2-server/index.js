import http2 from 'http2';
import fs from 'fs';
import url from 'url';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options = {
  key: fs.readFileSync(join(__dirname, 'ssl', 'localhost.key')),
  cert: fs.readFileSync(join(__dirname, 'ssl', 'localhost.crt')),
  allowHTTP1: false,
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  const parsedUrl = url.parse(headers[':path'], true);
  const pathname = parsedUrl.pathname;
  const filePath = join(__dirname, 'public', pathname);

  // 일반적인 단일 200 응답
  if (pathname === '/') {
    fs.readFile(join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) {
        stream.respond({ ':status': 500 });
        stream.end('Internal Server Error');
        return;
      }

      setTimeout(() => {
        stream.respond({
          'content-type': 'text/html', ':status': 200
        });
        stream.end(data);
      }, 300);
    });
  }
  // 103 Early Hints 응답 사용
  else if (pathname === '/early-hints') {
    stream.additionalHeaders({
      ':status': 103,
      'Link': '</image.png>; rel=preload; as=image, </script.js>; rel=preload; as=script, </style.css>; rel=preload; as=style'
    });

    fs.readFile(join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) {
        stream.respond({ ':status': 500 });
        stream.end('Internal Server Error');
        return;
      }

      setTimeout(() => {
        stream.respond({
          'content-type': 'text/html', ':status': 200
        });
        stream.end(data);
      }, 300);
    });
  }
  // 이하는 기타 정적 파일 요청 처리
  else if (pathname === '/style.css') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        stream.respond({ ':status': 500 });
        stream.end('Internal Server Error');
        return;
      }
      stream.respond({ 'content-type': 'text/css', ':status': 200 });
      stream.end(data);
    });
  } else if (pathname === '/script.js') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        stream.respond({ ':status': 500 });
        stream.end('Internal Server Error');
        return;
      }
      stream.respond({ 'content-type': 'application/javascript', ':status': 200 });
      stream.end(data);
    });
  } else if (pathname === '/image.png') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        stream.respond({ ':status': 500 });
        stream.end('Internal Server Error');
        return;
      }
      stream.respond({ 'content-type': 'image/png', ':status': 200 });
      stream.end(data);
    });
  } else {
    stream.respond({ ':status': 404 });
    stream.end('Not Found');
  }
});

server.listen(3000, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Server started on https://localhost:3000');
  }
});
