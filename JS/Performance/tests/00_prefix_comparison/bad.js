const { performance } = require('perf_hooks');
const { v4: uuidv4 } = require('uuid');

const arr = Array.from({ length: 1_000_000 }, () => uuidv4());

function runTest() {
  const start = performance.now();
  let cnt = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].match(/^ab/)) {
      cnt++;
    }
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