const { Observable } = require('rxjs');
const obs$ = new Observable(observer => {
  let id;
  try {
    let value = 0;
    id = setInterval(() => {
      console.log(`observable value: ${value}`);
      observer.next(++value);
    }, 1000);
  } catch (e) {
    observer.error('error');
  }
  return () => {
    clearInterval(id);
    console.log('cancelled!');
  }
});

const subscription = obs$.subscribe({
  next: v => console.log(`first: ${v}`),
  error: e => console.log(`first error: ${e}`),
  complete: () => console.log('first complete!')
});

setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

/**
 * observable value: 0
 * first: 1
 * observable value: 1
 * first: 2
 * observable value: 2
 * first: 3
 * observable value: 3
 * first: 4
 * cancelled!
 * 
 * observable은 unsubscribe를 통해 요청을 취소할 수 있다.
 */