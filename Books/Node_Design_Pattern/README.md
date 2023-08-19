# Nodejs 디자인 패턴 바이블 독서 정리

- 참고 URL
  - [Git Repo](https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition)
  - [Solutions](https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition/wiki/Node.js-Design-Patterns-Third-Edition---Exercise-Solutions)

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

4-2-4 병렬 실행

- 필요성
  - 작업 순서가 관계없는 경우
  - 단순히 모든 작업이 완료되었다는 알림만 필요한 경우
- 특징
  - 논블로킹 API로 실행되며, 이벤트 루프를 통해 인터리빙됨.
  - 따라서 사실상 Node.js에서 병렬이라는 용어는 부적절 / 동시성이 정확한 용어임.
    - 병렬: 실제로 동시에 실행되는 것
    - 동시성: 동시에 실행되는 것처럼 보이는 것
- 응용가능한 패턴

  ```javascript
  const tasks = [];

  let completed = 0
  tasks.forEach(task => {
    task(() => {
      if (++completed === tasks.length) {
        finish();
      }
    })
  })

  function finish() {
    // 모든 작업이 완료되었을 때 실행되는 코드
  }
  ```

- 경쟁상태
  - Node.js가 단일 스레드이므로, 경쟁상태가 발생할 수 없다고 생각할 수 있음.
  - 그러나 비동기 작업이 완료되는 순서는 보장되지 않으므로, 경쟁상태가 발생할 수 있음.
  - 따라서 이를 해결하기 위해, Set()을 통해 현재 진행중인 작업 목록을 관리하여 이러한 경쟁상태를 방지할 수 있음.
- 작업 수 제한
  - 이외에도 작업 수를 제한하지 않는 경우, 무한한 메모리 사용으로 인한 문제가 발생할 수 있음.

4-2-5 제한된 병렬 실행

- 가장 많이 발생하는 문제는 리소스 부족. 그 외에도 여타 다른 문제를 야기 할 수 있음.
- 그러므로, 제한된 병렬 실행을 통해 이러한 문제를 예방해야 함.

  ```javascript
  const tasks = []

  const concurrency = 2;
  let running = 0;
  let completed = 0;
  let index = 0;
  function next() {
    while (running < concurrency && index < tasks.length) {
      const task = task[index++];
      task(() => {
        if (++completed === task.length) {
          return finish();
        }
        running--
        next()
      })
      running++
    }
  }
  next()

  function finish() {
    // 모든 작업이 완료되었을 때 실행되는 코드
  }
  ```

- 일부 목적에 대해서는 위와 같은 동시성 제어가 유용할 수 있음.
- 그러나 대부분의 경우, 작업의 추가생성이 필요하거나, 기억해 둘 필요가 있기에 위의 방법보다는 큐(queue)를 사용하는것이 권장됨.
- 큐를 사용한 방법

  ```javascript
  import { EventEmitter } from 'events';

  export class TaskQueue extends EventEmitter  {
    constructor(concurrency) {
      super();
      this.concurrency = concurrency;
      this.running = 0;
      this.queue = [];
    }

    pushTask(task) {
      this.queue.push(task);
      return this
    }

    next() {
      if (this.running === 0 && this.queue.length === 0) {
        return this.emit('empty');
      }
      while (this.running < this.concurrency && this.queue.length) {
        const task = this.queue.shift();
        task((err) => {
          if (err) {
            this.emit('error', err);
          }
          this.running--;
          process.nextTick(this.next.bind(this))
        })
        this.running++;
      }
    }
  }
  ```

  - process.nextTick()을 통해 이벤트 루프를 통해 인터리빙되도록 함.
  - 또한 위 과정에서 this를 잃어버리기에, bind()를 통해 this를 바인딩해줌.

### 4-3 비동기 라이브러리

- async 등 비동기 라이브러리를 활용하면, 위에서 다룬 비동기 제어 흐름 패턴을 더욱 쉽게 구현할 수 있음.

## Chapter 05. Promise 그리고 Async/Await와 함께하는 비동기 제어 흐름 패턴

- 콜백은 비동기 코드를 작성하는 가장 기본적인 방법이지만, 콜백만으로는 코드를 작성하기 어려움.
- 따라서 더 나은 비동기 코드를 작성하기 위해, 프로미스와 async/await를 사용하는 것이 좋음.

- 주요개념
  - 프로미스가 어떻게 동작하는지
  - 프로미스를 효과적으로 사용하는 방법
  - Node.js에서 비동기 코드를 다룰 때 주된 도구인 async/await 문법

### 5-1 프로미스

- 비동기 결과를 전파하기 위해 사용하는 CPS인 콜백을 대체하기 위해 등장한 개념.

5-1-1 Promise란 무엇인가?

- 비동기 작업의 최종적인 결과를 담고있는 객체
- 상태
  - 대기(pending): 이행하거나 거부되지 않은 초기 상태
  - 결정(settled): 이행 또는 거부되어 종료된 상태
    - 이행(fulfilled): 연산이 성공적으로 완료됨
    - 거부(rejected): 연산이 실패함

```javascript
asyncOperation(arg, (err, result) => {
  if (err) {
    // 에러 처리
  } else {
    // 결과 처리
  }
})

asyncOperationPromise(arg)
  .then(result => {
    // 결과 처리
  })
  .catch(err => {
    // 에러 처리
  })
```

- 프로미스는 비록 동기적으로 작성된 것처럼 보이지만, 사실은 비동기적 동작을 보장함.
- 이는 3장의 Zalgo 문제와 관련이 있음.

5-1-2 Promise/A+와 thenable

- 이전에는 프로미스의 구현이 다양했으며, 서로 호환되지 않았음.
- 그러나 Promise/A+라는 명세가 등장하면서, 프로미스의 구현이 표준화되었음.
- 이로인해 thenable이라는 개념이 등장했고, then()함수를 공통적으로 사용 할 수 있음.

5-1-3 프로미스 API

- Promise 정적 메서드
  - Promise.resolve()
    - 즉시 이행되는 프로미스를 생성함.
    - Promise.resolve()는 thenable 객체를 인자로 받을 수 있음.
  - Promise.reject()
    - 즉시 거부되는 프로미스를 생성함.
  - Promise.all()
    - 모든 프로미스가 이행될 때까지 기다림.
    - 하나라도 reject되면 해당 사유로 전체가 reject됨.
  - Promise.allSettled()
    - 모든 프로미스가 결정될 때까지 기다림.
    - 각각의 속성과 사유를 가진 배열을 반환함.
    - 모든 프로미스가 결정되면, 이행된 프로미스의 배열을 반환함. -> Promise.all()과의 가장 큰 차이점
  - Promise.race()
    - 가장 먼저 결정된 프로미스의 결과를 반환함.

- Promise 인스턴스 메서드
  - then()
    - 프로미스가 이행되거나 거부될 때 호출될 콜백을 등록함.
    - then()은 새로운 프로미스를 반환함.
  - catch()
    - 프로미스가 거부될 때 호출될 콜백을 등록함.
    - catch()는 then()의 특별한 형태임.
  - finally()
    - 프로미스가 이행되거나 거부될 때 호출될 콜백을 등록함.
    - finally()는 then()의 특별한 형태임.

5-1-4 프로미스 생성하기

```javascript
function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

console.log(`Delaying... ${new Date().getSeconds()}s`);
delay(1000)
  .then(() => {
    console.log(`Done Delaying... ${new Date().getSeconds()}s`);
  })
  .catch((err) => {
    console.log(err);
  });
```

5-1-5 프로미스화(Promisification)

```javascript
function promisify(callbackBaseApi) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      ]
      callbackBaseApi(...newArgs);
    })
  }
}
```

5-1-6 순차 실행과 반복

```javascript
import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';
import { promisify } from 'util';

const mkdirpPromises = promisify(mkdirp);
```

- fs의 경우 이미 프로미스화된 promises를 임포트하여 사용
- mkdirp의 경우 프로미스화를 직접 구현하여 사용

```javascript
function download(url, filename) {
  console.log(`Downloading ${url}`);
  let content;
  return superagent.get(url)
    .then((res) => {
      content = res.text;
      return mkdirpPromises(dirname(filename));
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return content
    })
}
```

- then 을 활용해 가독성이 좋아짐.
- 하지만 위 코드는 미리 알고있는 비동기 작업을 직접 처리하였음

```javascript
function spiderLinks(currentUrl, content, nesting) {
  let promise = Promise.resolve();
  if (nesting === 0) {
    return promise;
  }
  const links = getPageLinks(currentUrl, content);
  for (const link of links) {
    promise = promise.then(() => spider(link, nesting - 1));
  }

  return promise;
}
```

- 빈 프로미스를 생성하여, for문을 돌면서 프로미스를 연결함.
- 매 반복에서 then을 통해 얻은 프로미스로 promise 변수를 갱신함
- 이하 생략
- 중요한 점은 이러한 과정에서 사용자가 직접 오류를 전파하기 위한 로직을 사용하지 않았다는 것임.

5-1-7 병렬 실행

```javascript
function spiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) {
    return Promise.resolve();
  }
  const links = getPageLinks(currentUrl, content);
  const promises = links.map(link => spider(link, nesting - 1))

  return Promise.all(promises);
}
```

- Promise.all()을 사용하여 병렬로 실행함.
- 이전 순차반복의 for루프와 달리, 이전 작업을 기다리지 않고 바로 다음 작업을 실행함.

5-1-8 제한된 병렬 실행

```javascript
next() {
  while (this.running < this.concurrency && this.queue.length) {
    const task = this.queue.shift()
    task().finally(() => {
      this.running--
      this.next()
    })
    this.running++
  }
}
```

- finally()를 통해 작업이 끝나면 running을 감소시키고, next()를 호출하여 다음 작업을 실행함.

```javascript
runTask(task) {
  return new Promise((resolve, reject) => {
    this.queue.push(() => {
      return task().then(resolve, reject)
    })
    process.nextTick(this.next.bind(this))
  })
}
```

- 새 Promise를 생성하여, queue에 push함.
- 비동기적 호출을 보장하기 위해 process.nextTick()을 사용함.
- 실행 결과로 Promise를 반환함.

### 5-2 Async/await

- 일반적인 콜백에 비해, 프로미스도 충분히 가독성이 좋지만, 여전히 then()블록을 호출해야 함.
- async/await는 프로미스를 사용하는 코드를 더욱 간결하게 만들어줌.

5-2-1 async 함수와 await 표현

```javascript
async function playingWithDelays() {
  console.log('Delaying...', new Date())

  const dateAfterOneSecond = await delay(1000)
  console.log(dateAfterOneSecond)
  const dateAfterThreeSeconds = await delay(3000)
  console.log(dateAfterThreeSeconds)
  return 'done';
}
```

- 동기처럼 보이지만, await 에서 함수가 보류되고, 제어가 이벤트 루프로 반환됨.
- 이후 resolve되면 다시 제어가 async 함수로 돌아오고 결과가 반환됨.
- 또한 async 함수는 항상 프로미스를 반환함.

5-2-2 Async/await에서의 에러 처리

- async/await는 가독성도 높여주지만, 에러를 다루는 방식도 더욱 간단해짐.
- try/catch 블록을 사용하여 에러를 처리함.
- "return" vs "return await" 함정
  - async/await를 사용할 때, reject되는 프로마스가 로컬 스코프의 try-catch 블록에 잡힐것이라고 생각하는 것임.

    ```javascript
    async function errorNotCaught() {
      try {
        return delayError(1000); // -> return await delayError(1000);
      } catch (err) {
        console.error(`Error caught by the async function: ` + err.message)
      }
    }

    errorNotCaught()
      .catch(err => console.error('Error caught by the caller function: ' + err.message))
    ```

  - 위 함수에서는 caller에 의해 에러가 처리됨
  - 이를 원치않고, 로컬에서 에러를 처리하고싶다면 await를 사용해야 함.

5-2-3 순차 실행과 반복

- async/await의 최대 강점은 역시 코드를 단순화하는 것임

```javascript
async function download(url, filename) {
  console.log(`Downloading ${url}`)
  const { text: content } = await superagent.get(url)
  await mkdirpPromises(dirname(filename))
  await fsPromises.writeFile(filename, content)
  console.log(`Downloaded and saved: ${url}`)
  return content
}
```

- 이러한 장점은
  - 코드 자체가 짧아짐
  - 들여쓰기 없은 플랫한 형태가 됨.

- 순차실행시 실수하는 안티패턴

  ```javascript
  links.forEach(async function iteration(link) {
    await spider(link, nesting - 1)
  })
  ```

  - 위 코드에서 spider 함수는 이전 실행을 기다리지 않고, 즉시 실행됨.

5-2-4 병렬 실행

- async/await를 사용해서 병렬 작업을 실행하는 데에는 두 가지 방법이 있음.
  - 순수하게 await 표현식을 사용하는 것
  - Promise.all()을 사용하는 것: 권장

- await을 사용하는 방법(예시)

  ```javascript
  async function spiderLinks(currentUrl, content, nesting) {
    if (nesting === 0) {
      return
    }
    const links = getPageLinks(currentUrl, content)
    const promises = links.map(link => spider(link, nesting - 1))
    for (const promise of promises) {
      await promise
    }
  }
  ```

  - 이 경우 문제는, 프로미스 중 하나가 reject되면 spiderLinks()가 반환하는 프로미스도 reject 되는데, 이 때 이전에 선행된 promise들의 resolve를 기다려야 함.
  - 일반적으로 에러는 최대한 빠른 반환이 원칙이므로, 이런 방법은 최선의 방법은 아님.
- 이런 경우 Promise.all()을 사용하면, 프로미스 중 하나라도 reject 되는 순간 전체를 reject함.

  ```javascript
  const result = await Promise.all(promises)
  ```

- 결과적으로, async/await를 사용한 경우에도 본직적으로는 프로미스를 사용할 수 밖에 없음.

5-2-5 제한된 병렬 실행

- async/await와 생산자-소비자 패턴을 결합하여 제한된 병렬 실행을 구현할 수 있음.
- 이 때, 문제가 되는 부분은 큐의 대기열에 따라 컨슈머를 재우고, 실행하는 것임.
- 그러나 Node.js는 단일 스레드이므로, 아래와 같이 단순화 할 수 있음.
- sleep 상태가 되는 것은 이벤트 루프로 제어권을 반환하는 것
- resuming 하는 것은 콜백을 호출하는 것

```javascript
export class TaskQueuePC {
  constructor(concurrency) {
    this.taskQueue = []
    this.consumeQueue = []
  }

  // 소비자 생성
  for (let i = 0; i < concurrency; i++) {
    this.consumer()
  }
```

- 두 개의 대기열을 사용하는데, 하나는 실행할 작업을 담고있고, 다른 하나는 실행할 작업이 있을 때까지 대기하는 소비자를 담고 있음.

```javascript
  async consumer() {
    while (true) {
      try {
        const task = await this.getNextTask()
        await task()
      } catch (err) {
        console.error(err)
      }
    }
  }
```

- 소비자는 무한 루프를 돌면서, 실행할 작업이 있을 때까지 대기함.

```javascript
  async getNextTask() {
    return new Promise((resolve) => {
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift())
      }
      this.consumeQueue.push(resolve)
    })
  }
}
```

- getNextTask()는 작업이 있으면 첫 번째 작업을 실행하고, Promise를 반환함.
- 작업이 없으면 consumeQueue에 resolve 콜백을 추가함.

```javascript
runTask(task) {
  return new Promise((resolve, reject) => {
    const taskWrapper = () => {
      const taskPromise = task();
      taskPromise.then(resolve, reject);
      return taskPromise;
    }

    if (this.consumerQueue.length !== 0) {
      const consumer = this.consumerQueue.shift();
      consumer(taskWrapper)
    } else {
      this.taskQueue.push(taskWrapper)
    }
  })
}
```

- taskWrapper를 통해 task가 반환하는 프로미스를 runTask()가 반환하는 프로미스에 연결함.
- 또한 consumerQueue에 놀고있는 소비자가 있으면, 그 소비자에게 taskWrapper를 전달함.
- 반면에 유휴 소비자가 없으면, taskWrapper를 taskQueue에 추가함.

### 5-3 무한 재귀 프라미스 해결(resolution) 체인의 문제

- 무한 프로미스 체인으로 인해 생기는 메모리 누수 문제가 있음.
- 이는 프로미스 명세에 따른다고 피할 수 있는 문제가 아님.
- 특히 스트림방송, 가상화폐 시장 데이터 처리, IoT센서 데이터 처리 등에서 이러한 문제가 발생할 수 있음.

```javascript
function leakingLoop() {
  return delay(1)
    .then(() => {
      console.log(`Tick ${Date.now()}`)
      return leakingLoop()
    })
}
```

- 위와 같은 함수를 매우 많이(1e6) 호출하면, 메모리 누수가 발생함.
- 이러한 문제에 대한 해결책은 아래와 같음.
  - 프로미스 체인을 끊는 것

    ```javascript
    function nonLeakingLoop() {
      return delay(1)
        .then(() => {
          console.log(`Tick ${Date.now()}`)
          return nonLeakingLoop()
        })
    }
    ```

    - 위와 같이 프로미스 체인을 끊으면, 메모리 누수가 발생하지 않음.
    - 그러나 이 방법은 프로미스 체인을 끊는 것이므로, 프로미스 체인을 사용하는 의미가 없어짐.
  - 따라서 여기에 로깅을 추가

    ```javascript
    function nonLeakingLoopWithErrors() {
      return new Promise((resolve, reject) => {
        (function internalLoop() {
          delay(1)
            .then(() => {
              console.log(`Tick ${Date.now()}`)
              internalLoop()
            })
            .catch(err => {
              reject(err)
            })
        })()
      })
    }
    ```

  - 세번째 방법은 async/await를 사용하는 것

    ```javascript
    async function nonLeakingLoop() {
      while (true) {
        await delay(1)
        console.log(`Tick ${Date.now()}`)
      }
    }
    ```

  - 주의사항으로 재귀를 사용하는 경우 이전과 동일하게 무한 프로미스 체인을 생성하고, 메모리 누수를 초래 할 수 있음.

## Chapter 06. 스트림 코딩

- 주요 개념
  - Node.js에서 스트림이 중요한 이유
  - 스트림의 이해와 사용 및 생성
  - 패러다임으로서의 스트림: I/O뿐 아닌, 다양한 가능성
  - 여러 환경에서의 스트리밍 패턴과 스트림 연결

### 6-1 스트림의 중요성 발견

- I/O를 처리하는 가장 효율적인 방법은 실시간 처리(스트리밍)

6-1-1 버퍼링 대 스트리밍

- 버퍼링
  - 이전까지 대부분의 비동기 API는 버퍼 방식으로 동작함.
  - 수신이 끝나기 전 까지는 데이터를 사용할 수 없음.

- 스트리밍
  - 리소스로부터 데이터가 도달하자마자 사용할 수 있음.
  - 데이터가 도착하는 대로 소비자에게 전달함.
  - 메모리를 많이 사용하지 않음.
  - 유휴시간이 없음.
  - **결합성**

6-1-2 공간 효율성

- 스트리밍은 버퍼링에서는 불가능한 대용량 데이터 처리가 가능함.
- V8엔진 자체에 버퍼 크기제한이 있음. 따라서 명확한 한계가 존재함.
- 스트리밍은 이러한 제한을 극복할 수 있으며, 심지어 데이터 크기에 관계없이 일정한 메모리만 사용함.

6-1-3 시간 효율성

- 버퍼링은 데이터가 모두 수신되어야 사용할 수 있음. 따라서 데이터가 모두 수신되기 전까지는 시간이 낭비됨.
- 버퍼링은 이전 작업이 완료되어야 다음 작업을 수행할 수 있는 순차적인 특성을 띔.
- 스트리밍은 데이터가 수신되는 대로 사용할 수 있으므로, 시간을 절약할 수 있음.
- 스트리밍은 이전 작업이 완료되지 않아도 다음 작업을 수행할 수 있으므로, 병렬적인 특성을 띔.

6-1-4 조립성

- pipe()함수를 통해 스트림을 연결할 수 있음.
- 이러한 균일한 인터페이스를 통해 스트림을 조립할 수 있음.
- 이런 특징때문에, 위에서 나열한 효율성 이외에, 코드를 단순화하고 모듈화하는 목적으로도 사용될 수 있음.

### 6-2 스트림 시작하기

- 스트림은 핵심모듈 등 Node.js의 모든 곳에 존재함
- fs: createReadStream(), createWriteStream()
- http: request(), response()
- zlib: createGzip(), createGunzip()
- 기타: createCipher(), createDecipher()...

6-2-1 스트림 해부

- 스트림은 아래의 네 가지 추상 클래스 중 하나의 구현임
  - Readable: 데이터를 읽는 스트림
  - Writeable: 데이터를 쓰는 스트림
  - Duplex: 읽고 쓰는 스트림
  - Transform: 읽은 데이터를 변환하여 쓰는 스트림

- binary 모드: 데이터를 버퍼, 또는 문자열과 같은 청크 형태로 스트리밍
- 객체 모드: 데이터를 객체 형태로 스트리밍

6-2-2 Readable 스트림

- non-flowing 모드(pause 모드)
  - Readable 스트림에서 읽기를 위한 기본 패턴
  - read() 함수는 스트림의 내부 버퍼에서 데이터 청크를 가져오는 동기 작업.
  - 청크는 기본적으로 Buffer객체임.
    - 필요시 인코딩을 지정할 수 있음.
  - read() 함수를 이용해서 버퍼가 비워질 때 까지 데이터를 계속 읽음.
  - 더이상 읽을 데이터가 없을 경우 null을 반환함.
    - 이 경우, 데이터가 준비됐다고 알려주는 readable 이벤트를 기다리거나,
    - 스트림의 끝을 알리는 end 이벤트를 기다릴 수 있음.

  ```javascript
  process.stdin
    .on('readable', () => {
      let chunk;
      console.log('New data available');
      while ((chunk = process.stdin.read()) !== null) {
        console.log(
          `Chunk read: (${chunk.length} bytes): "${chunk.toString()}"`
        )
      }
    })
    .on('end', () => console.log('End of stream'))
  ```

- flowing 모드
  - 리스너를 데이터 이벤트에 연결하거나, resume() 함수를 명시적으로 호출하여 모드 전환 가능
  - read() 함수를 이용하지 않고, 데이터 리스너로 바로 전달.
  - 데이터 흐름을 제어하는 유연성이 떨어짐.
  - pause() 함수를 호출하면 다시 non-flowing 모드로 전환됨.
  
  ```javascript
  process.stdin
    .on('data', (chunk) => {
      console.log('New data available');
      console.log(
        `Chunk read (${chunk.length} bytes: "${chunk.toString()}"`
      )
    })
    .on('end', () => console.log('End of stream'))
  ```

6-2-3 Writable 스트림

- 데이터의 목적지
  - 파일, 네트워크, 데이터베이스, 소켓, 표준 출력 등

```javascript
import { createServer } from 'http';
import Chance from 'chance';

const chance = new Chance();
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  while (chance.bool({ likelihood: 95 })) {
    res.write(`${chance.string()}\n`);
  }
  res.end('\nThe end...\n');
  res.on('finish', () => console.log('All data was sent'));
});
server.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
```

- 배압(Backpressure): 데이터를 쓰는 속도가 데이터를 읽는 속도보다 빠를 때 발생하는 문제를 막기 위한 부가기능.
  - writable.write() 함수는 데이터를 버퍼에 쓰고, 쓰기가 완료되면 true를 반환함.
  - 그러나 데이터를 쓰는 속도가 빨라 highWaterMark 옵션에 지정된 값보다 크면 false를 반환함.
  - 이는 권고 매커니즘으로 false 신호를 무시하고 계속 쓰는 것이 가능: highWaterMark에 도달한다고 중단되지 않음.
  - 따라서 이를 주의깊게 처리해야 함.

```javascript
import { createServer } from 'http';
import Chance from 'chance';

const chance = new Chance();
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  function generateMore() {
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = change.string({ length: 16 * 1024 - 1 });
      const shouldContinue = res.write(`${randomChunk}\n`);
      if (!shouldContinue) {
        console.log('Backpressure');
        return res.once('drain', generateMore);
      }
    }
    res.end('\n\n');
  }
  generateMore();
  res.on('finish', () => console.log('All data was sent'));
});
server.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
```

6-2-4 Duplex 스트림

- 읽기와 쓰기를 모두 수행하는 스트림
- allowHalfOpen 옵션을 통해, 읽기 또는 쓰기 중 하나만 수행할 수 있음.
  - false시 Readable 스트림이 종료되면, Writable 스트림도 종료됨.

6-2-5 Transform 스트림

- 읽은 데이터를 변환하여 쓰는 스트림
- 데이터 변환 파이프라인을 구성하는 데에 완벽함.

```javascript
import { Transform } from 'stream';

export class ReplaceStream extends Transform {
  constructor (searchStr, replaceStr, options) {
    super({ ...options })
    this.searchStr = searchStr
    this.replaceStr = replaceStr
    this.tail = ''
  }

  _transform(chunk, encoding, callback) {
    const pieces = (this.tail + chunk).split(this.searchStr)
    const lastPiece = pieces[pieces.length - 1]
    const tailLen = this.searchStr.length - 1
    this.tail = lastPiece.slice(-tailLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)

    this.push(pieces.join(this.replaceStr))
    callback()
  }

  _flush(callback) {
    this.push(this.tail)
    callback()
  }
}
```

6-2-6 PassThrough 스트림

- 데이터를 변환하지 않고 그대로 전달하는 스트림
- 대표적으로 두 가지 유용성을 가짐
  - 관찰 가능한 파이프

    ```javascript
    // passthrough.js
    import { PassThrough } from 'stream';

    let bytesWritten = 0;
    const monitor = new PassThrough();
    monitor.on('data', (chunk) => {
      bytesWritten += chunk.length;
    });
    monitor.on('finish', () => {
      console.log(`Bytes written: ${bytesWritten}`);
    });

    monitor.write('Hello!');
    monitor.end();

    // use case
    createReadStream(filename)
      .pipe(createGzip())
      .pipe(monitor)
      .pipe(createWriteStream(`${filename}.gz`));
    ```

  - 지연 스트림 구현, 느린 파이프 연결(Late piping): 나중에 읽거나 쓸 데이터에 대한 플레이스 홀더 역할

    ```javascript
    import { createReadStream } from 'fs';
    import { createBrotliCompress } from 'zlib';
    import { Passthrough } from 'stream';
    import { basename } from 'path';
    import { upload } from './upload.js';

    const filepath = process.argv[2];
    const filename = basename(filepath);
    const contentStream = new PassThrough();

    upload(`${filename}.br`, contentStream)
      .then((response) => {
        console.log(`Server response: ${response.data}`);
      })
      .catch((err) => {
        console.error(err)
        precess.exit(1)
      })

    createReadStream(filepath)
      .pipe(createBrotliCompress())
      .pipe(contentStream);
    ```

6-2-7 지연(Lazy) 스트림

- 파일 시스템의 다수 파일을 읽어 스트림 전달하려는 경우, EMFILE 에러가 발생할 수 있음.
- 이는 스트림 사용 전에 비용이 많이 드는 작업을 수행하고 있기 때문임.
- lazystream과 같은 라이브러리를 통해 스트림 인스턴스를 대신할 프록시를 생성하여 해결할 수 있음.
  
  ```javascript
  import lazystream from 'lazystream';
  const lazyURandom = new lazystream.Readable(function (options) {
    return fs.createReadStream('/dev/urandom');
  })
  ```

6-2-8 파이프를 사용하여 스트림 연결하기

- 대표적인 파이프의 사용

  ```zsh
  echo Hello World! | sed s/World/Node.js/g
  ```

- Node.js에서의 파이프

  ```javascript
  readable.pipe(writable)
  ```

- 파이프에서 오류처리

  ```javascript
  stream1
    .pipe(stream2)
    .on('error', () => {})
  ```

  - 위 경우에는 stream1에서 발생하는 오류를 포착할 수 없음.

  ```javascript
  stream1
    .on('error', () => {})
    .pipe(stream2)
    .on('error', () => {})
  ```

  - 위 경우에는 직관적으로도 이상하고, 오류가 발생할 경우 파이프가 해제됨.

  ```javascript
  function handleError(err) {
    console.error(err);
    stream1.destroy();
    stream2.destroy();
  }

  stream1
    .on('error', handleError)
    .pipe(stream2)
    .on('error', handleError)
  ```

  - 위 경우에는 오류가 발생하면 파이프를 해제하고, 스트림을 종료함.
  - 그러나 직관적이지 못한 코드임.

- pipeline()을 사용한 오류처리는 아래와같이 사용 가능함.

  ```javascript
  pipeline(stream1, stream2, stream3, ... cb)
  ```

  - 또한 에러로 중단될 시, 모든 스트림이 정상적으로 제거됨.

```javascript
import { createGzip, createGunzip } from 'zlib'
import { Transform, pipeline } from 'stream'

const uppercasify = new Transform({
  transform (chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  }
})

pipeline(
  process.stdin,
  createGunzip(),
  uppercasify,
  createGzip(),
  process.stdout,
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  }
)
```

### 6-3 스트림을 사용한 비동기 제어 흐름 패턴

- 지금까지는 스트림으로 I/O를 처리하는 방법을 위주로 살펴봄.
- 그러나 또다른 사용방식으로, 비동기 제어 흐름(asynchronous control flow)를 흐름 제어(flow control)로 바꿀 수도 있음
  - 비동기 제어 흐름: 비동기 작업을 순차적으로 실행하는 것?
  - 흐름 제어: 비동기 작업을 병렬로 실행하는 것?

6-3-1 순차적 실행

- 기본적으로 스트림은 데이터를 순서대로 처리함.

```javascript
import { createWriteStream, createReadStream } from 'fs'
import { Readable, Transform } from 'stream'

export function concatFiles (dest, files) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(dest)
    Readable.from(files)
      .pipe(new Transform({
        objectMode: true,
        transform (filename, enc, done) {
          const src = createReadStream(filename);
          src.pipe(destStream, { end: false })
          src.on('error', done)
          src.on('end', done)
        }
      }))
      .on('error', reject)
      .on('finish', () => {
        destStream.end()
        resolve()
      })
  })
}
```

6-3-2 순서가 없는 병렬 실행

- 각 데이터의 청크 사이에 관계가 없는 경우, 순서가 없는 병렬 실행이 더 유리함.
- 각 데이터별 순서가 중요한 경우 사용 할 수 없음.

```javascript
import { Transform } from 'stream';

export class ParallelStream extends Transform {
  constructor(userTransform, opts) {
    super({ objectMode: true, ...opts });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCb = null;
  }

  _transform(chunk, enc, done) {
    this.running++
    this.userTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    )
    done()
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done
    } else {
      done()
    }
  }

  _onComplete(err) {
    this.running--
    if (err) {
      return this.emit('error', err)
    }
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}
```

6-3-3 순서가 없는 제한된 병렬 실행

- 서버의 안정성과 성능을 위해, 병렬 실행의 수를 제한하는 것이 좋음.

```javascript
import { Transform } from 'stream';

export class ParallelStream extends Transform {
  constructor(concurrency, userTransform, opts) {
    super({ objectMode: true, ...opts });
    this.concurrency = concurrency;
    this.userTransform = userTransform;
    this.running = 0;
    this.continueCb = null;
    this.terminateCb = null;
  }

  _transform(chunk, enc, done) {
    this.running++
    this.userTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    )
    if (this.running < this.concurrency) {
      done()
    } else {
      this.continueCb = done
    }
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done
    } else {
      done()
    }
  }

  _onComplete(err) {
    this.running--
    if (err) {
      return this.emit('error', err)
    }
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}
```

6-3-4 순서가 있는 병렬 실행

- 각 청크를 병렬로 처리하되, 수신 순서대로 처리해야 하는 경우가 있음.
- 청크를 내보내기 전, 버퍼를 사용해서 순서를 보장할 수 있음.
- 다만, 병목현상을 유발하거나, 메모리를 무한정 사용하는 문제를 일으킬 수 있음.
  - 이를 막기 위해 버퍼의 크기를 적당하게 유지해야 함.

```javascript
import parallelTransform from 'parallel-transform';

pipeline(
  createReadStream(process.argv[2]),
  split(),
  parallelTransform(4, async function (url, done) {
    if (!url) {
      return done()
    }
    console.log(url)
    try {
      await request.head(url, { timeout: 5 * 1000 });
      this.push(`${url} is up\n`)
    } catch (err) {
      this.push(`${url} is down\n`)
    }
    done()
  }),
  createWriteStream('results.txt'),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('All urls have been checked')
  }
)
```

### 6-4 파이핑(piping) 패턴

- 실제 배관처럼, 스트림도 서로 연결 할 수 있음.
  - 두개의 스트림을 병합하거나,
  - 한 스트림의 흐름을 둘 이상으로 분할하거나,
  - 조건에 따라 흐름을 리다이렉션 할 수 있음.

6-4-1 스트림 결합

- 결합된 스트림의 조합을 하나의 모듈로 사용 할 수 있음
  - 결합된 스트림에 쓰고자 할 때엔 가장 첫 번째 스트림에 쓰기
  - 결합된 스트림에서 읽고자 할 때엔 가장 마지막 스트림에서 읽기
- 보다 중요한 특징은, 결합된 경우에 내부에서 발생하는 모든 오류를 전파한다는 것임.
- 기존 방법에서는 아래와 같은 몇 가지 문제가 있었음
  - pipe() 사용 시: 매 스트림마다 리스너를 명시적으로 연결해야 함.
  - pipeline() 사용 시: 마지막 스트림만 반환함.
  - 즉, 두 가지 모두 Readable 스트림만 얻을 수 있음.

    ```javascript
    import { createReadStream, createWriteStream } from 'fs';
    import { Transform, pipeline } from 'stream';
    import { string as assert } from 'assert';

    const streamA = createReadStream('package.json');
    const streamB = new Transform({
      transform(chunk, enc, done) {
        this.push(chunk.toString().toUpperCase());
        done()
      }
    })
    const streamC = createWriteStream('package-uppercase.json')

    const pipelineReturn = pipeline(streamA, streamB, streamC, (err) => {
      assert.ifError(err);
      console.log('Pipeline succeeded');
    })
    assert.strictEqual(streamC, pipelineReturn) // true

    const pipeReturn = streamA.pipe(streamB).pipe(streamC)
    assert.strictEqual(streamC, pipeReturn) // true
    ```

    - '결합된 스트림'의 두 가지 장점
      - 내부 파이프라인의 구현을 숨겨서 블랙박스로 재배포 가능
      - 파이프라인의 각 스트림에 error 리스너를 연결할 필요 없이, 결합된 스트림 자체에 하나만 연결하면 되기에 관리가 단순화됨.

- 결합된 스트림의 구현
  - 데이터를 압축하고 암호화 / 데이터를 복호화하고 압축 해제하는 코드 예제

  ```javascript
  // combined-stream.js
  import { createGzip, createGunzip } from 'zlib';
  import {
    createCipheriv,
    createDecipheriv,
    scryptSync,
  } from 'crypto';
  import pumpify from 'pumpify';
  function createKey(password) {
    return scryptSync(password, 'salt', 24);
  }

  export function createCompressAndEncrypt(password, iv) {
    const key = createKey(password);
    const combinedStream = pumpify(
      createGzip(),
      createCipheriv('aes192', key, iv)
    )
    combinedStream.iv = iv;

    return combinedStream;
  }

  export function createDecryptAndDecompress(password, iv) {
    const key = createKey(password);
    return pumpify(
      createDecipheriv('aes192', key, iv),
      createGunzip()
    )
  }
  ```

  ```javascript
  // archive.js
  import { createReadStream, createWriteStream } from 'fs';
  import { pipeline } from 'stream';
  import { randomBytes } from 'crypto';
  import { createCompressAndEncrypt } from './combined-stream.js';

  const [,, password, filename] = process.argv;
  const iv = randomBytes(16);
  const destination = `${source}.gz.enc`;

  pipeline(
    createReadStream(source),
    createCompressAndEncrypt(password, iv),

    createWriteStream(destination),
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`${destination} created with iv: ${iv.toString('hex')}`);
    }
  )
  ```

  - 여러 단계를 거치지만, 결합된 단일 스트림으로 처리됨.
  - 사용자는 절차에 대해 알 필요가 없음.

6-4-2 스트림 분기

- 스트림을 분기하는 것은 단일 Readable 스트림을 두 개 이상의 Writable 스트림으로 파이핑하는것임.
  - 동일한 데이터에 서로 다른 변환을 수행하거나,
  - 데이터를 분할하는 경우에도 사용 할 수 있음.

```javascript
import { createReadStream, createWriteStream } from 'fs';
import { createHash } from 'crypto';

const filename = process.argv[2];
const sha1Stream = createHash('sha1');.setEncoding('hex');
const md5Stream = createHash('md5').setEncoding('hex');
const inputStream = createReadStream(filename);

inputStream
  .pipe(sha1Stream)
  .pipe(createWriteStream(`{filename}.sha1`));

inputStream
  .pipe(md5Stream)
  .pipe(createWriteStream(`{filename}.md5`));
```

- 주의사항
  - pipe()를 호출 할 때, { end: false } 옵션을 지정하지 않으면 두 스트림은 inputStream이 종료될 때 자동으로 함께 종료됨.
  - 분기된 스트림은 동일한 chunk를 수신하므로, 모든 스트림에 영향을 미침. 따라서 데이터에 대한 부작용을 주의해야 함. - 어떤 부작용이 있을지?
  - 배압이 즉시 발생함. inputStream은 매우 빠르게 생성되나, 분기된 스트림은 처리속도가 상대적으로 느림.
    - 특히 분기된 스트림 중 하나가 지연된다면 모든 분기된 스트림이 지연되며,
    - 하나가 무기한 차단되면 모든 스트림이 차단됨.
  - 스트림 진행 중에 다른 분기가 추가되면, 해당 분기는 파이프된 이후의 chunk만을 수신함.
- 이러한 경우, PassThrough 스트림을 플레이스홀더로 사용하여 데이터를 미리 수집 할 수 있고, 이러한 데이터를 통해 손실 위험 없이 나중에 읽을 수도 있음.
- 이를 통해 배압을 조절할 수도 있음.

6-4-3 스트림 병합

- 다수의 Readable을 하나의 Writable로 결합하는 것.
- 다만, 다수의 Readable 중 하나가 { end: true } 옵션을 지정하면, 해당 스트림이 종료될 때 모든 스트림이 함께 종료되는 문제가 발생함.
- 따라서 { end: false } 옵션을 사용하고 별도의 종료 조건을 지정해야 함.
- 텍스트 병합 예제

  ```javascript
  import { createReadStream, createWriteStream } from 'fs';
  import split from 'split';

  const dest = process.argv[2];
  const source = process.argv.slice(3)

  const destStream = createWriteStream(dest);

  let endCount = 0;
  for (const source of sources) {
    const sourceStream = createReadStream(source, { highWaterMark: 16 });
    // 종료된 스트림 수 카운트
    sourceStream.on('end', () => {
      // 종료조건
      if (++endCount === sources.length) {
        destStream.end();
        console.log(`${dest} created`);
      }
    })
    sourceStream
      .pipe(split((line) => line + '\n'))
      .pipe(destStream, { end: false });
  }
  ```

6-4-4 멀티플렉싱 및 디멀티플렉싱

- 병합 스트림 중 일부는, 스트림을 결합하는것이 아니라, 공유 채널을 통해 전달만 하는 경우가 있음.
  - 여기서 스트림을 공유 채널로 결합하는 작업을 멀티플렉싱(multiplexing; mux)이라 함.
  - 반대로, 공유 채널에서 스트림을 분리하는 작업을 디멀티플렉싱(demultiplexing; demux)이라 함.
- 원격 로거(stdout, stderr)
  - 공유 매체는 TCP 연결
  - 다중화 채널은 자식 프로세스의 stdout 및 stderr
  - 패킷 스위칭(packet switching) 사용
  - 클라이언트측 코드

    ```javascript
    // client.js
    import { fork } from 'child_process';
    import { connect } from 'net';

    function multiplexChannels(sources, destination) {
      let openChannels = sources.length;
      for (let i = 0; i < sources.length; i++) {
        sources[i]
          .on('readable', function () {
            let chunk;
            while ((chunk = this.read()) !== null) {
              const outBuff = Buffer.alloc(1 + 4 + chunk.length);
              outBuff.writeInt8(i, 0);
              outBuff.writeUInt32BE(chunk.length, 1);
              chunk.copy(outBuff, 5);
              console.log(`Sending packet to channel: ${i}`);
              destination.write(outBuff);
            }
          })
          .on('end', () => {
            if (--openChannels === 0) {
              destination.end();
            }
          })
      }
    }

    const socket = connect(3000, () => {
      const child = fork(
        process.argv[2],
        process.argv.slice(3),
        { silent: true },
      );
      multiplexChannels([child.stdout, child.stderr], socket);
    });
    ```

  - 서버측 코드

    ```javascript
    import { createWriteStream } from 'fs';
    import { createServer } from 'net';

    function demultiplexChannel(source, destinations) {
      let currentChannel = null;
      let currentLength = null;

      source
        .on('readable', () => {
          let chunk;
          if (currentChannel === null) {
            chunk = source.read(1);
            currentChannel = chunk && chunk.readUInt8(0);
          }

          if (currentLength === null) {
            chunk = source.read(4);
            currentLength = chunk && chunk.readUInt32BE(0);
            if (currentLength === null) {
              return null;
            }
          }

          chunk = source.read(currentLength);
          if (chunk === null) {
            return null;
          }

          console.log(`Received packet from: ${currentChannel}`);
          destinations[currentChannel].write(chunk);
          currentChannel = null;
          currentLength = null;
        })
        .on('end', () => {
          destinations.forEach((destination) => destination.end());
          console.log('Source channel closed');
        })
    }

    const server = createServer((socket) => {
      const stdoutStream = createWriteStream('stdout.log');
      const stderrStream = createWriteStream('stderr.log');
      demultiplexChannel(socket, [stdoutStream, stderrStream]);
    })
    server.listen(3000, () => console.log('Server started'));
    ```
