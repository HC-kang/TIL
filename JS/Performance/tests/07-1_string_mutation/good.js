const { performance } = require('perf_hooks');

const classNames = new Array(100_000).fill(['primary', 'selected', 'active', 'medium']).flat();

function runTest() {
  const start = performance.now();
  const result = classNames
    .map((c) => 'button--' + c)
    .join(' ');
  const end = performance.now();
  console.log(result.length);
  console.log(`Good case: ${end - start}ms`);
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
console.log('--- 6회차 ---');
runTest();
global.gc();
console.log('--- 7회차 ---');
runTest();
global.gc();
console.log('--- 8회차 ---');
runTest();
global.gc();
console.log('--- 9회차 ---');
runTest();
global.gc();
console.log('--- 10회차 ---');
runTest();
global.gc();
console.log('--- 11회차 ---');
runTest();
global.gc();
console.log('--- 12회차 ---');
runTest();
global.gc();
console.log('--- 13회차 ---');
runTest();
global.gc();
console.log('--- 14회차 ---');
runTest();
global.gc();
console.log('--- 15회차 ---');
runTest();
global.gc();
