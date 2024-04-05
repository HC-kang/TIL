const express = require('express');
const cacheHeaders = require('express-cache-headers');
const app = express();

app.get('/api/data', cacheHeaders({ ttl: 300 }), async (req, res) => {
  // Fetch data from database
  console.log('fetching data...')
  const newData = await fetchData();

  res.send(newData);
});

const fetchData = () => {
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