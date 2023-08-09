# Nodejs 디자인 패턴 바이블 독서 정리

## Chapter 01. Node.js 플랫폼

- 주요개념
  - Node.js의 철학 "Node way"
  - Reactor 패턴 - Node.js의 비동기 이벤트 주도 아키텍처의 핵심 매커니즘
  - 브라우저와 다르게, 서버에서 동작하는 Javascript의 의미

### 1-1 Node.js 철학

  1-1-1 경량 코어

- 최소한의 기능세트를 제공하고, 이외의 공간에 유저랜드(유저스페이스)를 제공하여 사용자들이 스스로 생태계를 만들 수 있게 한다.
- 엄격하고 느린 진화 대신, 기민하고 창의적인 진화를 통해 생태계를 발전시킨다.

  1-1-2 경량 모듈  

- 작은 모듈의 장점
  - 이해하기 쉽고, 사용하기 쉽다.
  - 테스트 및 유지보수가 쉽다.
  - 사이즈가 작아 브라우저에서 사용하기 좋다.

  1-1-3 작은 외부 인터페이스

- 최소한의 기능 노출
- 확장보다는, 사용을 위한 모듈: 복잡도를 늘리지 않고, 기능을 추가할 수 있게 한다.
- 클래스보다는 함수 노출을 선호한다.

  1-1-4 간결함과 실용주의
- KISS(Keep It Simple, Stupid)
- 완벽하게 기능하지만 엄청난 노력을 들이는 것 보다, 타협 가능한 복잡성을 가진 빠른 작업이 더 좋다.

### 1-2 Node.js는 어떻게 작동하는가

- 리액터 패턴
- 단일 스레드
- 논 블로킹 I/O

  1-2-1 I/O는 느리다

  1-2-2 블로킹 I/O

  1-2-3 논블로킹 I/O

  1-2-4 이벤트 디멀티플렉싱

- 신호가 원래의 구성요소로 다시 분할되는 작업
- 이를 통해 단일 스레드가 여러 작업을 동시에 처리할 수 있게 된다.
- 여러 스레드에 분산되는 대신 단일 스레드에서 시간에 따라 분산된다.
- 전체 유휴시간 감소에 따른 성능 향상 이점이 있다.
- 레이스 컨디션, 다중 스레드 동기화 문제를 피할 수 있다.

  1-2-5 리액터 패턴

1. 이벤트 디멀티플렉서에 요청하여 IO작업 생성
2. IO작업 완료시 이벤트 작업을 큐에 추가
3. 이벤틀 루프가 큐를 순회
4. 각 이벤트의 핸들러가 호출됨
5. 완료시 이벤트 루프에 제어권 반환 / 혹은 비동기 작업 요청
6. 이벤트 루프가 종료될 때까지 반복

  1-2-6 Libuv, Node.js의 I/O엔진

- Libuv: 다수 운영체제의 디멀티플렉싱을 위해 추상화된 C 라이브러리

  1-2-7 Node.js를 위한 구성
- Libuv 외에도 바인딩 세트, V8, 코어 API등이 있음.

### 1-3 Node.js에서의 Javascript

  1-3-1 최신 Javascript를 실행시켜라

- 브라우저와 다르게 제약없이 최신 JS를 실행할 수 있음

  1-3-2 모듈 시스템
  - CommonJS vs ES 모듈

  1-3-3 운영체제 기능에 대한 모든 접근
- fs, crypto, process 등 다양한 모듈을 통해 운영체제의 기능에 접근 할 수 있음

  1-3-4 네이티브 코드 실행
- 이외에도 C/C++등의 레거시를 작은 노력으로도 도입 할 수 있음.

### Chapter 01 요약

- Node.js의 철학은 최소한의 코어로 더 작고 간단한 필요 기능만을 노출하는 실용주의에 기반한다.

## Chapter 02. 모듈 시스템

- 주요개념
  - 모듈이 왜 필요한가?
  - Node.js에서 다른 모듈시스템이 가능한 이유?
  - ES모듈
  - CommonJS 모듈
  - ES 모듈과 CommonJS 모듈의 차이점 및 상호 이용

### 2-1 모듈의 필요성

1. 코드베이스를 여러 파일로 분할하여, 독립적인 기능을 분리하여 개발 및 테스트하는데에 도움을 줌.
2. 다른 프로젝트에 코드를 재사용 할 수 있음.
3. 은닉성을 제공하여, 꼭 필요한 인터페이스만을 노출하도록 선택 할 수 있음.
4. 상호간의 종속성을 쉽게 관리 할 수 있음.

### 2-2 Javascript와 Node.js에서의 모듈 시스템

- 브라우저 입장에서는 모듈화 된 작은 코드는 import 해서 사용하기에 좋음
- Node.js는 브라우저와 달리, 로컬 파일시스템에만 의존함. 이로인해 CommonJS가 구현되었음.

### 2-3 모듈 시스템과 패턴

2-3-1 노출식 모듈 패턴

- JS에는 네임스페이스가 없기 때문에, 전역 네임스페이스를 오염시킬 위험이 크고, 이는 굉장히 위험한 일임.
- 이를 해결하기 위해, exports를 활용한 노출식 모듈 패턴을 사용함.

### 2-4 CommonJS 모듈

- CommonJS의 주요 개념
  1. require는 로컬 파일시스템으로부터 모듈을 임포트한다.
  2. exports와 module.exports는 현재 모듈에서 노출할 기능을 내보낸다.

2-4-1 직접 만드는 모듈 로더

- 동기 방식으로 모듈을 로드하는 로더: import 순서를 지키기 위해서.

```javascript
function loadModule(filename, module, require) {
  const wrappedSrc = 
    `(function (module, exports, require) {
        $(fs.readFileSync(filename, 'utf8')}
      })(module, module.exports, require);`;
    eval(wrappedSrc)
  }
```

1. 모듈의 전체 경로를 resolve
2. 이미 캐시된 모듈이 있는지 확인
3. 빈 객체 리터럴을 생성하여 exports 할 준비
4. 최초 로드 후 객체를 캐시
5. module, require를 모듈에 전달하고, 모듈은 module.exports를 통해 기능을 노출한다.
6. module.exports를 통해 노출된 기능을 반환한다.

2-4-2 모듈 정의

- module.exports 변수에 할당된 객체만 공개됨.

2-4-3 module.exports 대 exports

- exports는 module.exports의 참조

2-4-4 require 함수는 동기적이다

- 만약, 비동기적으로 로드한다면, 모듈을 로드한 직후 사용할 수 있다는 보장이 없음.

2-4-5 resolving 알고리즘

- 파일 모듈
  1. 절대경로: /로 시작하는 경로
  2. 상대경로: ./로 시작하는 경로. 현재 모듈의 위치를 기준으로 함.
- 코어 모듈: / 또는 ./로 시작하지 않는 경우 코어 Node.js 모듈 내에서 검색
- 패키지 모듈: 코어 모듈이 없는 경우, node_modules 디렉토리에서 검색

2-4-6 모듈 캐시

- 모듈 캐시의 기능
  1. 모듈 종속성 내에서 순환 종속성을 허용한다.
  2. 특정 패키지에서 동일한 모듈을 필요로 할 때, 얼마간 동일한 인스턴스를 반환토록 보장한다.
2-4-7 순환 종속성
- 모듈 A가 모듈 B를 필요로 하고, 모듈 B가 모듈 A를 필요로 할 때, 순환 종속성이 발생한다.
- require 되는 순서에 따라 순환 종속성이 문제가 될 수 있음
- ES 모듈은 이러한 순환 종속성을 효과적으로 해결함.

### 2-5 모듈 정의 패턴

2-5-1 exports 지정하기 (Named exports)

- 가장 기본적인 방법으로, exports 객체에 프로퍼티를 추가하는 방법.

2-5-2 함수 내보내기

- module.exports에 함수를 할당하는 방법
- 명확하게 단일한 진입점을 제공할 수 있음.
- 서브스택(substack) 패턴: 모듈을 함수로 정의하고, 함수를 호출하여 모듈을 반환하는 패턴
- SRP(Single Responsibility Principle)를 준수할 수 있음.

2-5-3 클래스 내보내기

- 함수로 내보내는 것 보다 내부를 더 많이 노출하게 됨.
- 그만큼 기능 확장에 유연함.

2-5-4 인스턴스 내보내기

- 모듈이 캐시되므로, 동일한 인스턴스를 반환함.
- 싱글턴과 유사하나, 인스턴스의 고유성을 보장하지는 않음.
  - 모듈이 종속성 트리 내에서 여러 번 사용되는 경우
- 필요시 새로운 인스턴스를 생성 할 수 있음 -> 안하는 게 좋음

2-5-5 다른 모듈 또는 전역 범위(global scope) 수정

- 몽키 패치
- 예측 할 수 없는 결과를 초래할 수 있으므로, 사용하지 않는 것이 좋음.
- 그러나 테스트를 위해 사용하는 경우도 있음.

### 2-6 ESM: ECMAScript 모듈

- CommonJS와 ESM의 가장 큰 차이점은, ESM은 Static하다는 것.
- 모듈 이름의 동적 생성이 불가능하며 상수 문자열만 허용됨.

2-6-1 Node.js에서 ESM 사용

- 확장자를 .mjs로 지정
- package.json에 type: module을 추가

2-6-2 exports와 imports 지정하기 (named exports and imports)

- ESM에서는 기본적으로 모두 private
- export된 개체들만 외부에서 접근 가능
- 모듈 import시 확장자를 생략할 수 없음.

2-6-3 export와 import 기본값 설정하기 (Default exports and imports)

- default export
- 단일 기능을 명확하게 내보낼 때 사용
- 자동 완성이 불가능하고, 서로 다른 파일에서 이름이 달라질 수 있어, 복잡도가 커질 수 있음.
- Tree shaking이 어려움.

2-6-4 혼합된 export (mixed exports)

- 생략

2-6-5 모듈 식별자

- 상대적 식별자(Relative)
- 절대 식별자(Absolute)
- 노출 식별자(Bare)
- 심층 임포트 식별자(Deep import)

2-6-6 비동기 임포트

- import 구문은 정적이며, 이로인해 두 가지 제약이 있음.
  - 모듈 식별자는 실행중에 생성될 수 없음
  - 제어구문 내에 포함될 수 없음
- 이를 위해 비동기 임포트 기능을 제공함.
- import() 함수를 통해 비동기적으로 모듈을 로드할 수 있음.

2-6-7 모듈 적재 이해하기

- 로딩 단계: 모든 모듈을 로드하고, 구문 분석하고, 실행하기 위함.
  1. 생성(1단계): 모든 import 구문을  찾고 재귀적으로 모든 모듈의 내용을 적재
  2. 인스턴스화(2단계): 모든 개체들의 참조를 메모리에 적재하여 관계를 추적 - 참조를 통해 연결만 되고, import된 개체들은 아직 생성되지 않음
  3. 평가(3단계): 모든 모듈을 실행하여 export된 개체들을 생성
  - ESM에서는 CommonJS와는 다르게 3단계가 완료 될 때 까지 어떠한 코드도 실행되지 않음

- 읽기 전용 라이브 바인딩
  - ESM에서는 import된 개체들은 읽기 전용임. 모듈 내부에서 수정되지 않는 한, 외부에서 수정할 수 없음.
- 순환 종속성 분석
  - CommonJS와는 다르게, ESM에서는 순환 종속에서 서로 완전한 내용을 가짐.
  - import 순서를 바꾸더라도, 동일한 결과를 얻을 수 있음.

2-6-8 모듈의 수정

- 생략

### 2-7 ESM과 CommonJS의 차이점과 상호 운용

- CommonJS에서는 확장자를 생략할 수 있지만, ESM에서는 확장자를 생략할 수 없음.

2-7-1 strict 모드에서의 ESM

- ESM에서는 기본적으로 strict 모드가 적용되고, 해제할 수 없음.

2-7-2 ESM에서의 참조 유실

- require, export, module.exports, __filename,__dirname 등의 참조는 ESM에서 사용할 수 없음.
- import.meta.url을 통해 __filename과__dirname을 대체할 수 있음.
- createRequire() 함수를 통해 require를 대체할 수 있음.

2-7-3 상호 운용

- import 구문을 통해 CommonJS 모듈을 로드할 수 있음. 다만 default export만 로드 가능.

## Chapter 03. 콜백과 이벤트

### 3-1 콜백 패턴

- 콜백 패턴: 비동기적으로 실행되는 함수를 호출할 때, 완료시점을 알 수 있는 가장 기본적인 방법
- 관찰자 패턴: 콜백 패턴의 일종으로, 이벤트를 발생시키고, 이를 관찰하는 객체가 이벤트를 처리하는 패턴
- 클로저: 함수가 생성될 당시의 스코프를 기억하는 함수

3-1-1 연속 전달 방식(CPS; Continuation Passing Style)

- 기본적인 동기 방식: return을 통해 직접 전달.
- 동기식 연속 전달 방식: 콜백을 통해 직접 전달.
- 비동기식 연속 전달 방식: 콜백이 끝날 때까지 기다리지 않고, 다음 코드를 실행하고, 콜백이 호출될 때 실행될 코드를 콜백으로 전달.

- 비 연속 전달(Non-CPS) 콜백: 콜백을 통해 결과를 전달하지 않는 콜백 - map, filter, reduce 등

3-1-2 동기? 비동기?

- 위험한 함수들
  - 예측할 수 없는 함수: 조건에 따라 동기이거나, 비동기일 수 있는 함수
  - Zalgo를 풀어 놓다

    ```javascript
    function createFileReader(filename) {
      const listeners = [];
      inconsistentRead(filename, value => {
        listeners.forEach(listener => listener(value));
      })

      return {
        onDataReady: listener => listeners.push(listener)
      }
    }
    ```

    ```javascript
    const reader1 = createFileReader('data.txt');
    reader1.onDataReady(data => {
      console.log(`First call data: ${data}`);

      const reader2 = createFileReader('data.txt');
      reader2.onDataReady(data => {
        console.log(`Second call data: ${data}`);
      })
    })
    ```

    - 위 코드는 예측할 수 없는 함수임.
    - reader2의 경우 캐시로 인해 동기적으로 작동할 수 있음.
    - 따라서 콜백이 즉시 호출되고, 리스너가 등록되기 전에 호출되므로 데이터가 출력되지 않음.
    - 이러한 버그는 조건에 따라 동작이 매우 다르므로, 디버깅이 어려움.

- 동기 API의 사용
  - 위와 같은 경우를 방지하기 위해, 동기 API를 사용하는 것이 좋음.

    ```javascript
    import { readFileSync } from 'fs';

    const cache = new Map()
    
    function consistentReadySync(filename) {
      if (cache.has(filename)) {
        return cache.get(filename);
      } else {
        const data = readFileSync(filename, 'utf8');
        cache.set(filename, data);
        return data;
      }
    }
    ```

    - 순수한 동기식 함수에서는 위처럼 직접 스타일을 적용하는 것이 좋음.
    - 하지만 모든 경우에 동기식 함수를 사용할 수 있는 것은 아님.
    - 또한 동기식 함수를 사용하면, 비동기식 함수를 사용하는 것보다 성능이 떨어질 수 있음.
      - 큰 파일을 읽을 때, 동기식 함수는 메인 스레드를 차단하므로, 다른 작업을 수행할 수 없음.

- 지연실행으로 비동기성을 보장
  - process.nextTick()을 통해 비동기식 함수를 동기식으로 실행할 수 있음.

    ```javascript
    import { readFile } from 'fs';

    const cache = new Map();

    function consistentReadAsync(filename, callback) {
      if (cache.has(filename)) {
        process.nextTick(() => callback(cache.get(filename)));
      } else {
        readFile(filename, 'utf8', (err, data) => {
          cache.set(filename, data);
          callback(data);
        })
      }
    }
    ```

    - 그러나 위 경우에도 문제가 있음.
    - 재귀 등 특정 상황에서 IO 기아 현상을 일으킬 수 있음.

3-1-2 Node.js 콜백 규칙

- 콜백은 맨 마지막 인자로 전달되어야 함.
- 오류는 첫 번째 인자로 전달되어야 함.
- 콜백은 try 블럭 내에서 호출되어서는 안됨.
  - 대부분의 경우콜백에서 발생시키는 에러를 캐치하는 게 목적이 아니기 때문

### 3-2 관찰자 패턴

- 관찰자 패턴: 콜백 패턴의 일종으로, 이벤트를 발생시키고, 이를 관찰하는 객체가 이벤트를 처리하는 패턴
- Node.js에서 기본적으로 사용되는 패턴
- 콜백 패턴과의 가장 큰 차이점은, 콜백 패턴은 단일 콜백만을 사용하지만, 관찰자 패턴은 여러 개의 콜백을 사용한다는 것.

3-2-1 EventEmitter 클래스

- EventEmitter는 Node.js의 코어인 events 모듈에 정의되어 있음.
- 필수 메서드 목록: chaining을 지원하기 위해 this를 반환함.
  - on(eventName, listener): 이벤트를 등록
  - once(eventName, listener): 이벤트를 한 번만 등록
  - emit(eventName, [args]): 이벤트를 발생시킴
  - removeListener(eventName, listener): 이벤트를 제거

3-2-2 EventEmitter 생성 및 사용

- 가장 간단한 방법은 EventEmitter 인스턴스를 직접 생성하는 것. 그러나 권장되지 않음.

3-2-3 오류 전파

- EventEmitter는 예외를 throw 할 수 없음.
- 따라서, 이벤트 핸들러 내에서 예외가 발생하면, 이를 이벤트로 전파해야 함.
- 그러므로 error 이벤트를 꼭 등록해주는 것이 권장됨.

3-2-4 관찰 가능한 객체 만들기

- EventEmitter를 직접 사용하는 것은 흔하지 않으며, 대체로 상속을 통해 사용함.

3-2-5 EventEmitter와 메모리 누수

- EventEmitter는 이벤트를 처리하는 모든 리스너를 저장하므로, 메모리 누수가 발생할 수 있음.
- 따라서 필요하지 않은 이벤트 리스너는 반드시 제거해야 함.
- Node.js에서는 리스너의 수가 10개를 넘어가면 경고를 출력함. 그러나 필요 시 setMaxListeners()를 통해 제한을 늘릴 수 있음.
- 또한 Node.js는 once()를 통해 등록된 리스너를 자동으로 제거하는 기능도 제공함.

3-2-6 동기 및 비동기 이벤트

- EventEmitter는 동기적으로도, 비동기적으로도 사용할 수 있음.
- 그러나 콜백 패턴과 마찬가지로, 두 가지 방식을 혼용해서 사용하면 안됨.
- 동기적으로 사용할 경우, 리스너를 작업 실행 전에 등록해야 함.
- 따라서 대부분의 경우, 비동기적으로 사용하는 것이 좋음.

3-2-7 EventEmitter vs 콜백

- 콜백
  - 단일 결과를 처리하는 데에 적합
  - 작업의 성공, 실패에 관계없이 정확히 한번만 호출됨.
  - 같은 이벤트에 단일 콜백만 등록할 수 있음.
- EventEmitter
  - 여러 유형의 결과를 전달하는데에 적합
  - 같은 이벤트가 여러 번 발생하거나, 혹은 아예 발생하지 않는 경우 등에 사용
  - 같은 이벤트에 다수의 리스너를 등록할 수 있음.

3-2-8 콜백과 EventEmitter의 결합

- 필요시 두 가지 방식을 혼용해서 사용할 수 있음.
- 복잡한 비동기 작업을 수행할 때, 콜백을 통해 결과를 전달하고, 이를 EventEmitter를 통해 관찰할 수 있음.

## Chapter 04. 콜백을 사용한 비동기 제어 흐름 패턴

- 주요개념
  - 비동기 프로그래밍에 대한 과제
  - 콜백 지옥을 피하는 것과 콜백 모범 사례들
  - 연속적 실행, 연속적 반복, 병렬 실행, 제한된 병렬 실행에서 흔히 다루는 비동기 패턴

### 4-1 비동기 프로그래밍의 어려움

4-1-1 간단한 웹 스파이더 만들기

```javascript
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, err => {
    if (!err || err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`);
      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          mkdirp(path.dirname(filename), err => {
            if (err) {
              cb(err);
            } else {
              fs.writeFile(filename, res.text, err => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              })
            }
          })
        }
      })
    } else {
      cb(null, filename, false);
    }
  })
}
```

4-1-2 콜백 지옥(Callback hell)

- 위 코드와 같이 가독성이 매우 떨어지게 됨.
- 또한, 스코프에서 사용되는 변수의 이름이 중복될 수 있음.
- 클로저가 성능 및 메모리 측면에서 부정적인 영향을 끼칠 수 있음.

### 4-2 콜백 모범 사례와 제어 흐름 패턴

4-2-1 콜백 규칙

1. in-place 함수 사용 최소화: 최대한 외부에서 정의된 함수 활용
2. early return 사용: 에러가 발생하면 즉시 리턴

4-2-2 콜백 규칙 적용

```javascript
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(filename, contents, cb);
  })
}

function download(url, filename, cb) {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, err => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    })
  })
}

export function spider(url, cb) {
  const filename = urlToFilename(url);
  fs.access(filename, err => {
    if (!err || err.code !== 'ENOENT') {
      return cb(null, filename, false);
    }
    download(url, filename, err => {
      if (err) {
        return cb(err);
      }
      cb(null, filename, true);
    })
  })
}
```

4-2-3 순차 실행

- 데이터의 전파 없이 작업을 순서대로 실행
- 작업의 출력을 다음 작업의 입력으로 사용: 체이닝, 파이프라이닝
- 순차적으로 각 요소에 대해 비동기 작업을 반복