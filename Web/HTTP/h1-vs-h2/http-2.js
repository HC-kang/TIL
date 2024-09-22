import http2 from 'http2';
import fs from 'fs';
import url from 'url';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3002;

const options = {
  key: fs.readFileSync(join(__dirname, 'ssl', 'cert.key')),
  cert: fs.readFileSync(join(__dirname, 'ssl', 'cert.crt')),
  // ca: fs.readFileSync(join(__dirname, 'ssl', 'root.crt')),
  allowHTTP1: false,
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  const parsedUrl = url.parse(headers[':path']);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    stream.respond({ 'content-type': 'application/json', ':status': 200 });
    stream.end(JSON.stringify({ message: 'ok' }));
  } else if (pathname.startsWith('/img')) {
    const filePath = join(__dirname, pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        stream.respond({ 'content-type': 'text/plain', ':status': 404 });
        stream.end('404 Not Found');
      } else {
        // 파일 확장자에 따른 콘텐츠 타입 설정 (간단한 예시)
        let contentType = 'application/octet-stream';
        if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
          contentType = 'image/jpeg';
        } else if (pathname.endsWith('.png')) {
          contentType = 'image/png';
        }

        stream.respond({ 'content-type': contentType, ':status': 200 });
        stream.end(data);
      }
    });
  } else if (pathname.startsWith('/NAVER_files')) {
    const naverFilePath = join(__dirname, './resource/NAVER_files', pathname.split('/').pop());
    fs.readFile(naverFilePath, (err, data) => {
      if (err) {
        stream.respond({ 'content-type': 'text/plain', ':status': 404 });
        stream.end('404 Not Found');
      } else {
        stream.respond({ 'content-type': 'application/octet-stream', ':status': 200 });
        stream.end(data);
      }
    });
  } else if (pathname.startsWith('/naver')) {
    const naverHtml = fs.readFileSync(join(__dirname, './resource/NAVER.html'));
    stream.respond({ 'content-type': 'text/html', ':status': 200 });
    stream.end(naverHtml);
  } else {
    stream.respond({ 'content-type': 'text/plain', ':status': 404 });
    stream.end('404 Not Found');
  }
});

server.listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log(`Listening on port: https://localhost:${port}`);
  }
});