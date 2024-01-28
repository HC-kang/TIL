const net = require('net');
const Response = require('./response');
const { parseRequest, genEtag, isMatch } = require('./utils');
const fs = require('fs').promises;

const PORT = 3000;

const middlewares = [];

const server = net.createServer((socket) => {
  let requestData = '';

  socket.on('data', async (data) => {
    if (!data) return socket.end();

    requestData += data.toString();
    if (!requestData.includes('\r\n\r\n')) {
      return;
    }

    const request = parseRequest(requestData);
    const response = new Response();

    request.socket = socket;
    response.socket = socket;

    let i = 0;
    const next = (err) => {
      if (err) {
        return errorMiddleware(err, request, response, next);
      }

      const middleware = middlewares[i];
      if (middleware) {
        i++;
        middleware(request, response, next);
      } else {
        const clientETag = request?.headers['If-None-Match'];
        if (clientETag && clientETag === response.headers['ETag']) {
          response.statusCode = 304;
          return socket.end(response.toString());
        }

        if (!request.handled) {
          response.socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
          response.socket.end();
        } else {
          response.socket.write(response.toString());
          response.socket.end();
        }
      }
    };
    next();
  });
});

function use(handler) {
  middlewares.push(handler);
}

function get(path, handler) {
  use((request, response, next) => {
    if (request.method === 'GET' && isMatch(path, request)) {
      request.handled = true;
      handler(request, response, next);
    } else {
      next();
    }
  });
}

use((request, response, next) => {
  const shouldKeepAlive = request?.headers['Connection']?.toLowerCase() === 'keep-alive';
  if (shouldKeepAlive) {
    response.headers['Connection'] = 'keep-alive';
    response.headers['Keep-Alive'] = 'timeout=5, max=1000';
    next();
  } else {
    response.headers['Connection'] = 'close';
    next();
  }
});

get('/', async (req, res, next) => {
  try {
    res.body = await fs.readFile('./views/index.html', 'utf8');
    const eTag = genEtag(res.body);
    res.headers['ETag'] = eTag;
    res.headers['Content-Length'] = Buffer.byteLength(res.body);
    res.headers['Content-Type'] = 'text/html';
    next();
  } catch (err) {
    next(err);
  }
})

get('/hobbies', async (req, res, next) => {
  try {
    res.body = await fs.readFile('./views/hobbies.html', 'utf8');
    const eTag = genEtag(res.body);
    res.headers['ETag'] = eTag;
    res.headers['Content-Length'] = Buffer.byteLength(res.body);
    res.headers['Content-Type'] = 'text/html';
    next();
  } catch (err) {
    next(err);
  }
})

get('/hobbies/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    res.body = await fs.readFile(`./views/hobbies/${id}.html`, 'utf8');
    const eTag = genEtag(res.body);
    res.headers['ETag'] = eTag;
    res.headers['Content-Length'] = Buffer.byteLength(res.body);
    res.headers['Content-Type'] = 'text/html';
    next();
  } catch (err) {
    next(err);
  }
});

function errorMiddleware(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.statusCode = 500;
  res.socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
  res.socket.end();
}

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}\n`);
});