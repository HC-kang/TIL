const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

/**
 * /json 엔드포인트
 */
app.options('/json', (req, res) => {
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.sendStatus(204);
});
app.get('/json', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.sendFile(jsonFilePath);
});
app.delete('/json', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.sendFile(jsonFilePath);
});

/**
 * /json-header 엔드포인트
 */
app.options('/json-header', (req, res) => {
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'X-Test',
  });
  res.sendStatus(204);
});
app.get('/json-header', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'X-Test',
  });
  res.sendFile(jsonFilePath);
});

/**
 * /json-cors 엔드포인트
 */
app.options('/json-cors', (req, res) => {
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Test',
  });
  res.sendStatus(204);
});
app.get('/json-cors', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  })
  res.sendFile(jsonFilePath);
});
app.delete('/json-cors', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  })
  res.sendFile(jsonFilePath);
});

// 별도 출처를 사용하기 위해 3000, 3001 포트를 사용
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
