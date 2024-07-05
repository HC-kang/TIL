const { performance } = require('perf_hooks');

// 1. string compare
const Position = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
}

function runTest() {
  const start = performance.now();
  let cnt = 0
  for (let i = 0; i < 10_000_000; i++) {
    let current = i % 2 === 0 ?
      Position.TOP : Position.BOTTOM
    if (current === Position.TOP)
      cnt += 1
  }
  const end = performance.now();
  console.log(`Count: ${cnt}`);
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
