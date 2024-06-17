const express = require('express');
const app = express();
const port = 3000;

// 전역 변수에 의한 메모리 누수
let leakyArray = [];

app.get('/leak/global-variable', (req, res) => {
  function createMemoryLeak() {
    const largeData = new Array(1000000).fill('leak');
    leakyArray.push(largeData);
    console.log(`Memory used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
  }

  createMemoryLeak();
  res.send('Global variable memory leak created!');
});

// 전역 변수를 사용하지 않는 경우
app.get('/no-leak/global-variable', (req, res) => {
  function createMemoryLeak() {
    const largeData = new Array(1000000).fill('leak');
    console.log(`Memory used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
  }

  createMemoryLeak();
  res.send('No global variable memory leak created!');
});

// 클로저에 의한 메모리 누수
app.get('/leak/closure', (req, res) => {
  function createMemoryLeak() {
    const largeData = new Array(1000000).fill('leak');
    return function leakyFunction() {
      console.log(largeData.length);
    };
  }

  const leakyFunction = createMemoryLeak();
  leakyFunction(); // 사용되지 않음으로서 메모리 누수 발생
  res.send('Closure memory leak created!');
});

// 이벤트 리스너에 의한 메모리 누수
const EventEmitter = require('events');
const emitter = new EventEmitter();

app.get('/leak/event-emitter', (req, res) => {
  function createMemoryLeak() {
    const largeData = new Array(1000000).fill('leak');
    emitter.on('event', () => {
      console.log(largeData.length);
    });
  }

  createMemoryLeak();
  emitter.emit('event'); // 이벤트 트리거
  res.send('Event emitter memory leak created!');
});

// 타이머에 의한 메모리 누수
app.get('/leak/timer', (req, res) => {
  function createMemoryLeak() {
    const largeData = new Array(1000000).fill('leak');
    setInterval(() => {
      console.log(largeData.length);
    }, 1000);
  }

  createMemoryLeak();
  res.send('Timer memory leak created!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
