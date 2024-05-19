import http2 from 'http2';
import fs from 'fs';
import url from 'url';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3002;

// Configuration for HTTP/2
const options = {
  key: fs.readFileSync(join(__dirname, 'ssl', 'server.key')),
  cert: fs.readFileSync(join(__dirname, 'ssl', 'server.crt')),
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  const parsedUrl = url.parse(headers[':path']);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // Root endpoint
    stream.respond({ 'content-type': 'application/json', ':status': 200 });
    stream.end(JSON.stringify({ message: 'ok' }));
  } else if (pathname.startsWith('/img')) {
    // Static file serving for the /img directory
    const filePath = join(__dirname, pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        stream.respond({ 'content-type': 'text/plain', ':status': 404 });
        stream.end('404 Not Found');
      } else {
        // Determine the content type based on file extension (simplified)
        const contentType = 'image/jpeg'; // You can enhance this to detect various file types
        stream.respond({ 'content-type': contentType, ':status': 200 });
        stream.end(data);
      }
    });
  } else {
    // Handle 404 for other paths
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
