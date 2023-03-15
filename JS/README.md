# Javascript

## Data

- 기본형 데이터
  - 숫자
  - 문자열
  - boolean
  - null
  - undefined
  - Symbol
- 참조형 데이터
  - 객체
  - 대체로 가변형

## Undefined, Null, Empty

- 선언만 되고 할당이 되지 않은 변수는 자동으로 undefined가 부여?
  - Nope. 다만 할당되지 않은 변수 호출 시, undefined가 호출될 뿐. 단순히 메모리 참조 주소가 비어있다는 의미
- 반면에 Null은 '비어있음'을 명시한것.
- **주의**: typeof null은 object를 반환함

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

## Context

- hoisting
  - JS엔진에서 코드를 해석 할 때, 변수의 선언부를 위쪽으로 끌어들이는 것 처럼 보이는 현상.
  - 실제로 코드를 끌어올리는 컴파일 과정은 존재하지 않음. 다만 environmentRecord를 구성하기 위해 코드를 먼저 읽으며 선언부를 수집할뿐임. 그러나 이런 상황을 단순화하여 끌어올린것으로 보자는 것.
  - '선언'만을 수집하기에 함수의 사용에서 특이사항이 발생함
    - 선언된 함수는 environmentRecord에 즉시 수집됨.
    - 표현식 함수는 선언된 변수만 수집되고, 함수는 수집되지 않음. => 상대적으로 표현식 함수가 안전해 보임.

- 실행 컨텍스트 (Execution Context): 실행할 코드에 제공할 환경 정보를 모아놓은 객체. 전역, eval(), 함수로 세 가지가 있으나 사실상 대부분은 함수만 활용
  - VariableEnvironment: 현재 컨택스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 스냅샷 형태로, 변경되지 않음.
    - environmentRecord (snapshot)
    - outerEnvironmentReference (snapshot)
  - LexicalEnvironment: 최초 VariableEnvironment와 같으나 실시간으로 사용되며 변경됨.
    - environmentRecord: 현재 컨텍스트와 관련된 코드의 식별자 정보를 저장.
    - outerEnvironmentReference
  - ThisBinding: this 식별자가 바라볼 객체

- 콜 스택 (Call Stack): 실행 컨텍스트를 순차적으로 쌓아두고, 가장 위쪽 컨텍스트를 참조 할 수 있도록 하는 것.

- 스코프
  - es5까지는 함수에 의해서만 스코프가 생성되었음
  - es6부터는 let, const, class, strict mode 등으로 블록스코프를 사용 가능


- creation phase
- execution phase

- decleration
- initialation

- temporal dead zone

- function decleration
- function expression

- identifier resolution
- scope chain
- variable shadowing
