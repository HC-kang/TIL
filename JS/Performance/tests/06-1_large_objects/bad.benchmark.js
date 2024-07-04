const { performance } = require('perf_hooks');

const byId = {};

for (let i = 0; i < 1_000_000; i++) {
  byId[i] = { id: i+1, name: 'name' };
}

function runTest() {
  const start = performance.now();
  let result = 0;
  Object.entries(byId).forEach(([_, user]) => {
    result += user.id;
  })
  const end = performance.now();
  console.log(`Result: ${result}`);
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
