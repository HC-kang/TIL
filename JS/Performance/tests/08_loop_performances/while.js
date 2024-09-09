const { performance } = require('perf_hooks');

const arr = Array.from({ length: 10_000_000 }, (_, i) => i);

function runTest() {
  const start = performance.now();
  const startMemory = process.memoryUsage().heapUsed;
  let result = 0;
  let i = 0;
  while (i < arr.length) {
    if (arr[i]) {
      result += arr[i];
    }
    i++;
  }
  const end = performance.now();
  const endMemory = process.memoryUsage().heapUsed;
  console.log(result);
  console.log(`while: ${end - start}ms`);
  console.log(`Memory used: ${endMemory - startMemory} bytes`);
}

console.log('--- 1회차 ---');
runTest();
console.log('--- 2회차 ---');
runTest();
console.log('--- 3회차 ---');
runTest();
console.log('--- 4회차 ---');
runTest();
console.log('--- 5회차 ---');
runTest();
console.log('--- 6회차 ---');
runTest();
console.log('--- 7회차 ---');
runTest();
console.log('--- 8회차 ---');
runTest();
console.log('--- 9회차 ---');
runTest();
console.log('--- 10회차 ---');
runTest();
console.log('--- 11회차 ---');
runTest();
console.log('--- 12회차 ---');
runTest();
console.log('--- 13회차 ---');
runTest();
console.log('--- 14회차 ---');
runTest();
console.log('--- 15회차 ---');
runTest();
