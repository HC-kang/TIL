const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', async (req, res) => {
  const data = await fs.promises.readFile('./public/index.html', 'utf8');

  // 300ms delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  res.send(data);
});

app.get('/early-hints', async (req, res) => {
  const data = await fs.promises.readFile('./public/index.html', 'utf8');
  await new Promise((resolve) => setTimeout(resolve, 300));
  res.send(data);
});

// public folder
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
