const { performance } = require('perf_hooks');

const aa = { state: { center: { point: { x: 10, y: 20 } } } };
const bb = { state: { center: { point: { x: 10, y: 20 } } } };
const a = aa.state.center.point.x;
const b = bb.state.center.point.x;
const get = (i) => i % 2 ? a : b

function runTest() {
  const start = performance.now();
  let result = 0
  for (let i = 0; i < 10_000_000; i++) {
    result = result + get(i);
  }
  const end = performance.now();
  console.log(`Result: ${result}`);
  console.log(`Best case: ${end - start}ms`);
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
