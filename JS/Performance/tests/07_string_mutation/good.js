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
console.log('--- 2회차 ---');
runTest();
console.log('--- 3회차 ---');
runTest();
console.log('--- 4회차 ---');
runTest();
console.log('--- 5회차 ---');
runTest();
