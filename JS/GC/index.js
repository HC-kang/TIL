const fs = require('fs');
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
let leakyFunctions = [];

app.get('/leak/closure', (req, res) => {
  function createMemoryLeak() {
    const largeData = new Array(1000000).fill('leak');
    return function leakyFunction() {
      // largeData에 대한 참조를 유지합니다.
      console.log(largeData.length);
    };
  }

  const leakyFunction = createMemoryLeak();
  leakyFunctions.push(leakyFunction); // 클로저를 배열에 저장하여 참조를 유지합니다.
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

// 해제되지 않는 파일 디스크립터에 의한 메모리 누수
app.get('/leak/file-descriptor', (req, res) => {
  function createMemoryLeak() {
    fs.open('./example.txt', 'r', (err, fd) => {
      if (err) throw err;
      // 파일 디스크립터를 열지만 닫지 않습니다.
      console.log(`File descriptor: ${fd}`);
    });
    console.log(`Memory used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
  }

  createMemoryLeak();
  res.send('File descriptor memory leak created!');
});

// 1MB 객체 등록
app.get('/register/1mb-objects', (req, res) => {
  function registerObjects() {
    const objects = [];
    for (let i = 0; i < 10; i++) {
      const largeData = new Array(250000).fill('1mb'); // 약 1MB 크기
      objects.push(largeData);
      console.log(`1MB Object - Memory used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
    }
  }

  registerObjects();
  res.send('1MB objects registered!');
});

// 10MB 객체 등록
app.get('/register/10mb-objects', (req, res) => {
  function registerObjects() {
    const objects = [];
    for (let i = 0; i < 10; i++) {
      const largeData = new Array(2500000).fill('10mb'); // 약 10MB 크기
      objects.push(largeData);
      console.log(`10MB Object - Memory used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
    }
  }

  registerObjects();
  res.send('10MB objects registered!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
