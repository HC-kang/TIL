function promiseAll(promises) {
  return new Promise(async (resolve, reject) => {
    const result = [];
    let length = 0;
    let completed = 0;
    for (const p of promises) {
      length++;
      process.nextTick(async () => {
        try {
          result.push(await p);
          completed++;
          if (completed === length) {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      });
    }
  });
}

console.log(await Promise.all([
  1,
  'a',
  Promise.resolve(3),
  new Promise(r => setTimeout(() => r(4), 1000)),
  new Promise(r => setTimeout(() => r(5), 2000)), 
][Symbol.iterator]())
  .catch((err) => (console.error(err), err)))

console.log(await promiseAll([
  1,
  'a',
  Promise.resolve(3),
  new Promise(r => setTimeout(() => r(4), 1000)),
  new Promise(r => setTimeout(() => r(5), 2000)), 
][Symbol.iterator]())
  .catch((err) => (console.error(err), err)))
