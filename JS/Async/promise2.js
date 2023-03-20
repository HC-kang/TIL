const promise_resolved = Promise.resolve(123);

const promise_rejected = Promise.reject(456);

promise_resolved.then((value) => {
  console.log(value); // 123
});
promise_rejected.catch((value) => {
  console.log(value); // 456
});

// ------------------------------
const promise_resolved2 = new Promise((resolve, reject) => {
  resolve(123);
});

const promise_rejected2 = new Promise((resolve, reject) => {
  reject(456);
});

promise_resolved2.then((value) => {
  console.log(value); // 123
});

promise_rejected2.catch((value) => {
  console.log(value); // 456
});

// ------------------------------

/**
 * Promise.all()
 */
const evenPromise = (item) =>
  new Promise((resolve, reject) => {
    item % 2 === 0 ? resolve(item) : reject(item);
  });

// Promise.all()은 하나라도 실패 시 Error를 발생시킨다. -> 해상도가 떨어짐. 어떤게 실패했는지 모름.
async function testPromiseAll() {
  try {
    const result = await Promise.all([
      // evenPromise(1), // will be rejected
      evenPromise(2),
      // evenPromise(3), // will be rejected
      evenPromise(4),
      // evenPromise(5), // will be rejected
    ]);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

testPromiseAll();

/**
 * Promise.allSettled()
 */
async function testPromiseAllSettled() {
  try {
    const result = await Promise.allSettled([
      evenPromise(1), // will be rejected
      evenPromise(2), // will be fulfilled
      evenPromise(3), // will be rejected
      evenPromise(4), // will be fulfilled
      evenPromise(5), // will be rejected
    ]);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

testPromiseAllSettled();

/**
 * Promise.race()
 */
const timePromise = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms + 'ms');
    }, ms);
  });

async function testPromiseRace() {
  try {
    const result = await Promise.race([
      timePromise(1000),
      timePromise(2000),
      Promise.reject('Error!!'),
      timePromise(3000),
    ]);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

testPromiseRace();

/**
 * Promise.any()
 */
// Promise.any()는 가장 먼저 성공한 Promise를 반환하고, 모두 실패시에만 에러를 발생시킨다.
async function testPromiseAny() {
  try {
    const result = await Promise.any([
      timePromise(1000),
      timePromise(2000),
      Promise.reject('Error!!'),
      timePromise(3000),
    ]);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

testPromiseAny();

async function testPromiseAnyWithAllRejected() {
  try {
    const result = await Promise.any([
      Promise.reject('Error!!'),
      Promise.reject('Error!!'),
      Promise.reject('Error!!'),
      Promise.reject('Error!!'),
    ]);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

testPromiseAnyWithAllRejected();
