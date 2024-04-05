const express = require('express');
const cache = require('memory-cache');

const app = express();

app.get('/api/data', async (req, res) => {
  const cachedData = cache.get('cachedData');
  if (cachedData) {
    // return cached data if it exists
    console.log('returning cached data')
    return res.json(cachedData);
  }

  // fetch data from database if it doesn't exist
  const newData = await fetchData();

  // cache the data for 5 minutes
  cache.put('cachedData', newData, 5 * 60 * 1000);

  res.json(newData);
});

const fetchData = async () => {
  // fetch data from database
  console.log('fetching data...')
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'data' });
    }, 1000);
  });
};

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
