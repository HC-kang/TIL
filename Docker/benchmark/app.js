const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.get('/network', (req, res) => {
  res.send('Network endpoint response');
});

app.get('/disk-io', (req, res) => {
  const filePath = 'testfile.txt';
  const fileContent = 'Some content to write to the file';

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      res.status(500).send('Error writing file');
      return;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
        return;
      }

      res.send(`File content: ${data}`);
    });
  });
});

app.get('/cpu', (req, res) => {
  const start = Date.now();

  for (let i = 0; i < 1e6; i++) {
    crypto.createHash('sha256').update('test').digest('hex');
  }

  const end = Date.now();
  res.send(`CPU intensive task completed in ${end - start} ms`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
