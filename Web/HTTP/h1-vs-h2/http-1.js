import https from 'https';
import fs from 'fs';
import { dirname, join } from 'path';
import url from 'url';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration for HTTPS
const options = {
  key: fs.readFileSync(join(__dirname, 'ssl', 'cert.key')),
  cert: fs.readFileSync(join(__dirname, 'ssl', 'cert.crt')),
  // ca: fs.readFileSync(join(__dirname, 'ssl', 'root.crt')),
};

const port = process.env.PORT || 3001;

const server = https.createServer(options, (req, res) => {
  // Parse the URL to get the pathname
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // Root endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'ok' }));
  } else if (pathname.startsWith('/img')) {
    // Static file serving for the /img directory
    const filePath = join(__dirname, pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // You might want to handle different file types
        res.end(data);
      }
    });
  } else {
    // Handle 404 for other paths
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
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
