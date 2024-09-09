const { performance } = require('perf_hooks');

const byId = {};

for (let i = 0; i < 1_000_000; i++) {
  byId[i] = { id: i+1, name: 'name' };
}

function runTest() {
  const start = performance.now();
  let result = 0;
  Object.keys(byId).forEach((id) => {
    result += byId[id].id;
  })
  const end = performance.now();
  console.log(`Result: ${result}`);
  console.log(`Better case: ${end - start}ms`);
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
