const { performance } = require('perf_hooks');

const numbers = Array.from({ length: 10_000_000 }).map(() => Math.random())

function runTest() {
  const start = performance.now();
  let result = 0
  for (let i = 0; i < numbers.length; i++) {
    let n = Math.round(numbers[i] * 10)
    if (n % 2 !== 0) continue
    result = result + n
  }

  const end = performance.now();
  console.log(`Result: ${result}`);
  console.log(`Good case: ${end - start}ms`);
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
