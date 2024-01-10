let ii;
const promise3 = new Promise((resolve, reject) => {
  try {
    let value = 0;
    // ii = setInterval(() => {
    //   console.log(`promise3 value: ${value}`);
    //   resolve(++value);
    // }, 1000);

    setTimeout(() => {
      console.log(`promise3 value: ${value}`);
      resolve(++value);
    }, 5000);
  } catch (error) {
    reject('error');
  }
});

promise3.then(
  v => console.log(`first promise3 value: ${v}`),
  e => console.log(`first promise3 error: ${e}`)
);

setTimeout(() => {
  clearInterval(ii);
}, 5000);

/**
 * promise3 value: 0
 * first promise3 value: 1
 * promise3 value: 1
 * promise3 value: 2
 * promise3 value: 3
 * 
 * promise는 한번 결정되면 그 이후에는 결정된 값을 계속 사용한다.
 * 또한 resolve 전후로 요청을 취소할 수 없다.
 */