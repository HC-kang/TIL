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
  - Nope. 다만 할당되지 않은 변수 접근 시, undefined가 호출될 뿐. 단순히 메모리 참조 주소가 비어있다는 의미
- 반면에 Null은 '비어있음'을 명시한것.
- empty의 경우, array length를 명시해서 사용하는 경우 등에서 발생함.
  - 위의 undefined처럼 참조 주소가 비어있는것을 넘어, 참조에 대한 참조만 존재하고 대상 공간에는 undefined조차도 할당되어있지 않은 것.
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
  
  > **참고 - 변수 생성 라이프사이클**  
  >
  > 선언 단계(Declaration phase): 실행 컨텍스트에 객체 등록, 해당 스코프에서 접근 가능  
  > 초기화 단계(Initialization phase): 선언 단계에서 생성한 변수를 위한 메모리가 생성됨  메모리가 생성되었으나 값이 대입되지 않았을 경우 undefined를 반환함. 엄밀히 말해서, undefined가 '자동으로 할당되는'것은 아님.  
  > 할당 단계(Assignment phase): 생성된 메모리에 값을 할당함.

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

## Callback

- 함수 foo가 함수 bar에게 제어권을 넘겨주어, 함수 bar가 함수 foo를 실행할 권한을 가지게 되는것.

## this

- 함수와 메서드를 구분하는 기준
- 기본적으로 전역객체를 가리키며, 브라우저에서는 Window, 노드에서는 global을 가리킴.
- 함수로서 실행되는 경우: this는 전역 객체를 가리킴. 개발자가 직접 코드를 통해 실행한 것으로, 실행의 주체를 알 수 없기 때문.
- 메서드로서 실행되는 경우: this는 상위 객체를 가리킴. 어떤 주체가 메서드를 실행시켰는지 알 수 있으므로, 그 주체를 this로 가리킴.
- self등의 방법을 통해 this를 우회해 사용 가능
- 또는 화살표 함수(()=>{})를 통해 this를 바인딩하지 않고, 상위 객체의 this를 그대로 전달받아 사용.

## 기타 주요 개념

- creation phase
- execution phase

- decleration: 선언
- initialation: 할당, 초기화

- temporal dead zone: var 변수 사용시 호이스팅으로 인해 수집된 변수가 아직 할당되지 않았을 때, 의도치않게 undefined를 반환하는 구간.

- function decleration: 함수 선언문
- function expression: 함수 표현식

- identifier resolution
- scope chain
- variable shadowing: 스코프 체이닝 시, 하위 스코프에 선언된 변수가 상위 스코프에 선언된 변수로 인해 덮어씌워져, 접근이 불가능해지는 현상

- 전역변수의 사용 최소화 방법들
  - 즉시실행함수
  - 네임스페이스
  - 모듈 패턴
  - 샌드박스 패턴
  - 기타 모듈관리도구 활용 등..
