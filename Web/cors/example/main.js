const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = { message: 'Hello, World!' };
  res.render('index', data);
});

app.options('/json', (req, res) => {
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.sendStatus(204);
});
app.get('/json', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.set('Content-Type', 'text/json; charset=utf-8');
  res.sendFile(jsonFilePath);
});
app.delete('/json', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
  })
  res.sendFile(jsonFilePath);
});

app.get('/json-cors', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  })
  res.sendFile(jsonFilePath);
});

// 커스텀 헤더가 추가되어 options 메서드가 필요함
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
  });
  res.sendFile(jsonFilePath);
});

// method가 변경되어 options 메서드가 필요함
app.options('/json-cors', (req, res) => {
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
  });
  res.sendStatus(204);
});
app.delete('/json-cors', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'public/sample.json');
  res.set({
    'Content-Type': 'text/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });
  res.sendFile(jsonFilePath);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
