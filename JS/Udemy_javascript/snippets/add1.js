function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

let t1 = Date.now();
console.log(addUpTo(1000000000));
let t2 = Date.now();
console.log(`Time elapsed: ${(t2 - t1) / 1000} seconds.`);