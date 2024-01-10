const { Observable } = require('rxjs');

const number$ = new Observable(observer => {
  console.log('observable created!');
  try {
    observer.next(1);
    observer.next(2);
  } catch (e) {
    observer.error('error');
  } finally {
    observer.complete();
  }
});

number$.subscribe({
  next: v => console.log(`first number: ${v}`),
  error: e => console.log(`first error: ${e}`),
  complete: () => console.log('first complete!')
});
number$.subscribe({
  next: v => console.log(`second number: ${v}`),
  error: e => console.log(`second error: ${e}`),
  complete: () => console.log('second complete!')
});

/**
 * observable created!
 * first number: 1
 * first number: 2
 * first complete!
 * observable created!
 * second number: 1
 * second number: 2
 * second complete!
 * 
 * observable은 observer를 subscribe할 때마다 생성되어 독립적으로 동작한다.
 */