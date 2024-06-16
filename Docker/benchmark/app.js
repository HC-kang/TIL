const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');
const app = express();
const port = 3000;

function generateStringDataInMB(baseString, sizeInMB) {
  const repeatCount = Math.ceil((sizeInMB * 1024 * 1024) / baseString.length);
  return baseString.repeat(repeatCount);
}

app.get('/network', (req, res) => {
  res.send('Network endpoint response');
});

app.get('/disk-io', async (req, res) => {
  const filePath = './shared/testfile.txt';
  const fileContent = generateStringDataInMB('Some content to write to the file', 100); // Generate ~100MB of data

  try {
    await fs.writeFile(filePath, fileContent);
    const data = await fs.readFile(filePath, 'utf8');
    await fs.unlink(filePath);
    res.send(`File content length: ${data.length} and file deleted successfully`);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.get('/cpu', (req, res) => {
  const start = Date.now();

  for (let i = 0; i < 1e5; i++) {
    crypto.createHash('sha256').update('test').digest('hex');
  }

  const end = Date.now();
  res.send(`CPU intensive task completed in ${end - start} ms`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
