const express = require('express');
const redis = require('redis');
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

const app = express();

client.connect();

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});

app.get('/api/data', async (req, res) => {
  const cachedData = await getAsync('cachedData');
  if (cachedData) {
    console.log('cached data found');
    return res.send(cachedData);
  }

  // Fetch data from database
  const newData = await fetchData();

  // Store data in cache
  console.log('storing data in cache...')
  client.set('cachedData', newData, 'EX', 300);

  res.send(newData);
});

const getAsync = async (key) => {
  console.log('fetching data from cache...')
  return await client.get(key);
};

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
      <html>
        <head>
          <title>Cache Headers</title>
        </head>
        <body>
          <h1>Cache Headers</h1>
          <p>Cache-Control: public, max-age=300</p>
          <a href="/api/data">Refresh</a>
        </body>
      </html>  
      `);
    }, 1000);
  });
};

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});