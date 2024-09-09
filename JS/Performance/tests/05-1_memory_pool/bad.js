const { performance } = require('perf_hooks');

function runTest() {
  const start = performance.now();
  let arr = new Array();
  for (let i = 0; i < 1_000_000; i++) { // 1_000_000보다 크게 하면, 오히려 Bad case가 더 빠름
    arr[i] = { x: 42, y: 0 };
  }
  const end = performance.now();
  console.log(`Bad case: ${end - start}ms`);
}

console.log('--- 1회차 ---');
runTest();
global.gc();
console.log('--- 2회차 ---');
runTest();
global.gc();
console.log('--- 3회차 ---');
runTest();
global.gc();
console.log('--- 4회차 ---');
runTest();
global.gc();
console.log('--- 5회차 ---');
runTest();
global.gc();
