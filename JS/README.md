# Javascript

## Console

- console.log('Hello World');
- console.dir({ hello: "hello" });
  - 객체 조회 시
- console.time('timer');
- console.timeEnd('timer');
  - 시간측정
- console.trace('trace');
  - 스택 추적
- console.error('error');
- console.warn('warn');
- console.info('info');
- console.assert(1 === 2, 'not same');
- console.clear();
- console.count('count');
- console.countReset('count');
- console.group('group');
- console.groupEnd('group');
- console.groupCollapsed('groupCollapsed');
- console.groupEnd('groupCollapsed');
- console.table([{ a: 1, b: 2 }, { a: 3, b: 4 }]);
  - 표로 출력
- console.table([{ a: 1, b: 2 }, { a: 3, b: 4 }], ['a']);
- console.table([{ a: 1, b: 2 }, { a: 3, b: 4 }], ['a', 'b']);

## Timer

- setTimeout(() => {}, 0);
- setInterval(() => {}, 0);
- setImediate(() => {});
- clearTimeOut();
- clearInterval();
- clearImediate();

