function promiseAll(promises) {
  return new Promise(async (resolve, reject) => {
    const results = [];
    let promisesCount = 0;
    for (let i = 0; i < promises.length; i++) {
      try {
        const result = await promises[i];
        results.push(result);
        promisesCount++;
        if (promisesCount === promises.length) {
          resolve(results);
        }
      } catch (err) {
        reject(err);
        break;
      }
    }
  });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const promise1 = delay(1000).then(() => 'promise1');
// const promise1 = delay(1000).then(() => { throw new Error('promise1') });
const promise2 = delay(2000).then(() => 'promise2');
const promise3 = delay(3000).then(() => 'promise3');

promiseAll([promise1, promise2, promise3])
  .then((results) => {
    console.log(`All promise resolved: ${results.join(', ')}`)
  })
  .catch((err) => console.error(err));