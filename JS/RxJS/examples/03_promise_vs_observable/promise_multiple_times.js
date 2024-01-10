const promise2 = new Promise((resolve, reject) => {
  console.log('promise2 created!');
  try {
    resolve(1);
  } catch (error) {
    reject('error');
  }
});

promise2.then(
  v => console.log(`first promise2 value: ${v}`),
  e => console.log(`first promise2 error: ${e}`)
);
promise2.then(
  v => console.log(`second promise2 value: ${v}`),
  e => console.log(`second promise2 error: ${e}`)
);

/**
 * promise2 created!
 * first promise2 value: 1
 * second promise2 value: 1
 * 
 * promise는 한번 결정되면 그 이후에는 결정된 값을 계속 사용한다.
 */