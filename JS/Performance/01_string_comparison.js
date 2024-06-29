const { v4: uuidv4 } = require('uuid');
const { performance } = require('perf_hooks');
const crypto = require('crypto');

const arr = Array.from({ length: 1_000_000 }, () => uuidv4());

// Bad case
const start = performance.now();
let cnt1 = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i].startsWith('ab')) {
    cnt1++;
  }
}
const end = performance.now();
console.log(`Count: ${cnt1}`);
console.log(`Bad case: ${end - start}ms`);

// Better case
const start3 = performance.now();

const map = {
  ab: true,
}

let cnt3 = 0;
for (let i = 0; i < arr.length; i++) {
  if (map[arr[i].substring(0, 2)]) {
    cnt3++;
  }
}
const end3 = performance.now();
console.log(`Count: ${cnt3}`);
console.log(`Best case: ${end3 - start3}ms`);

// Best case
const start2 = performance.now();
let cnt2 = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i][0] === 'a' && arr[i][1] === 'b') {
    cnt2++;
  }
}
const end2 = performance.now();
console.log(`Count: ${cnt2}`);
console.log(`Good case: ${end2 - start2}ms`);