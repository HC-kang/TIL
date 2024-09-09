const fs = require('fs');
const path = require('path');
const http2 = require('http2');
const Fastify = require('fastify');

const serverFactory = (handler, opts) => {
  const server = http2.createSecureServer({
    allowHTTP1: true,
    key: fs.readFileSync('./ssl/cert.key'),
    cert: fs.readFileSync('./ssl/cert.crt')
  });

  server.on('request', handler);
  return server;
};

const fastify = Fastify({
  logger: true,
  serverFactory
});

fastify.get('/', async (request, reply) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reply
      // .headers({
      //   'link': '</style.css>; rel=preload; as=style, </script.js>; rel=preload; as=script, </image.png>; rel=preload; as=image, <https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXiWtFCc.woff2>; rel=preload; as=style'
      // })
      .type('text/html')
      .send(data);
  } catch (err) {
    reply.code(500).send('Internal Server Error');
  }
});

fastify.get('/early-hints', async (request, reply) => {
  try {
    const stream = reply.raw.stream;

    // 103 Early Hints 상태 코드와 헤더를 먼저 보냅니다.
    stream.additionalHeaders({
      ':status': 103,
      'link': '</style.css>; rel=preload; as=style, </script.js>; rel=preload; as=script, </image.png>; rel=preload; as=image, <https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXiWtFCc.woff2>; rel=preload; as=style'
    });

    // 1초 후 최종 응답을 보냅니다.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
    reply
      // .headers({
      //   'link': '</style.css>; rel=preload; as=style, </script.js>; rel=preload; as=script, </image.png>; rel=preload; as=image, <https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXiWtFCc.woff2>; rel=preload; as=style'
      // })
      .type('text/html')
      .send(data);
  } catch (err) {
    console.log(err);
    reply.code(500).send('Internal Server Error');
  }
});

fastify.get('/style.css', async (request, reply) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'style.css'));
    reply.type('text/css').send(data);
  } catch (err) {
    reply.code(500).send('Internal Server Error');
  }
});

fastify.get('/script.js', async (request, reply) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'script.js'));
    reply.type('application/javascript').send(data);
  } catch (err) {
    reply.code(500).send('Internal Server Error');
  }
});

fastify.get('/image.png', async (request, reply) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'image.png'));
    reply.type('image/png').send(data);
  } catch (err) {
    reply.code(500).send('Internal Server Error');
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
