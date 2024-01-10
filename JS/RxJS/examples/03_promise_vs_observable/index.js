const { interval, of } = require('rxjs');

// const number$ = of(1, 2, 3, 4, 5);
const number$ = interval(1000);

const observer = (v => console.log(v));

// 두 subscriber는 동시에 실행되지만 각각의 interval은 독립적으로 실행된다.
number$.subscribe(observer);
setTimeout(() => {
  number$.subscribe(observer);
}, 1500)