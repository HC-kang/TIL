const { performance } = require('perf_hooks');

const numbers = Array.from({ length: 10_000_000 }).map(() => Math.random())

function runTest() {
  const start = performance.now();
  const result =
    numbers
      .map(n => Math.round(n * 10))
      .filter(n => n % 2 === 0)
      .reduce((a, n) => a + n, 0)
  const end = performance.now();
  console.log(`Result: ${result}`);
  console.log(`Bad case: ${end - start}ms`);
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
