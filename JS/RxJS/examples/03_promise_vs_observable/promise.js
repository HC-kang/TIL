const promise = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  } catch (error) {
    reject('error');
  }
});

console.log('1');
console.log(promise.then(
  v => console.log(`promise value: ${v}`),
  e => console.log(`promise error: ${e}`)
))
console.log('2');

/**
 * 1
 * Promise { <pending> }
 * 2
 * promise value: 1
 * 
 * Promise는 비동기로 동작하며, then 메서드를 통해 비동기 작업이 완료된 이후에 실행할 콜백을 등록할 수 있다.
 */