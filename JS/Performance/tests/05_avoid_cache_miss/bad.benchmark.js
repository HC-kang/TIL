const { performance } = require('perf_hooks');

const arr = Array.from({ length: 10_000_000 }).map(() => ({ x: 42, y: 0 }));
const arr2 = Array.from({ length: 10_000_000 }).map((_, i) => i);
arr2.sort(() => Math.random() - 0.5); // shuffle

function runTest() {
  const start = performance.now();
  let result = 0
  for (let i = 0; i < 10_000_000; i++) {
    result += arr[arr2[i]].x;
  }
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
