const { performance } = require('perf_hooks');

let _ = 0

// 2. polymorphic
const o1 = { a: 1, b: _, c: _, d: _, e: _ }
const o2 = { a: 1, b: _, c: _, d: _, e: _ }
const o3 = { a: 1, b: _, c: _, d: _, e: _ }
const o4 = { a: 1, b: _, c: _, d: _, e: _ }
const o5 = { b: _, a: 1, c: _, d: _, e: _ } // this shape is different

function add(a1, b1) {
  return a1.a + a1.b + a1.c + a1.d + a1.e +
    b1.a + b1.b + b1.c + b1.d + b1.e
}

function runTest() {
  const start = performance.now();

  let result = 0
  for (let i = 0; i < 10_000_000; i++) {
    result += add(o1, o2)
    result += add(o3, o4)
    result += add(o4, o5)
  }
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
