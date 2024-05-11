const http = require('http');
const fs = require('fs').promises;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Hello World');
  } else if (req.url === '/about') {
    fs.readFile('./data-large.txt')
      // fs.readFile('./data-small.txt')
      .then(data => {
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Cache-Control', 'max-age=31536000, immutable')
        // res.statusCode = 304;
        res.end(data);
      })
      .catch(error => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading file');
      });
  } else if (req.url === '/home') {
    fs.readFile('./home.html')
      .then(data => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Connection', 'close');
        res.end(data);
      })
  } else if (req.url.startsWith('/images')) {
    const img = req.url.split('/')[2];
    fs.readFile(`./images/${img}`)
      .then(data => {
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Connection', 'close');
        res.end(data);
      })
      .catch(error => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image not found');
      });
  }
});

server.listen(3000, () => {
  console.log('Server running at port 3000');
});

