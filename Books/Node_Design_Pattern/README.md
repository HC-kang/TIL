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

## Chapter 07. 생성자 디자인 패턴

- 디자인 패턴: 특정 문제를 해결하기 위해 사용되는 일반적인 설계 패턴
- Javascript에서의 객체지향 디자인 패턴은 기존 강타입 언어에서의 디자인 패턴과는 다른 특징을 가짐.
- 유연한 특징을 가졌기에, 디자인 패턴 구현을 위한 지나치게 많은 방법이 존재함.
- 실제로 클래스나 추상 인터페이스를 가지고있지 않기에, 구현이 불가능한 경우도 있음

### 7-1 팩토리

- 특정 구현으로부터 객체의 생성을 분리 할 수 있음.
- 클래스보다 훨씬 작은 면을 노출함. 따라서 사용자에게 더 적은 정보를 제공하여 이해하기 쉬움.
- 클로저를 활용해 캡슐화를 강제할 수 있음.

7-1-1 객체 생성과 구현의 분리

- 팩토리 패턴은 new 연산자의 사용보다 더 편리하고 유연한 객체 생성 방법을 제공함.
- 객체의 생성과 객체의 구현을 분리 할 수 있음.
- 특정 조건에 따른 객체 생성을 유연하게 처리할 수 있음.

```javascript
// factory
function createImage(name) {
  return new Image(name);
}
const image = createImage('photo.jpg');

// new
const image = new Image('photo.jpg');

// factory - modified
function createImage(name) {
  if (name.match(/\.jpe?g$/)) {
    return new JpegImage(name);
  } else if (name.match(/\.gif$/)) {
    return new GifImage(name);
  } else if (name.match(/\.png$/)) {
    return new PngImage(name);
  } else {
    throw new Exception('Unsupported format');
  }
}
const image = createImage('photo.jpg');
```

7-1-2 캡슐화를 강제할 수 있는 메커니즘

- 팩토리 패턴은 클로저를 활용해 캡슐화를 강제할 수 있음.

```javascript
function createPerson(name) {
  const privateProperties = {};

  const person = {
    setName(name) {
      if (!name) {
        throw new Error('A person must have a name');
      }
      privateProperties.name = name;
    },
    getName() {
      return privateProperties.name;
    }
  }
  person.setName(name);
  return person;
}
```

7-1-3 간단한 코드 프로파일러 만들기

- 단순한 코드 프로파일러를 만들어서 사용 시, 프로덕션 환경에서는 불필요할 정도로 많은 로그를 생성함.
- 아래의 방법으로 간단하게 해결 가능함.

```javascript
// profiler.js;
class Profiler {
  constructor (label) {
    this.label = label
    this.lastTime = null
  }

  start() {
    this.lastTime = process.hrtime()
  }

  end() {
    const diff = process.hrtime(this.lastTime)
    console.log(`Timer "${this.label}" took ${diff[0]} seconds and ${diff[1]} nanoseconds`)
  }
}
```

```javascript
// profilerFactory.js
const nodeProfiler = {
  start() {},
  end() {},
}

export function createProfiler(label) {
  if (process.env.NODE_ENV === 'production') {
    return nodeProfiler
  } else {
    return new Profiler(label)
  }
}
```

7-1-4 실전에서

- Knex 패키지의 QueryBuilder 클래스는 팩토리 패턴을 사용하여, 다양한 데이터베이스에 대해 동일한 인터페이스를 제공함.

### 7-2 빌더

- 복잡한 객체를 생성 할 때, 이해하기 쉽도록 단계별로 객체를 생성 할 수 있음.
- 아래와 같이 매개변수가 많은 객체를 생성하는 경우 유용함.

```javascript
class Boat {
  constructor(hasMotor, motorCount, motorBrand, motorModel, hasSails, sailsCount, sailsMaterial, sailsColor, hullCOlor, hasCabin) {
    // ...
  }
}

const myBoat = new Boat(true, 2, 'Honda', 'BF100', false, 0, null, null, 'blue', true)
```

- 이러한 경우, 가장 먼저 사용 할 수 있는 방법은 모든 인자를 하나의 객체 리터럴로 전달하는 것임.

```javascript
class Boat{
  constructor(allParameters) {
    // ...
  }
}

const myBoat = new Boat({
  hasMotor: true,
  motorCount: 2,
  motorBrand: 'Honda',
  motorModel: 'BF100',
  hasSails: false,
  sailsCount: 0,
  sailsMaterial: null,
  sailsColor: null,
  hullColor: 'blue',
  hasCabin: true,
})
```

- 그러나 이러한 방법은 객체 리터럴을 작성하기 위해 클래스에 대한 문서 혹은 클래스 내부 코드를 읽어야 함.

```javascript
class BoatBuilder {
  withMotors (count, brand, model) {
    this.hasMotor = true
    this.motorCount = count
    this.motorBrand = brand
    this.motorModel = model
    return this
  }

  withSails (count, material, color) {
    this.hasSails = true
    this.sailsCount = count
    this.sailsMaterial = material
    this.sailsColor = color
    return this
  }

  withHull (color) {
    this.hullColor = color
    return this
  }

  withCabin () {
    this.hasCabin = true
    return this
  }

  build () {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin,
    })
  }
}

const myBoat = new BoatBuilder()
  .withMotors(2, 'Honda', 'BF100')
  .withSails(0, null, null)
  .withCabin()
  .withHull('blue')
  .build()
```

- 빌더 패턴의 목적은 생성자를 읽기 쉽고, 단순한 여러 단계로 나누는 것
- 매개변수들 간의 관계가 있을 시, 이를 한번에 여러 매개변수를 설정하는 메서드로 구현할 수 있음.
- setter 메서드를 통해 입력값을 검증하고, 사용자가 알 필요 없는 내부 상태를 캡슐화 할 수 있음.
- 필요시 매개변수에 대한 형변환, 정규화 혹은 기타 변환을 수행할 수 있음.
- build()를 이용한 생성 대신, invoke()를 사용하는 함수형 빌더 패턴을 사용할 수도 있음.

7-2-1 URL 객체 빌더 구현하기

- 표준 URL의 모든 구성요소를 검증하고, 문자열 형태로 변환하는 URL 클래스 구현
- 가장 기본적인 구현

  ```javascript
  export class Url {
    constructor(protocol, username, password, hostname, port, pathname, search, hash) {
      this.protocol = protocol
      this.username = username
      this.password = password
      this.hostname = hostname
      this.port = port
      this.pathname = pathname
      this.search = search
      this.hash = hash

      this.validate()
    }

    validate() {
      if (!this.protocol || !this.hostname){
        throw new Error('Must specify at least a protocol and a hostname')
      }
    }

    toString() {
      let url = '';
      url += this.protocol + '://';
      if (this.username && this.password) {
        url += this.username + ':' + this.password + '@';
      }
      url += this.hostname;
      if (this.port) {
        url += ':' + this.port;
      }
      if (this.pathname) {
        url += this.pathname;
      }
      if (this.search) {
        url += '?' + this.search;
      }
      if (this.hash) {
        url += '#' + this.hash;
      }
      return url;
    }
  }

  // use
  const url = new Url('http', 'user', 'pass', 'localhost', '8080', '/some/path', 'key=value', 'key2=value2');
  ```

- 빌더 패턴으로 구현

  ```javascript
  export class UrlBuilder {
    setProtocol(protocol) {
      this.protocol = protocol
      return this
    }

    setAuthentication(username, password) {
      this.username = username
      this.password = password
      return this
    }

    setHostname(hostname) {
      this.hostname = hostname
      return this
    }

    setPort(port) {
      this.port = port
      return this
    }

    setPathname(pathname) {
      this.pathname = pathname
      return this
    }

    setSearch(search) {
      this.search = search
      return this
    }

    setHash(hash) {
      this.hash = hash
      return this
    }

    build() {
      return new Url(
        this.protocol,
        this.username,
        this.password,
        this.hostname,
        this.port,
        this.pathname,
        this.search,
        this.hash
      )
    }
  }

  // use
  import { UrlBuilder } from './url-builder.js';

  const url = new UrlBuilder()
    .setProtocol('http')
    .setAuthentication('user', 'pass')
    .setHostname('localhost')
    .build()

  console.log(url.toString());
  ```

7-2-2 실전에서

- superagent 패키지의 Request 클래스는 빌더 패턴을 사용하여, HTTP 요청을 생성함.

```javascript
superagent
  .post('https://example.com/api/person')
  .send({ name: 'John Doe', role: 'user' })
  .set('accept', 'json')
  .then((response) => {
    console.log(response.body)
  })
```

### 7-3 공개 생성자

- 공개 생성자 패턴은 GoF의 패턴이 아닌, Node.js의 커뮤니티에서 유래한 패턴임.
- 객체가 생성되는 순간에만 객체의 일부를 노출하고, 이후에는 노출하지 않음.
  - 생성시에만 수정 할 수 있는 객체의 생성
  - 생성시에만 사용자 정의 동작을 정의 할 수 있는 객체 생성
  - 생성시 한번만 초기화 할 수 있는 객체 생성

```javascript
//                  (생성자)            (실행자)   (공개 멤버 변수)
const object = new SomeClass(function executor(revealedMembers) {
  // ...
})
```

7-3-1 변경 불가능한(Immutable) 버퍼 만들기

- 변경 불가능(Immutable) 객체의 장점
  - 객체의 상태를 변경할 수 없기에, 객체의 상태를 추적하기 쉬움.
  - 객체의 변경을 감지하기 위해 완전 항등 연산자(===)만 사용하면 됨.

```javascript
// 
const MODIFIER_NAMES = ['swap', 'write', 'fill'];

export class ImmutableBuffer {
  constructor (size, executor) {
    const buffer = Buffer.alloc(size);
    const modifiers = {};
    for (const prop in buffer) {
      if (typeof buffer[prop] !== 'function') {
        continue;
      }
      if (MODIFIER_NAMES.some(m => prop.startsWith(m))) {
        modifiers[prop] = buffer[prop].bind(buffer);
      } else {
        this[prop] = buffer[prop].bind(buffer);
      }
    }
    executor(modifiers);
  }
}

// use
import { ImmutableBuffer } from './immutable-buffer.js';

const hello = 'Hello!';
const immutable = new ImmutableBuffer(hello.length, ({ write }) => {
  write(hello);
});

console.log(String.fromCharCode(immutable.readInt8(0)));

// 다음과 같은 에러 발생
// "TypeError: immutable.write is not a function"

// immutable.write('Hello?');
```

- 여기에서 ImmutableBuffer는 buffer와 사용자 사이의 프록시 역할을 함.

7-3-2 실전에서

- 공개 생성자 패턴은 완벽한 캡슐화를 제공해야 하는 경우에 사용됨
- 대표적인 예시는 Promise 클래스임.

```javascript
return new Promise((resolve, reject) => {
  // ...
})
```

- Promise 클래스는 일단 생성되면 상태를 변경할 수 없음.

### 7-4 싱글톤

- 클래스의 인스턴스가 단 하나만 존재하도록 보장하는 패턴.
- 모든 접근을 중앙 집중화 하는 패턴.
- 사용목적
  - 상태 정보의 공유
  - 리소스 사용의 최적화
  - 리소스에 대한 접근 동기화

```javascript
// Database.js
export class Database {
  constructor (dbName, connectionDetails) {
    // ...
  }
}
```

```javascript
import { Database } from './Database.js';

export const dbInstance = new Database('my-app-db', {
  url: 'localhost:5432',
  username: 'user',
  password: 'password',
})
```

- Node.js에서는 기본적으로 모듈을 캐시하므로, 모듈을 여러 번 임포트해도 싱글톤이 보장됨.
- 다만, 모듈은 전체 경로를 키로 캐시되므로, 이는 정확한 고유성을 보장하지는 못함.

### 7-5 모듈 와이어링(Wiring)

- 모든 어플리케이션은 여러 컴포넌트를 연결(wiring) 한 결과임.
- 모듈 와이어링은 어플리케이션의 컴포넌트를 연결하는 방법을 설명함.
- 설명을 위해 blog.js와 db.js를 예로 사용

7-5-1 싱글톤 종속성

- 모듈을 연결하는 가장 간단한 방법은 Node.js의 모듈 시스템을 이용하는 것임.

```javascript
// db.js
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const db = new sqlite3.Database(join(__dirname, 'data.sqlite'));
```

```javascript
// blog.js
import { promisify } from 'util';
import { db } from './db.js';

const dbRun = promisify(db.run.bind(db));
const dbAll = promisify(db.all.bind(db));

export class Blog {
  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );`;

    return dbRun(initQuery);
  }

  createPost(id, title, content, createdAt) {
    return dbRun(`INSERT INTO posts VALUES(?, ?, ?, ?)`, id, title, content, createdAt);
  }

  getAllPosts() {
    return dbAll(`SELECT * FROM posts ORDER BY created_at DESC`);
  }
}
```

```javascript
// index.js
import { Blog } from './blog.js';

async function main() {
  const blog = new Blog();
  await blog.initialize();
  const posts = await blog.getAllPosts();
  if (posts.length === 0) {
    console.log('No post available. Run `node import-posts.js` to load some sample posts');
  }
  for (const post of posts) {
    console.log(post.title);
    console.log('-'.repeat(post.title.length));
    console.log(`Published on ${new Date(post.created_at).toISOString()}`);
    console.log(post.content);
  }
}

main().catch(console.log);
```

- 위의 예제를 통해, 일관된 접근을 위해 db를 싱글톤으로 만들어두는 것이 꽤나 괜찮다는 것을 알 수 있음.
- 그러나 테스트를 위해 목을 사용해야 하거나, DB를 변경해야 할 경우 등에 대해 대응 할 수 없음.

7-5-2 종속성 주입(DI; Dependency Injection)

- 컴포넌트의 종속성이 injector라는 외부 요소를 통해 공급되는 패턴

```javascript
// blog.js - refactor
import { promisify } from 'util';

export class Blog {
  constructor(db) {
    this.db = db
    this.dbRun = promisify(db.run.bind(db));
    this.dbAll = promisify(db.all.bind(db));
  }

  initialize() {
    const initQuery = `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );`;

    return this.dbRun(initQuery);
  }

  createPost(id, title, content, createdAt) {
    return this.dbRun(`INSERT INTO posts VALUES(?, ?, ?, ?)`, id, title, content, createdAt);
  }

  getAllPosts() {
    return this.dbAll(`SELECT * FROM posts ORDER BY created_at DESC`);
  }
}
```

- 더이상 db.js를 임포트하지 않음.
- 대신 생성자에서 db라는 인자를 주입받음.

```javascript
// db.js
import sqlite3 from 'sqlite3';

export function createDb(dbFile) {
  return new sqlite3.Database(dbFile);
}
```

```javascript
// index.js
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Blog } from './blog.js';
import { createDb } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const db = createDb(join(__dirname, 'data.sqlite'));
  const blog = new Blog(db);
  await blog.initialize();
  const posts = await blog.getAllPosts();
  if (posts.length === 0) {
    console.log('No post available. Run `node import-posts.js` to load some sample posts');
  }
  for (const post of posts) {
    console.log(post.title);
    console.log('-'.repeat(post.title.length));
    console.log(`Published on ${new Date(post.created_at).toISOString()}`);
    console.log(post.content);
  }
}

main().catch(console.log);
```

## Chapter 08. 구조적 설계 패턴

- 대표적인 구조적 디자인 패턴
  - 프록시: 다른 객체에 대한 액세스를 제어 할 수 있는 패턴
  - 데코레이터: 객체의 동작을 동적으로 확장 할 수 있는 패턴
  - 어댑터: 다른 인터페이스를 통해 객체의 기능에 액세스 할 수 있는 패턴
- 반응형 프로그래밍(Reactive Programming; RP): 데이터의 흐름과 변경사항의 전파에 중점을 둔 선언적 프로그래밍 패러다임.

### 8-1 프록시

- 프록시란, Subject라는 특정 객체에 대한 액세스를 제어하는 객체임.
- 프록시는 Subject와 동일한(투명한) 인터페이스를 제공함.
- 이를 통해 특정 기능을 변경하는 것이 가능함.
- 다른 이름으로 서로게이트(surrogate)라고도 함.
- 프록시가 유용하게 사용되는 경우
  - 데이터 검증: 전달되는 데이터가 Subject에 도달하기 전에 유효성을 검사할 수 있음.
  - 보안: 클라이언트가 권한이 있는지 확인하고, 권한이 없는 경우에는 Subject에 대한 액세스를 거부할 수 있음.
  - 캐싱: Subject에 대한 요청을 캐싱하여, 동일한 요청에 대한 응답을 캐시에서 반환할 수 있음.
  - 느린 초기화: Subject가 초기화되는데 시간이 걸리는 경우, 프록시는 초기화를 꼭 필요할 떄 까지 지연시킬 수 있음.
  - 기록: Subject에 대한 요청을 기록하여, 통계를 수집하거나, 디버깅을 수행할 수 있음.
  - 원격 객체: Subject가 원격에 존재하는 경우, 프록시는 원격 객체에 대한 액세스를 로컬에서 제공할 수 있음.

8-1-1 프록시 구현 기술

- 프록시를 작성 할 때, 모든 함수를 가로채거나 일부만 가로채도록 구현 할 수 있음.
- 설명을 위한 예제로, 아래의 StackCalculator를 사용함.

  ```javascript
  class StackCalculator {
    constructor() {
      this.stack = [];
    }

    putValue(value) {
      this.stack.push(value);
    }

    getValue() {
      return this.stack.pop();
    }

    peekValue() {
      return this.stack[this.stack.length - 1];
    }

    clear() {
      this.stack = [];
    }

    divide() {
      const divisor = this.getValue();
      const dividend = this.getValue();
      const result = dividend / divisor;
      this.putValue(result);
      return result;
    }

    multiply() {
      const multiplicand = this.getValue();
      const multiplier = this.getValue();
      const result = multiplier * multiplicand;
      this.putValue(result);
      return result;
    }
  }

  // use
  const calculator = new StackCalculator();
  calculator.putValue(3);
  calculator.putValue(2);
  console.log(calculator.multiply()); // 6
  calculator.putValue(2);
  console.log(calculator.multiply()); // 12
  ```

- 객체 컴포지션
  - 저장되는 상태는 Subject에 유지되고, 필요시 프록시에서 이를 사용함.

  ```javascript
  class SafeCalculator {
    constructor(calculator) {
      this.calculator = calculator;
    }

    divide() {
      const divisor = this.calculator.getValue();
      if (divisor === 0) {
        throw Error('Division by 0');
      }
      return this.calculator.divide();
    }

    putValue(value) {
      return this.calculator.putValue(value);
    }

    getValue() {
      return this.calculator.getValue();
    }

    peekValue() {
      return this.calculator.peekValue();
    }

    clear() {
      return this.calculator.clear();
    }

    multiply() {
      return this.calculator.multiply();
    }

    // use
    const calculator = new StackCalculator();
    const safeCalculator = new SafeCalculator(calculator);

    calculator.putValue(3);
    calculator.putValue(2);
    console.log(calculator.multiply()); // 6

    safeCalculator.putValue(2);
    console.log(safeCalculator.multiply()); // 12

    calculator.putValue(0);
    console.log(calculator.divide()); // Infinity

    safeCalculator.clear();
    safeCalculator.putValue(4);
    safeCalculator.putValue(0);
    console.log(saferCalculator.divide()); // Error: Division by 0
  }
  ```

- 객체 리터럴과 팩토리함수 활용
  - 클래스 기반 구현보다 간단함.
  - 프록시의 인터페이스를 명시적으로 정의해야 함.

  ```javascript
  function createSafeCalculator(calculator) {
    return {
      divide() {
        const divisor = calculator.getValue();
        if (divisor === 0) {
          throw Error('Division by 0');
        }
        return calculator.divide();
      },
      putValue(value) {
        return calculator.putValue(value);
      },
      getValue() {
        return calculator.getValue();
      },
      peekValue() {
        return calculator.peekValue();
      },
      clear() {
        return calculator.clear();
      },
      multiply() {
        return calculator.multiply();
      },
    }
  }

  const calculator = new StackCalculator();
  const safeCalculator = createSafeCalculator(calculator);
  ```

- 객체 확장(Object augmentation), 몽키패치(Monkey patch)
  - 대상 객체를 직접 변경하기에 위험함.
  - private한 대상에만 사용하는 것이 좋음.

  ```javascript
  function patchToSafeCalculator(calculator) {
    const divideOrig = calculator.divide;
    calculator.divide = () => {
      const divisor = calculator.getValue();
      if (divisor === 0) {
        throw Error('Division by 0');
      }
      return divideOrig.call(calculator);
    }
    return calculator;
  }

  const calculator = new StackCalculator();
  const safeCalculator = patchToSafeCalculator(calculator);
  ```

- 내장 프록시 객체
  - 프록시 객체는 대상과 핸들러를 인자로 받음.
  - 핸들러는 대상에 대한 액세스를 가로채는 함수를 포함함.
  - target[property] 를 통해, 모든 메서드와 속성에 대한 명시를 하지 않아도 됨.

  ```javascript
  // Basic
  const proxy = new Proxy(target, handler);
  ```

  ```javascript
  const safeCalculatorHandler = {
    get: (target, property) => {
      if (property === 'divide') {
        return function () {
          const divisor = target.peekValue();
          if (divisor === 0) {
            throw Error('Division by 0');
          }
          return target.divide();
        }
      }
      return target[property];
    }
  }

  const calculator = new StackCalculator();
  const safeCalculator = new Proxy(calculator, safeCalculatorHandler);
  ```

  - 내장 프록시 객체의 특성

    ```javascript
    const evenNumbers = new Proxy([], {
      get: (target, index) => index * 2,
      has: (target, number) => number % 2 === 0,
    })
    ```

    - 프록시 객체를 활용한 무한한 크기의 array(모든 짝수)
    - 다만 Proxy 객체는 구 버전에서는 지원하지 않음 - 완전하게 트랜스파일이나 폴리필 될 수 없음

- 프록시 기술의 비교
  - 컴포지션
    - 원래 동작을 변경하지 않고 프록시를 만들 수 있음.
    - 그러나 단일 함수를 프록시하고자 하는 경우에도 모든 함수를 명시적으로 위임해야 함.
  - 객체 확장
    - 위험할 수 있으나, 위임과 관련된 불편함이 없음.
    - Subject가 수정가능한 상황에서는 선호될 수 있음.
    - 그러나 객체확장으로는 처리 할 수 없는 경우가 있음: Lazy initialization, Remote object 등
  - 프록시 객체 활용
    - 호출을 꼭 가로채야하는 경우에 사용.
    - 다른 기술보다 더 많은 기능을 제공함.

8-1-2 쓰기가 가능한 로깅 스트림 만들기

- 실제 예제에 적용되는 프록시 패턴 예제

```javascript
// logging-writable.js
export function createLoggingWriteable(writable) {
  return new Proxy(writable, {
    get (target, propKey, receiver) {
      if (propKey === 'write') {
        return function (...args) {
          const [chunk] = args;
          console.log('Writing', chunk);
          return writable.write(...args);
        }
      }
      return target[propKey];
    }
  })
}

// use
import { createWriteStream } from 'fs';
import { createLoggingWriteable } from './logging-writable.js';

const writable = createWriteStream('test.txt');
const writableProxy = createLoggingWriteable(writable);

writableProxy.write('First chunk');
writableProxy.write('Second chunk');
writable.write('This is not logged');
writableProxy.end();
```

8-1-3 프록시를 사용한 변경 옵저버

- '변경 옵저버'는 '옵저버' 패턴과 유사하지만 다른 개념임. 당연하게도 옵저버가 더 넓은 개념.
  - 변경 옵저버: 속성 변경을 감지하는 것이 중점
  - 옵저버: 이벤트 전파를 위해 event emitter를 사용하는, 보다 일반적인 패턴

```javascript
export function createObservable(target, observer) {
  const observable = new Proxy(target, {
    set (obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        observer({ prop, prev, value });
      }
      return true;
    }
  })
  return observable;
}
```

```javascript
// invoice.js
import { createObservable } from './observable.js';

function calculateTotal(invoice) {
  return invoice.subtotal - invoice.discount + invoice.tax;
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20,
};
let total = calculateTotal(invoice);
console.log(`Starting total: ${total}`);

const obsInvoice = createObservable(
  invoice,
  ({ prop, prev, curr }) => {
    total = calculateTotal(obsInvoice);
    console.log(`TOTAL: ${total} (${prop} changed: ${prev} -> ${curr})`);
  }
)

obsInvoice.subtotal = 200; // TOTAL: 210
obsInvoice.discount = 20; // TOTAL: 200
obsInvoice.discount = 20; // no alert
obsInvoice.tax = 30; // TOTAL: 210

console.log(`Final total: ${total}`); // 210
```

8-1-4 실전에서

- LoopBack, Vue3, MobX 등에서 프록시 패턴을 사용함.

### 8-2 데코레이터

- 데코레이터란 기존 객체의 동작을 동적으로 증대시키는 것을 목적으로 하는 패턴.
- 모든 객체에 적용되는 것이 아닌, 명시적으로 데코레이팅 된 객체에만 영향을 줌.
  - 따라서 클래스의 상속과는 다름.
- 프록시 패턴과 매우 유사하나, 의도하는 바가 다름.

8-2-1 데코레이터 구현 기법

- 컴포지션을 활용한 구현

  ```javascript
  class EnhancedCalculator {
    constructor(calculator) {
      this.calculator = calculator;
    }

    // new function
    add() {
      const addend2 = this.getValue();
      const addend1 = this.getValue();
      const result = addend1 + addend2;
      this.putValue(result);
      return result;
    }

    // updated function
    divide() {
      const divisor = this.calculator.peekValue()
      if (divisor === 0) {
        throw Error('Division by 0');
      }
      return this.calculator.divide();
    }

    // delegated functions
    putValue(value) {
      return this.calculator.putValue(value);
    }

    getValue() {
      return this.calculator.getValue();
    }

    peekValue() {
      return this.calculator.peekValue();
    }

    clear() {
      return this.calculator.clear();
    }

    multiply() {
      return this.calculator.multiply();
    }

    const calculator = new StackCalculator();
    const enhancedCalculator = new EnhancedCalculator(calculator);

    enhancedCalculator.putValue(4);
    enhancedCalculator.putValue(3);
    console.log(enhancedCalculator.add()); // 7
    enhancedCalculator.putValue(2);
    console.log(enhancedCalculator.multiply()); // 14
  }
  ```

- 객체 확장

  ```javascript
  function patchCalculator(calculator) {
    // new function
    calculator.add = function () {
      const addend2 = this.getValue();
      const addend1 = this.getValue();
      const result = addend1 + addend2;
      calculator.putValue(result);
      return result;
    }

    // updated function
    const divideOrig = calculator.divide;
    calculator.divide = function () {
      const divisor = this.peekValue();
      if (divisor === 0) {
        throw Error('Division by 0');
      }
      return divideOrig.call(this);
    }

    return calculator;
  }

  const calculator = new StackCalculator();
  const enhancedCalculator = patchCalculator(calculator);
  ```

  - calculator와 enhancedCalculator는 동일한 객체를 가리킴.

- Proxy 객체를 이용한 데코레이팅

  ```javascript
  const enhancedCalculatorHandler = {
    get (target, property) {
      if (property === 'add') {
        // new function
        return function add() {
          const addend2 = target.getValue();
          const addend1 = target.getValue();
          const result = addend1 + addend2;
          target.putValue(result);
          return result;
        }
      } else if (property === 'divide') {
        // updated function
        return function () {
          const divisor = target.peekValue();
          if (divisor === 0) {
            throw Error('Division by 0');
          }
          return target.divide();
        }
      }

      // delegated functions
      return target[property];
    }
  }

  const calculator = new StackCalculator();
  const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler);
  ```

8-2-2 LevelUP 데이터베이스 데코레이트

- LevelUP은 Node.js에서 사용되는 키-값 데이터베이스임.
- 최초 크롬에서 IndexedDB로 사용하기위하여 만들어진 LevelDB를 감싼 Node.js 래퍼
- 최소주의와 확장성이 Node.js의 철학과 일치함.
- 다방면에 걸쳐 발전함.
- 간단한 플러그인 구현

  ```javascript
  export function levelSubscribe(db) {
    db.subscribe = (pattern, listener) => {
      db.on('put', (key, val) => {
        const match = Object.keys(pattern).every(k => (pattern[k] === val[k]));
        if (match) {
          listener(key, val);
        }
      }
      )
    }
    return db;
  }
  ```

  ```javascript
  import { dirname, join } from 'path';
  import { fileURLToPath } from 'url';
  import level from 'level';
  import { levelSubscribe } from './level-subscribe.js';

  const __dirname = dirname(fileURLToPath(import.meta.url));

  const dbPath = join(__dirname, 'db');
  const db = level(dbPath, { valueEncoding: 'json' });
  levelSubscribe(db);

  db.subscribe(
    { doctype: 'tweet', language: 'en' },
    (k, val) => console.log(val),
  )
  db.put('1', {
    doctype: 'tweet',
    text: 'Hi',
    language: 'en',
  })
  db.put('2', {
    doctype: 'company',
    name: 'ACME',
  })
  ```

8-2-3 실전에서

- 생략

### 8-3 프록시와 데코레이터 사이의 경계

- 프록시와 데코레이터는 매우 유사한 패턴임.
- 때떄로 서로 바꿔서도 사용 가능
- 프록시
  - 고정적이거나 가상의 객체에 접근을 제어하는데 사용
  - 원래의 인터페이스를 변경하지 않음.
  - 원래 객체를 참조하는 다른 객체들도 안전함.
- 데코레이터
  - 새로운 동작을 기존의 객체에 추가
  - 일종의 래퍼로, 기능을 추가할 수 있음.

### 8-4 어댑터

- 객체를 다른 인터페이스로 활용하기 위해 사용하는 패턴
- 가장 대표적인 구현방법은 컴포지션을 활용하는 것

8-4-1 파일시스템 API로 LevelUP 사용하기

- 어댑터를 활용해, LevelUP API를 기본 fs모듈과 호환되도록 하는 예제

```javascript
import { resolve } from 'path';

export function createFSAdapter(db) {
  return ({
    readFile(filename, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      db.get(resolve(filename), {
        valueEncoding: options.encoding,
      }, 
      (err, value) => {
        if (err) {
          if (err.type === 'NotFoundError') {
            err = new Error(`ENOENT, open "${filename}"`);
            err.code = 'ENOENT';
            err.errno = 34;
            err.path = filename;
          }
          return callback && filename;
        }
        callback && callback(null, value);
      })
    },
    writeFile(filename, contents, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (typeof options === 'string') {
        options = { encoding: options };
      }

      db.put(resolve(filename), contents, {
        valueEncoding: options.encoding,
      }, callback);
    }
  })
}
```

```javascript
// test example
import fs from 'fs';

fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', { encoding: 'utf8' }, (err, contents) => {
    if (err) {
      return console.error(err);
    }
    console.log(res);
  })
})

fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(err);
})
```

```javascript
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import level from 'level';
import { createFSAdapter } from './fs-adapter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = level(join(__dirname, 'db'), {
  valueEncoding: 'json',
});
const fs = createFSAdapter(db);
```

8-4-2 실전에서

- JugglingDB, nanoSQL, level-filesystem 등

## Chapter 09. 행위 디자인 패턴

- 특정 요구사항에 맞게 컴포넌트의 일부를 변경하는 전략(Strategy) 패턴
- 상태에 따라 컴포넌트의 동작을 변경시킬 수 있는 상태(Status) 패턴
- 새로운 것을 정의하기 위해 컴포넌트의 구조를 재사용 할 수 있는 템플릿(Template) 패턴
- 컬렉션을 순회하거나, 컬렉션의 요소를 처리하는 반복자(Iterator) 패턴
- 모듈식 처리 절차를 정의하는 미들웨어(Middleware) 패턴
- 루틴 실행에 필요한 정보를 구체화하여 전달하는 명령(Command) 패턴

### 9-1 전략 패턴

- 전략패턴은 컨텍스트라는 객체를 바탕으로, 전략 이라는 별도의 상호 교체 가능한 객체로 추출하여 로직의 변경을 지원하는 패턴
  - 컨텍스트는 다른 산물들의 공통적인 로직을 구현하고,
  - 전략은 컨텍스트에 의존하는 가변적인 로직을 구현함.
  - 이를 통해, 시스템 및 사용자 설정 등 다양한 요소로 동작을 조정 할 수 있음.
- 주어진 문제 내에서 우려사항을 분리해낼 수 있음.
- 동일한 문제의 다양한 변형에 적용 할 수 있음.
- 동일한 역할의 범위 에서 다른 컴포넌트들을 교체할 수 있음.
- 대표적인 구현방법
  - if-else문을 사용한 방법.
    - if-else문을 사용하면, 컨텍스트와 전략이 강하게 결합됨.
    - 전략이 추가되거나 변경될 때마다 컨텍스트를 수정해야 함.
    - 전략이 많아질수록 코드가 복잡해짐.
  - 특정 상황에 대한 선택을 전략 객체로 구현하여 위임.
    - 인터페이스가 유지되는 한, 컨텍스트는 전략의 변경에 영향을 받지 않음.
    - 전략이 추가되거나 변경될 때마다 컨텍스트를 수정할 필요가 없음.
    - 사실상 무제한으로 전략을 추가할 수 있음.

9-1-1 여러 형식을 지원하는 환경설정 객체

- 애플리케이션의 환경 설정을 다루는 Config라는 객체 작성

```javascript
// context.js
import { promise as fs } from 'fs';
import objectPath from 'object-path';

export class Config {
  constructor(formatStrategy) {
    this.data = {};
    this.formatStrategy = formatStrategy;
  }

  get (configPath) {
    return objectPath.get(this.data, configPath);
  }

  set (configPath, value) {
    return objectPath.set(this.data, configPath, value);
  }

  async load(filePath) {
    console.log(`Deserializing from ${filePath}`);
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePath, 'utf-8')
    );
  }

  async save(filePath) {
    console.log(`Serializing to ${filePath}`);
    await fs.writeFile(filePath, this.formatStrategy.serialize(this.data));
  }
}
```

```javascript
// strategy.js
import ini from 'ini';

export const iniStrategy = {
  deserialize: data => ini.parse(data),
  serialize: data => ini.stringify(data),
}

export const jsonStrategy = {
  deserialize: data => JSON.parse(data),
  serialize: data => JSON.stringify(data, null, '  '),
}
```

```javascript
// index.js
import { Config } from './context.js';
import { jsonStrategy, iniStrategy } from './strategy.js';

async function main() {
  const iniConfig = new Config(iniStrategy);
  await iniConfig.load('samples/conf.ini');
  iniConfig.set('book.nodejs', 'design patterns');
  await iniConfig.save('samples/conf_mod.ini');

  const jsonConfig = new Config(jsonStrategy);
  await jsonConfig.load('samples/conf.json');
  jsonConfig.set('book.nodejs', 'design patterns');
  await jsonConfig.save('samples/conf_mod.json');
}

main();
```

9-1-2 실전에서

- passport.js, express.js 등에서 사용됨.

### 9-2 상태(State) 패턴

- 상태 패턴은 컨텍스트의 상태에 따라 전략이 변경되는, 전략 패턴의 일종임.
- 예를 들면, 호텔 예약 시스템에서 예약 상태에 따라 다른 전략을 사용하는 것.
  - 예약 상태가 '미결정'인 경우
    - confirm() - O
    - cancel() - X
    - delete() - O
  - 예약 상태가 '확정'인 경우
    - confirm() - X
    - cancel() - O
    - delete() - X
  - 예약일이 임박한 경우
    - confirm() - X
    - cancel() - X
    - delete() - X

9-2-1 기본적인 안전 소켓 구현

```javascript
// failSafeSocket.js
import { OfflineState } from './offlineState.js';
import { OnlineState } from './onlineState.js';

export class FailSafeSocket {
  constructor (options) {
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null;
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this),
    }
    this.changeState('offline');
  }
  changeState(state) {
    console.log(`Activating state: ${state}`);
    this.currentState = this.states[state];
    this.currentState.activate();
  }
  send(date) {
    this.currentState.send(date);
  }
}
```

```javascript
// offlineState.js
import jsonOverTcp from 'json-over-tcp-2';

export class OfflineState {
  constructor (failSafeSocket) {
    this.failSafeSocket = failSafeSocket;
  }

  send(data) {
    this.failsafeSocket.queue.push(data);
  }
  activate() {
    const retry = () => {
      setTimeout(() => this.activate(), 1000);
    }

    console.log(`Trying to connect...`);
    this.failsafeSocket.socket = jsonOverTcp.connect(
      this.failsafeSocket.options,
      () => {
        console.log(`Connection established`);
        this.failsafeSocket.socket.removeListener('error', retry);
        this.failsafeSocket.changeState('online');
      }
    )
    this.failsafeSocket.socket.once('error', retry);
  }
}
```

```javascript
// onlineState.js
export class OnlineState {
  constructor (failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
    this.hasDisconnected = false;
  }
  send(data) {
    this.failsafeSocket.queue.push(data);
    this._safeWrite(data);
  }
  _safeWrite(data) {
    this.failsafeSocket.socket.write(data, (err) => {
      if (!this.hasDisconnected && !err) {
        this.failsafeSocket.queue.shift();
      }
    })
  }
  activate() {
    this.hasDisconnected = false;
    for (const data of this.failsafeSocket.queue) {
      this._safeWrite(data);
    }

    this.failsafeSocket.socket.once('error', () => {
      this.hasDisconnected = true;
      this.failsafeSocket.changeState('offline');
    })
  }
}
```

```javascript
// server.js
import jsonOverTcp from 'json-over-tcp-2';

const server = jsonOverTcp.createServer({ port: 5000 });
server.on('connection', socket => {
  socket.on('data', data => {
    console.log('Client data', data);
  })
})

server.listen(5000, () => console.log('Server started'));
```

```javascript
// client.js
import { FailSafeSocket } from './failSafeSocket.js';

const failsafeSocket = new FailSafeSocket({ port: 5000 });

setInterval(() => {
  failsafeSocket.send(process.memoryUsage());
}, 1000)
```

### 9-3 템플릿(Template)

- 템플릿 패턴은 추상 클래스를 통해 컴퓨넌트의 공통부분(스켈레톤)을 먼저 구현함.
- 이후 하위 클래스(템플릿 함수)에서 구체적인 구현을 수행함.
- 단, Javascript에서는 추상 클래스를 지원하지 않으므로, 무조건 예외를 발생시키는 함수를 구현 해 두어야 함.
- 템플릿과 전략 패턴의 목적은 매우 유사하지만 구조와 구현에 차이가 있음
  - 전략 패턴: 실행 시 동적으로 변경 가능
  - 템플릿 패턴: 하위 클래스가 정의되는 순간 전체 컴포넌트의 동작이 결정됨

9-3-1 환경 설정 관리 템플릿

- 이전 전략 패턴에서 구현했던 Config 객체를 템플릿 패턴으로 다시 구현
- 전략 패턴과 주요한 차이점은, 템플릿 패턴에서 로직은 런타임에 결정되는 것이 아닌, 클래스 자체에 포함되어 있음.

  ```javascript
  // configTemplate.js
  import { promises as fsPromises } from 'fs';
  import objectPath from 'object-path';

  export class ConfigTemplate {
    async load (file) {
      console.log(`Deserializing from ${file}`);
      this.data = this._deserialize(
        await fsPromises.readFile(file, 'utf-8');
      )
    }

    async save(file) {
      console.log(`Serializing to ${file}`);
      await fsPromises.writeFile(file, this._serialize(this.data));
    }

    get(path) {
      return objectPath.get(this.data, path);
    }

    set(path, value) {
      return objectPath.set(this.data, path, value);
    }

    _serialize() {
      throw new Error(`_serialize() must be implemented`);
    }

    _deserialize() {
      throw new Error(`_deserialize() must be implemented`);
    }
  }
  ```

  ```javascript
  // jsonConfig.js
  import { ConfigTemplate } from './configTemplate.js';

  export class JsonConfig extends ConfigTemplate {
    _deserialize(data) {
      return JSON.parse(data);
    }

    _serialize(data) {
      return JSON.stringify(data, null, '  ');
    }
  }
  ```

  ```javascript
  // iniConfig.js
  import { ConfigTemplate } from './configTemplate.js';
  import ini from 'ini';

  export class IniConfig extends ConfigTemplate {
    _deserialize(data) {
      return ini.parse(data);
    }

    _serialize(data) {
      return ini.stringify(data);
    }
  }
  ```

  ```javascript
  // index.js
  import { JsonConfig } from './jsonConfig.js';
  import { IniConfig } from './iniConfig.js';

  async function main() {
    const jsonConfig = new JsonConfig();
    await jsonConfig.load('samples/conf.json');
    jsonConfig.set('book.nodejs', 'design patterns');
    await jsonConfig.save('samples/conf_mod.json');

    const iniConfig = new IniConfig();
    await iniConfig.load('samples/conf.ini');
    iniConfig.set('book.nodejs', 'design patterns');
    await iniConfig.save('samples/conf_mod.ini');
  }

  main();
  ```

9-3-2 실전에서

- 생략

### 9-4 반복자(Iterator)

- 이터레이터 패턴은 배열 또는 트리 데이터 등의 구조에서 컨테이너의 요소들을 반복하기 위한 공통 인터페이스 또는 프로토콜을 정의하는 패턴
  - 내부 구현은 컨테이너의 실제 구조에 따라 모두 다르지만, 외부에서는 동일한 인터페이스를 통해 접근 가능하도록 구현함.
- 이터레이터 패턴을 통해, 순회 연산의 처리내용과 순회 알고리즘의 구현을 분리 할 수 있음.
- 이터레이터 패턴은 컨테이너의 내부 구조에 대한 지식을 외부로 노출시키지 않음.

9-4-1 반복자(Iterator) 프로토콜

- Javascript에서는 주로 이터레이터를 프로토콜을 통해 구현함. - 상속과 같은 형식적인 패턴은 주로 사용하지 않음.
- 반복할 때 마다 요소를 return하며, done 이라는 변수의 값이 undefined로 설정됨.
- done이 true가 되면 반복이 종료됨.
  - 그러나 종료 시에도 값을 return 할 수 있음.
  - 이런 경우에는 요소의 값이 아닌, 전체 동작에 대한 정보 관련값이 반환됨.(소요시간, 합계, 평균 등)

```javascript
const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

function createAlphabetIterator() {
  let currCode = A_CHAR_CODE;

  return {
    next() {
      const currChar = String.fromCharCode(currCode);
      if (currCode > Z_CHAR_CODE) {
        return {
          done: true,
        }
      }
      currCode++;
      return {
        value: currChar,
        done: false,
      }
    }
  }
}
```

- 대부분의 경우, 이터레이터는 '현재 요소가 어디쯤인지'를 기억해야 하기에, 상태 저장 객체임.
- 클로저나 인스턴스 변수에 상태 보관 가능.
  - 이런 특징으로 인해 디버깅이 수월 할 수 있으나, 반면에 외부 코드에서 상태를 변경할 수 있음.
- 그럼에도 불구하고, stateless한 경우도 있을 수 있음.
  - 무작위 요소 반복, 무한 반복 등.

```javascript
const iterator = createAlphabetIterator();

let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = iterator.next();
}
```

9-4-2 반복가능자(Iterable) 프로토콜

- 반복가능자는 반복자를 반환하는 [Symbol.iterator]() 메서드를 구현하는 객체임.

```javascript
// matrix.js
export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }

  get (row, column) {
    if (row >= this.data.length ||
    column >= this.data[row].length) {
      throw new RangeError('Out of range');
    }
  }

  set (row, column, value) {
    if (row >= this.data.length ||
    column >= this.data[row].length) {
      throw new RangeError('Out of range');
    }
    this.data[row][column] = value;
  }

  [Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;

    return {
      next: () => {
        if (nextRow === this.data.length) {
          return { done: true },
        }

        const currVal = this.data[nextRow][nextCol];

        if (nextCol === this.data[nextRow].length - 1) {
          nextRow++;
          nextCol = 0;
        } else {
          nextCol++;
        }

        return { value: currVal }
      }
    }
  }
}
```

```javascript
// index.js
import { Matrix } from './matrix.js';

const matrix2x2 = new Matrix([
  ['11', '12'],
  ['21', '22'],
])

const iterator = matrix2x2[Symbol.iterator]();
let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = iterator.next();
}
```

9-4-3 네이티브 Javascript 인터페이스로서의 Iterator와 Iterable

- iterable 과 iterator라는 표준화된 인터페이스를 통해 제3자의 코드를 모델링 할 수 있게 됨.

```javascript
// for ...of
for (const element of matrix2x2) {
  console.log(element);
}

// spread operator
const flattenedMatrix = [...matrix2x2];
console.log(flattenedMatrix);

// destructuring
const [oneOne, oneTwo, twoOne, twoTwo] = matrix2x2;
console.log(oneOne, oneTwo, twoOne, twoTwo);

// Map, WeakMap, Set, WeakSet, Promise.all, Promise.race, Array.from...
```

9-4-4 제너레이터

- 제너레이터(세미코루틴; semicoroutines)는 이터레이터를 반환하는 함수임.
- yield를 통해 값을 반환하고 일시정지 할 수 있음.

```javascript
function * fruitGenerator() {
  yield 'peach';
  yield 'watermelon';
  return 'summer';
}

const fruitGeneratorObj = fruitGenerator();
console.log(fruitGeneratorObj.next()); // { value: 'peach', done: false }
console.log(fruitGeneratorObj.next()); // { value: 'watermelon', done: false }
console.log(fruitGeneratorObj.next()); // { value: 'summer', done: true }
```

```javascript
// generator with for...of
for (const fruit of fruitGenerator()) {
  console.log(fruit);
}
// peach
// watermelon
// * 마지막 summer는 출력되지 않음! - 요소가 아닌 전체 결과값이기 때문.
```

- 제너레이터는 일반 반복자보다 유용하게 쓰일 수 있음.
  - next() 함수는 선택적으로 인자를 허용하기 때문

```javascript
function * twoWayGenerator() {
  const what = yield null;
  console.log(`Hello ${what}`);
}

const twoWay = twoWayGenerator();
twoWay.next();
console.log(twoWay.next('World'));
// Hello World
```

```javascript
function * twoWayGenerator() {
  try {
    const what = yield null;
    yield `Hello ${what}`;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

console.log('Using throw(): ');
const twoWayException = twoWayGenerator();
twoWayException.next();
console.log(twoWayException.throw(new Error('Problem!')));

console.log('Using return(): ');
const twoWayReturn = twoWayGenerator();
console.log(twoWayReturn.return('myReturnValie'));

/**
 * Using throw():
 * { value: 'Hello error: Boom!', done: false }
 * Using return():
 * { value: 'myReturnValue', done: true }
 */
```

- throw()와 return()은 제너레이터를 종료시키는 역할을 함.
  - throw()는 첫 번째 yield 명령어가 반환되는 즉시 예외가 발생하며, 제너레이터 내에서 예외가 발생하는 것과 동일하게 처리됨.
  - return()은 제너레이터를 종료시키고, value 프로퍼티에 전달된 값을 반환함.

```javascript
export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }

  get (row, column) {
    if (row >= this.data.length ||
    column >= this.data[row].length) {
      throw new RangeError('Out of range');
    }
  }

  set (row, column, value) {
    if (row >= this.data.length ||
    column >= this.data[row].length) {
      throw new RangeError('Out of range');
    }
    this.data[row][column] = value;
  }

  * [Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;

    while (nextRow !== this.data.length) {
      yield this.data[nextRow][nextCol];

      if (nextCol === this.data[nextRow].length - 1) {
        nextRow++;
        nextCol = 0;
      } else {
        nextCol++;
      }
    }
  }
}
```

- 함수명 앞의 *를 통해 제너레이터 함수임을 표시함.
- 반복의 상태 유지를 위해 로컬 변수를 사용함.
- next() 함수가 아닌 while 루프를 사용하며, 이로인해 더 직관적임.

9-4-5 비동기 반복자

- Node.js에서는 비동기 연산으로 반복 작업을 하는 것이 매우 일반적임.
- for await ...of 구문을 사용.

```javascript
const asyncIterator = iterable[Symbol.asyncIterator]();
let iterationResult = await asyncIterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = await asyncIterator.next();
}
```

```javascript
// checkUrls.js
// Promises의 배열과 같은 반복가능자를 사용하는 예시
import superagent from 'superagent';

export class CheckUrls {
  constructor(urls) {
    this.urls = urls;
  }

  [Symbol.asyncIterator]() {
    const urlsIterator = this.urls[Symbol.iterator]();

    return {
      async next() { // ---> async 키워드를 통해 비동기 반복자임을 표시함.
        const iteratorResult = urlsIterator.next();
        if (iteratorResult.done) {
          return { done: true };
        }

        const url = iteratorResult.value;
        try {
          const checkResult = await superagent
            .head(url);
            .redirects(2);
          return {
            done: false,
            value: `${url} is up, status: ${checkResult.status}`,
          }
        } catch (err) {
          return {
            done: false,
            value: `${url} is down, error: ${err.message}`,
          }
        }
      }
    }
  }
}
```

```javascript
// main.js
import { CheckUrls } from './checkUrls.js';

async function main() {
  const checkUrls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com',
  ]);

  for await (const status of checkUrls) {
    console.log(status);
  }
}

main();
```

9-4-6 비동기 제너레이터

- 비동기 제너레이터는 비동기 이터레이터를 반환하는 함수.
- 비동기 이터레이터보다 코드 구현이 간단해지고, 이해하기 쉬워짐.

```javascript
async function * generatorFunction() { // ---> async 키워드 사용
  // ... body of generator
}
```

```javascript
export class CheckUrls {
  constructor(urls) {
    this.urls = urls;
  }
}

async * [Symbol.asyncIterator]() {
  for (const url of this.urls) {
    try {
      const checkResult = await superagent
        .head(url)
        .redirects(2);
      yield `${url} is up, status: ${checkResult.status}`;
    } catch (err) {
      yield `${url} is down, error: ${err.message}`;
    }
  }
}
```

9-4-7 비동기 반복자 및 Node.js 스트림

- Node.js 스트림은 비동기 반복자와 매우 유사한 특성을 보임.
- 애초에 stream.Readable은 @@asyncIterator 메서드를 구현하고 있음.
- 이로 인해 for await ...of 구문을 사용할 수 있음.

```javascript
import split from 'split2';

async function main() {
  const stream = process.stdin.pipe(split());
  for await (const line of stream) {
    console.log(`You wrote: ${line}`);
  }
}

main();
```

- 이렇듯 매우 비슷한 모습으로 인해, 사용 사례와 상황에 따라 선택적으로 사용할 수 있음.
- 주요 판단 기준이 될 특징은 아래와 같음.
  - 스트림은 push된다. 반면에 비동기 반복자는 사용자에 의해 pull된다.
  - 스트림은 내부 버퍼 및 백프레셔를 제공하기에 가벼운 이진 데이터를 처리하는 데에 더 적합하다.
  - 스트림은 pipe라는 표준화된 메서드로 연결할 수 있지만, 비동기 반복자는 그렇지 않다.

9-4-8 실전에서

- 대부분의 DB 커넥터들은 이터레이터를 통해 queryStream()이라는 함수를 제공함.
- 이는 내부적으로 for await ...of 구문을 사용함.
- 다른 예시로는 zeroMQ라는 라이브러리에서도 이에 크게 의존함.

### 9-5 미들웨어(Middleware)

- '미들웨어'라는 용어가 Node.js에서는 여타 프레임워크와는 다른 의미로 사용됨.
- 일반적인 다른 프레임워크에서는 각종 하위수준 기능을 추상화하는 소프트웨어 제품들을 뜻함.
- Node.js에서는 매우 작은 단위의 모듈화된 함수들을 뜻함.

9-5-1 Express에서 미들웨어

- 일반적으로 HTTP 요청과 그 응답을 처리하는 함수들을 미들웨어라고 함.
- 이를 통해 프레임워크의 핵심 기능을 수정하지 않고, 다양한 기능을 추가/변경 할 수 있음.
- 예시는 아래와 같음.
  - req의 본문 분석
  - req, res의 압축/해제
  - 접근 로그 생성
  - 세션 관리
  - 암호화 된 쿠키 관리
  - CSRF(Cross-site Request Forgery) 보호 제공 등
- 다시 정리하자면, 실제 요청을 처리하는 핸들러가 주요 비즈니스 로직에 집중 할 수 있도록, 부수적인 것을 처리 해 주는 액세서리들임.
- 말 그대로, 중간에 위치한 소프트웨어임.

9-5-2 패턴으로서의 미들웨어

- 인터셉터 필터(Interceptor Fiilter), 책임 사슬(Chain of Responsibility) 패턴으로 여겨짐.
- 파이프라인과도 비슷하다고 볼 수 있음.
- 매우 높은 유연성과 확장성을 가졌음.
- 미들웨어 패턴의 특징
  - use() 함수를 통해 새로운 함수를 호출/추가
  - 일반적으로는 파이프라인의 끝단에 추가되지만, 엄격하게 지켜지는 규칙은 아님.
  - 등록된 미들웨어들은 비동기 순차 실행으로 호출되며, 각 이전의 출력값이 입력값으로 전달됨.
  - 각 미들웨어는 데이터의 처리를 중단할 권한을 가질 수 있음.
    - 이런 경우는 일반적으로 에러 처리를 전담하는 미들웨어를 호출함.

9-5-3 ZeroMQ를 위한 미들웨어 프레임워크 만들기

- ZeroMQ란, 저수준의 원자 메시지를 전송하는 라이브러리임.
- 낮은 수준으로 인해, 고수준의 프로토콜을 구현하기 위해서는 사용자가 직접 구현해야 함.
- 이후 코드에서 이를 사용하기 위한 간단한 프레임워크를 구현
  - 첫번째로, 파이프라인을 실행할 컴포넌트를 정의 함.

    ```javascript
    export class ZmqMiddlewareManager {
      constructor(socket) {
        this.socket = socket;
        this.inboundMiddleware = [];
        this.outboundMiddleware = [];
        this.handleIncomingMessages()
          .catch(err => console.error(err));
      }

      async handleIncomingMessages() {
        for await (const [message] of this.socket) {
          await this
            .executeMiddleware(this.inboundMiddleware, message)
            .catch(err => console.error(`Error while processing the message`, err));
        }
      }

      async send(message) {
        const finalMessage = await this
          .executeMiddleware(this.outboundMiddleware, message);
        return this.socket.send(finalMessage);
      }

      use(middleware) {
        if (middleware.inbound) {
          this.inboundMiddleware.push(middleware.inbound);
        }
        if (middleware.outbound) {
          this.outboundMiddleware.unshift(middleware.outbound);
        }
      }

      async executeMiddleware(middleware, initialMessage) {
        let message = initialMessage;
        for await (const middlewareFunc of middleware) {
          message = await middlewareFunc(message);
        }
        return message;
      }
    }
    ```

  - 두번째로, 미들웨어를 정의함.

    ```javascript
    // jsonMiddleware.js
    export const jsonMiddleware = function () {
      return {
        inbound(message) {
          return JSON.parse(message.toString());
        },
        outbound(message) {
          return Buffer.from(JSON.stringify(message));
        }
      }
    }
    ```

    ```javascript
    // zlibMiddleware.js
    import { inflateRaw, deflateRaw } from 'zlib';
    import { promisify } from 'util';

    const inflateRawAsync = promisify(inflateRaw); // ---> 압축, 해제에 소요되는 시간이 길기 때문에 비동기로 처리함.
    const deflateRawAsync = promisify(deflateRaw);

    export const zlibMiddleware = function () {
      return {
        inbound (message) {
          return inflateRawAsync(message);
        },
        outbound (message) {
          return deflateRawAsync(message);
        },
      }
    }
    ```

  - 마지막으로, 이를 사용하는 예시를 구현함.

    ```javascript
    // server.js
    import zeromq from 'zeromq';
    import { ZmqMiddlewareManager } from './zmqMiddlewareManager.js';
    import { jsonMiddleware } from './jsonMiddleware.js';
    import { zlibMiddleware } from './zlibMiddleware.js';

    async function main() {
      const socket = new zeromq.Reply();
      await socket.bind('tcp://127.0.0.1:5000');

      const zmqm = new ZmqMiddlewareManager(socket);
      zmqm.use(zlibMiddleware());
      zmqm.use(jsonMiddleware());
      zmqm.use({
        async inbound(message) {
          console.log('Received: ', message);
          if (message.action === 'ping') {
            await this.send({ action: 'pong', echo: message.echo });
          }
          return message;
        }
      })
      console.log('Server started');
    }

    main();
    ```

    ```javascript
    // client.js
    import zeromq from 'zeromq';
    import { ZmqMiddlewareManager } from './zmqMiddlewareManager.js';
    import { jsonMiddleware } from './jsonMiddleware.js';
    import { zlibMiddleware } from './zlibMiddleware.js';

    async function main() {
      const socket = new zeromq.Request();
      await socket.connect('tcp://127.0.0.1:5000');

      const zmqm = new ZmqMiddlewareManager(socket);
      zmqm.use(zlibMiddleware());
      zmqm.use(jsonMiddleware());
      zmqm.use({
        inbound(message) {
          console.log('Received: ', message);
          return message;
        }
      })

      setInterval(() => {
        zmqm.send({ action: 'ping', echo: Date.now() });
      }, 1000);

      console.log('Client started');
    }

    main();
    ```

9-5-4 실전에서

- Node.js에서 미들웨어 패턴을 대중화한 대표적인 라이브러리가 Express임.
- 추가적으로, Express의 후속인 Koa
- Middy: AWS Lambda를 위한 미들웨어 프레임워크

### 9-6 커맨드(Command) 패턴

- 실행에 필요한 정보들을 캡슐화하는 패턴
- 함수나 기능을 직접 호출하는 것이 아닌, 실행에 필요한 정보를 캡슐화 한 객체를 생성함.
- 주요개념
  - 커맨드(Command): 함수 또는 함수를 호출하는데에 필요한 정보를 캡슐화 한 객체
  - 클라이언트(Client): 명령을 생성하고, 호출자(Invoker)에게 전달하는 컴포넌트
  - 대상(Target): 호출되는 단일 함수 혹은 객체의 메서드 등.
  - 호출자(Invoker): 대상(Target)에서 명령의 실행을 담당하는 컴포넌트.
- 커맨드 패턴의 특징
  - 나중에 실행할 명령을 저장 할 수 있음.
  - 쉽게 직렬화하여 전송, 보관 할 수 있음.
    - 따라서 원격 시스템에서도 활용이 가능함.
  - 실행된 모든 작업의 기록을 유지하기 쉬움.
  - 아직 실행되지 않은 예약된 작업을 취소 할 수 있음.
  - 여러 커맨드를 그룹화하여 트랜잭션을 구현 할 수 있음.

9-6-1 작업(Task) 패턴

- 가장 기본적인 구현 형태
- Javascript에서 호출을 나타내는 객체를 생성하는 가장 쉬운 방법
  - 클로저 사용
  - 함수를 바인딩

  ```javascript
  // closure
  function createTask(target, ...args) {
    return () => {
      target(...args);
    }
  }

  // binding
  const task = target.bind(null, ...args);
  ```

9-6-2 좀 더 복잡한 커맨드

- 실행 취소와 직렬화를 지원하는 예제

  ```javascript
  const statusUpdates = new Map();

  // Target
  export const statusUpdateService = {
    postUpdate(state) {
      const id = Math.floor(Math.random() * 1000000);
      statusUpdate.set(id, status);
      console.log(`Status posted: ${status}`);
      return id;
    },

    destroyUpdate(id) {
      statusUpdates.delete(id)
      console.log(`Status deleted: ${id}`);
    },
  }
  ```
  
  ```javascript
  // createPostStatusCmd.js
  export function createPostStatusCmd(service, status) {
    let postId = null;

    // Command
    return {
      run() {
        postId = service.postUpdate(status);
      },
      undo() {
        if (postId) {
          service.destroyUpdate(postId);
          postId = null;
        }
      },
      serialize() {
        return { type: 'status', action: 'post', status: status }
      }
    }
  }

  // Invoker
  export class Invoker {
    constructor() {
      this.history = [];
    }

    run(cmd) {
      this.history.push(cmd);
      cmd.run();
      console.log(`Command executed`, cmd.serialize());
    }

    delay(cmd, delay) {
      setTimeout(() => {
        console.log(`Executing delayed command`, cmd.serialize());
        this.run(cmd);
      }, delay);
    }

    undo() {
      const cmd = this.history.pop();
      cmd.undo();
      console.log(`Command undone`, cmd.serialize());
    }

    async runRemotely(cmd) {
      await superagent
        .post('http://localhost:3000/cmd')
        .send({ json: cmd.serialize() });
      
      console.log(`Command executed remotely`, cmd.serialize());
    }
  }
  ```

  ```javascript
  // client.js
  import { createPostStatusCmd } from './createPostStatusCmd.js';
  import { statusUpdateService } from './statusUpdateService.js';
  import { invoker } from './invoker.js';

  const invoker = new Invoker();

  const command = createPostStatusCmd(statusUpdateService, 'Hello World');

  invoker.run(command);
  invoker.undo();
  invoker.delay(command, 1000 * 3);
  invoker.runRemotely(command);
  ```

- 커맨드 패턴은 꼭 필요한 경우에만 사용하는 것이 중요함
  - 이외에 사용 시에는 코드가 복잡해지고, 유지보수가 어려워짐.

### 요약

- 생략

## Chapter 10. 웹 어플리케이션을 위한 범용 Javascript

- 주요 개념
  - 브라우저와 Node.js간에 코드를 공유하는 방법
  - 크로스플랫폼 개발의 기초(코드 분기, 모듈 교체 및 기타 유용한 패턴)
  - React에 대한 간략한 소개
  - React 및 Node.js를 사용하여 완전한 범용 Javascript 어플리케이션을 구축하는 방법

### 10-1 브라우저와 코드 공유

- Node.js
  - DOM이나 View에 대한 지식이 없음.
  - 실행되는 버전을 확정할 수 있어 호환성에 대한 우려가 없음.
- 브라우저
  - 파일 시스템이나 운영체제에 대한 지식이 없음.
  - 실행하는 브라우저에 따라 호환성이 달라질 수 있음.

10-1-1 크로스플랫폼 컨텍스트의 Javascript 모듈

- 브라우저와 서버에서 코드를 공유 시 해결해야 하는 문제점
  - 브라우저와 서버 환경차이
  - 브라우저와 서버에서 사용하는 모듈 시스템의 차이
  - 코드 배포의 차이
- 이를 해결하는 대표적인 방법
  - 번들링(패키징)
    - 번들링이란, 여러 파일을 하나의 파일로 묶는 것을 의미함.
    - 이를 통해 다수의 파일을 하나로 묶어, 브라우저에서 실행이 용이하게 함.
      - 브라우저에서는 큰 파일 하나를 다운로드 하는 것이, 작은 파일 여러개를 다운로드 하는 것보다 효율적이기 때문.
    - 이러한 작업을 해주는 도구가 모듈 번들러임.
      - 대표적으로 Webpack, Rollup, Parcel 등이 있음.

- 결과적으로 서버에서는 빌드 없이도 소스코드를 실행할 수 있으나,
- 브라우저에서는 번들링이라는 일종의 컴파일 작업이 필요함.
  - 이 과정에서 파일을 줄이는 것 이상의 일을 할 수 있는데, 대표적인것이 트랜스파일링임.
  - 그 외에도 트리쉐이킹, 코드 스플리팅 등의 기능을 제공함.

- 모듈 번들러의 두 가지 단계
  - 종속성 해결
    - 진입점(entry point)부터 시작하여 imports를 확인해 나가며, 재귀적으로 종속성을 해결함.
    - 결과적으로 모듈맵을 생성함
  - 패킹
    - 생성된 모듈맵을 통해, 모듈들을 하나의 실행 가능한 번들로 변환함.

      ```javascript
      ((modulesMap) => {                        // ---> IIFE
        const require = (name) => {             // ---> require 함수. 모듈을 로드하고, 모듈의 exports를 반환함.
          const module = { exports: {} };       // ---> 모듈 객체 초기화
          modulesMap[name](module, require);    // ---> 서비스 로케이터 패턴을 통해, 모듈을 로드함.
          return module.exports;                // ---> 모듈의 exports를 반환함.
        }
        require('app.js');                      // ---> 진입점
      })(
        {
          'app.js': (module, require) => { /** ... */},
          'calculator.js': (module, require) => { /** ... */},
          'display.js': (module, require) => { /** ... */},
          'parser.js': (module, require) => { /** ... */},
          'resolver.js': (module, require) => { /** ... */},
        }
      )
      ```

      - 서비스 로케이터 패턴: 서비스 인터페이스와 실제 서비스 제공자 간의 매핑을 유지하고, 필요할 때 해당 서비스를 검색할 수 있는 클래스 또는 컴포넌트

### 10-2 크로스 플랫폼 개발의 기초

- 크로스 플랫폼의 가장 기본이 되는 내용은, 최대한 많은 코드를 재사용 하며 플랫폼에 따라 꼭 필요한 구현만 제공하는 것임.

10-2-1런타임 코드 분기

- 가장 직관적인 기술은 코드를 동적으로 분기하는 것임.

```javascript
import nunjucks from 'nunjucks';

const template = `<h1>Hello <i>{{ name }}</i></h1>`;

export function sayHello(name) {
  if (typeof window !== 'undefined' && window.document) {
    // browser
    return nunjucks.renderString(template, { name } );
  }

  // node.js
  return `Hello \u001b[1m${name}\u001b[22m`;
}
```

- 문제점: 번들러는 런타임 변수로 조건을 판별할수 없기에, 모든 코드가 포함됨.
  - 모든 코드가 양쪽 플랫폼의 번들에 포함되어있음.
  - 따라서 용량이 크고, 불필요한 코드가 포함됨.
  - 암호화 키나 API키가 포함되어 있을 경우, 보안상의 문제가 발생할 수 있음.
  - 분기 로직으로 인해 코드가 복잡해지고 가독성이 떨어짐.

10-2-2 빌드 시 코드 분기

- 웹팩 플러그인을 사용한 빌드 시 코드 분기
- 이를 통해 보안상의 문제를 해결할 수 있음.
- 플러그인
  - DefinePlugin
    - 소스 파일의 특정 코드를 빌드 시에 대체하는 플러그인
  - terser-webpack-plugin
    - 코드를 압축하고 트리쉐이킹을 수행하는 플러그인

```javascript
import nunjucks from 'nunjucks';
export function sayHello (name) {
  if (typeof __BROWSER__ !== 'undefined') {
    // browser
    const template = `<h1>Hello <i>{{ name }}</i></h1>`;
    return nunjucks.renderString(template, { name });
  }
  // node.js
  return `Hello \u001b[1m${name}\u001b[22m`;
}
```

```javascript
// after DefinePlugin
if (true) {
  const template = `<h1>Hello <i>{{ name }}</i></h1>`;
  return nunjucks.renderString(template, { name });
}
return `Hello \u001b[1m${name}\u001b[22m`;
```

```javascript
// after terser-webpack-plugin
const template = `<h1>Hello <i>{{ name }}</i></h1>`;
return nunjucks.renderString(template, { name });
```

10-2-3 모듈 스와핑

- 빌드 시 모듈 구현 전체를 교체하는 방법

```javascript
// src/say-hello.js
import chalk from 'chalk';
export function sayHello(name) {
  return `Hello ${chalk.bold(name)}`;
}

// src/say-hello.browser.js
import nunjucks from 'nunjucks';
const template = `<h1>Hello <i>{{ name }}</i></h1>`;
export function sayHello(name) {
  return nunjucks.renderString(template, { name });
}
```

- 구현 전체가 교체되기에, 서로 다른 모듈을 사용할 수 있음.

10-2-4 크로스 플랫폼 개발을 위한 디자인 패턴

- 주요 디자인 패턴
  - 전략 및 템플릿
    - 크로스 플랫폼에서 가장 유용한 패턴
    - 알고리즘의 공통단계 정의 후, 일부분을 교체하는 방식
  - 어댑터
    - 전체 컴포넌트를 교체할 필요가 있을 때 유용함.
  - 프록시
    - 어댑터와 유사하나, 요청을 전달하는 방식이 다름.
  - 종속성 주입 및 서비스 로케이터
    - 모듈이 주입되는 방식을 변경함.

### 10-3 React 개요

- React는 컴포넌트에 집중하는 라이브러리임.
- 가상 DOM을 활용해 수준 높은 추상화를 구현함.
  - 가상 DOM의 트리 구조로 효율적인 리렌더링을 구현함.
- '한 번 배우고, 어디서나 사용하세요(Learn it once, use it everywhere)'
- 주요 특징
  - 클라이언트와 서버에서 거의 동일한 코드로 컴포넌트를 렌더링 할 수 있음.
  - hydration을 통해 핸들러, 애니메이션 등 효과를 추가할 수 있음.
  - 이를 통해 SPA를 구현 할 수 있음.
    - SPA의 주요 장점
      - 향상된 검색엔진 최적화(?)
      - 성능 향상(체감)

10-3-1 Hello React

- 프로젝트 생성

```bash
npm init -y
npm i webpack webpack-cli
node_modules/.bin/webpack init

npm i react react-dom
```

```javascript
import react from 'react';
import ReactDOM from 'react-dom';

const h = react.createElement;

class Hello extends react.Component {
  render() {
    return h('h1', null [
      'Hello ',
      this.props.name || 'World'
    ])
  }
}

ReactDOM.render(
  h(Hello, { name: 'React' }),
  document.getElementsByTagName('body')[0]
);
```

10-3-2 react.createElement의 대안

- JSX: Javascript XML
  - React에서 사용하는 템플릿 언어
  - Babel을 통해 JSX를 React.createElement로 변환함.
  - JSX의 장점
    - 템플릿 언어를 사용함으로써, 가독성이 향상됨.
    - IDE의 지원을 받을 수 있음.
    - 템플릿 언어를 사용함으로써, 컴포넌트의 구조를 더 명확하게 표현할 수 있음.

```jsx
import react from 'react';
import ReactDOM from 'react-dom';

class Hello extends react.Component {
  render() {
    return <h1>Hello {this.props.name || 'World'}</h1>
  }
}

ReactDOM.render(
  <Hello name="React" />,
  document.getElementsByTagName('body')[0]
)
```

10-3-3 상태 저장 컴포넌트

- 상태 저장 컴포넌트: 상태를 저장하고, 이를 통해 렌더링을 수행하는 컴포넌트
- 코드 생략

### 10-4 범용 Javascript 앱 만들기

- 간단한 도서관리 앱을 작성

10-4-1 프론트엔드 전용 앱

- 코드 생략

10-4-2 서버 측 렌더링

- 코드 생략

10-4-3 비동기 데이터 조회

- 대규모 데이터를 다루는 페이지의 경우, 요청받은 페이지를 렌더하기 위한 최소한의 데이터만 동적으로 가져오는 API를 사용해야 함.
- loadData() 등의 함수로 일반화 할 수 있음.

10-4-4 범용 데이터 조회

- two-pass 렌더링
  - 렌더링을 위해 두 번의 패스를 수행하는 방식
  - 통신 비용이 비싸고, 시간이 오래 걸릴 수 있음.
  - 솔직히 왜 소개하는지도 모르겠다.

- 비동기 페이지
  - 애플리케이션의 구조를 제한하여, 렌더링을 위한 최소한의 데이터만 가져오는 방식
  - 말단의 페이지 컴포넌트가 전체의 룩앤필을 모두 담당함.
  - 추상화를 통해 코드의 중복을 최소화 할 수 있음.

## Chapter 11. 고급 레시피

- 주요개념
  - 비동기적으로 초기화되는 컴포넌트 처리
  - 비동기식요청 일괄 처리 및 캐싱
  - 비동기 작업 취소
  - CPU 바운드 작업의 취소

### 11-1 비동기적으로 초기화되는 컴포넌트 다루기

- Node.js의 많은 모듈에 동기 API가 존재하는 이유는, 초기화 작업에 사용하기 매우 편리하기 때문임.
- 그러나 초기화 단계에서 네트워크 통신이나, 파일 시스템 접근 등의 작업을 수행하는 경우, 동기 API를 사용하기 어려울 수 있음.

11-1-1 비동기적으로 초기화된 컴포넌트의 문제

- db 모듈을 통해 문제점을 확인 해 볼 수 있음.
- 일반적으로 db모듈의 경우, 초기화(db와 연결) 전에는 쿼리등 명령을 실행 할 수 없음.

```javascript
// db.js
import { EventEmitter } from 'events';

class DB extends EventEmitter {
  connected = false;

  connect() +
  // 연결 지연 모킹
  setTimeout(() => {
    this.connected = true;
    this.emit('connected');
  }, 500);
}

async query(queryString) {
  if (!this.connected) {
    throw new Error('Not connected yet');
  }
  console.log(`Query: ${queryString}`);
}

export const db = new DB();
```

- 이런 문제점에 대한 두 가지 간단한 해결책이 존재함.
  - 로컬 초기화
  - 지연 시작

- 로컬 초기화
  - 매 요청에서 API가 호출되기 전에 모듈이 초기화되었는지 확인

  ```javascript
  import { once } from 'event';
  import { db } from './db.js';

  db.connect();

  async function updateLastAccess() {
    if (!db.connected) {
      await once(db, 'connected');
    }
    await db.query(`INSERT (${Date.now()}) INTO "LastAccess"`);
  }

  updateLastAccess();
  setTimeout(() => {
    updateLastAccess();
  }, 600)
  ```

  - query() 함수를 호출 할 때 마다 컴포넌트가 초기화 되었는지, 즉 db가 연결되었는지 확인해야 함.
  - 이를 다소 변형한 것이, query() 함수 자체에서 연결 여부를 확인하는 것으로, 이렇게 하면 사용자가 아닌 라이브러리 제작자가 이를 대신 처리하는 형태임.

- 지연 시작
  - 컴포넌트가 초기화 될 때 까지 의존하는 다른 컴포넌트의 실행을 지연시키는 것.

  ```javascript
  import { once } from 'event';
  import { db } from './db.js';

  async function initialize() {
    db.connect();
    await once(db, 'connected');
  }

  async function updateLastAccess() {
    await db.query(`INSERT (${Date.now()}) INTO "LastAccess"`);
  }

  initialize()
    .then(() => {
      updateLastAccess();
      setTimeout(() => {
        updateLastAccess();
      }, 600);
    })
  ```

  - 가장 큰 단점은, db처럼 비동기적으로 초기화되는 컴포넌트를 사용하는, 다른 컴포넌트를 모두 알고있어야 한다는 점임.
  - 이를 막는 또다른 방법은, 모든 프로그램의 시작을 해당 시간만큼 지연시키는것임.
    - 이는 간단한 방법이지만 전체 프로그램의 속도를 고려하지 않은 방법임.
    - 또한 다시 초기화를 수행해야 하는 경우를 고려하고 있지 않음.

11-1-2 사전 초기화 큐

- 컴포넌트가 초기화된 이후에만 서비스가 시작되어야 하는 경우, 이를 위한 큐를 만들 수 있음.

```javascript
import { EventEmitter } from 'events';

class DB extends EventEmitter {
  connected = false;
  commandQueue = [];

  async query(queryString) {
    if (!this.connected) {
      console.log(`Request queued: ${queryString}`);

      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString)
            .then(resolve, reject);
        }
        this.commandQueue.push(command);
      })
    }
  console.log(`Queue executed: ${queryString}`);
  }

  connect() {
    // 연결 지연 모킹
    setTimeout(() => {
      this.connected = true;
      this.emit('connected');
      this.commandQueue.forEach(command => command());
      this.commandQueue = [];
    }, 500);
  }
}

export const db = new DB();
```

- 위의 코드를 상태 패턴을 통해서 좀 더 고도화 할 수 있음.
  - 초기화 이후: 초기화 여부에 관계없이 비즈니스 로직 구현
  - 초기화 이전: 호출된 함수를 큐에 저장 / 초기화 시 모두 실행

```javascript
// initialized state
class InitializedState {
  async query(queryString) {
    console.log(`Query executed: ${queryString}`);
  }
}
```

```javascript
// queuing state
const METHODS_REQUIRING_CONNECTION = ['query'];
const deactivate = Symbol('deactivate');

class QueuingState {
  constructor(db) {
    this.db = db;
    this.commandsQueue = [];

    // this.state.query()(=queue.query()) 등의 함수를 생성
    METHODS_REQUIRING_CONNECTION.forEach(methodName => {
      this[methodName] = function(...args) {
        console.log(`Command queued: ${methodName, args}`);
        return new Promise((resolve, reject) => {
          const command = () => {
            db[methodName](...args)
              .then(resolve, reject);
          }
          this.commandsQueue.push(command);
        })
      }
    })
  }

  [deactivate]() {
    this.commandsQueue.forEach(command => command());
    this.commandsQueue = [];
  }
}
```

```javascript
// db.js
class DB extends EventEmitter {
  constructor() {
    super();
    this.state = new QueuingState(this);
  }

  async query(queryString) {
    return this.state.query(queryString);
  }

  connect() {
    setTimeout(() => {
      this.connected = true;
      this.emit('connected');
      const oldState = this.state;
      this.state = new InitializedState();
      oldState[deactivate] && oldState[deactivate]();
    }, 500);
  }
}

export const db = new DB();
```

- 이러한 방법을 통해, 초기화 검사에 신경 쓸 필요 없이 비즈니스 로직을 구현할 수 있음.

11-1-3 실전에서

- Mongoose 드라이버가 이러한 방식으로 구현되어 있음.
  - 따라서 몽구스 사용시에는 connection을 기다릴 필요 없이 바로 쿼리를 사용 할 수 있음.
- PostreSQL 드라이버도 비슷한 방식이지만, 조금 다른 방식으로 구현되어있음.

### 11-2 비동기식 요청 일과 처리 및 캐싱

11-2-1 비동기식 요청 일괄 처리란?

- 이미 요청이 처리중에 새로운 요청이 들어오면, 새로운 요청을 생성하는 대신 이미 실행중인 작업에 피기백(piggyback)하는 것을 의미함.
  - 피기백(piggyback): 네트워크 통신에서 이미 전송중인 패킷에 추가적인 정보를 담아 전송하는 것을 의미함.
- 이는 복잡한 캐싱 로직을 구현하지 않아도 되며, 불필요한 요청을 줄일 수 있음.

11-2-2 최적의 비동기 요청 캐싱

- 작업 소요시간이 짧거나, 요청이 많이 발생하지 않는 경우에는 일괄 처리가 효과적이지 않음.
- 이러한 경우에는 공격적인 캐싱을 통해 성능을 향상 시킬 수 있음.
- 최적의 비동기 캐싱 알고리즘의 두 단계
  - 캐시 설정되지 않은 요청들은 일괄 처리 / 캐시 설정
  - 캐시 설정 후에는 캐시된 데이터 사용
- 이 과정에서 3장(Zalgo)에서 다룬 내용에 다시 주의해야 함.
  - 동기와 비동기가 혼재된 코드는 가독성이 떨어지고, 버그가 발생하기 쉬움.
  - 따라서 캐시된 값이더라도 동일하게 비동기로 반환해야 함.

11-2-3 캐싱 혹은 일괄 처리가 없는 API서버

- '특정 유형의 상품에 대한 거래 내역의 합계를 반환하는 서버'를 구현하는 예제

```javascript
// totalSales.js
import level from 'level';
import sublevel from 'subleveldown';

const db = level('example-db');
const salesDb = sublevel(db, 'sales', { valueEncoding: 'json' });

export async function totalSales(product) {
  const now = Date.now();
  let sum = 0;
  for await (const transaction of salesDb.createValueStream()) {
    if (!product || transaction.product === product) {
      sum += transaction.amount;
    }
  }

  console.log(`totalSales() took: ${Date.now() - now}ms`);

  return sum;
}
```

```javascript
// server.js
import { createServer } from 'http';
import { totalSales } from './totalSales.js';

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  const product = url.searchParams.get('product');
  console.log(`Processing query: ${url.search})`);

  const sum = await totalSales(product);
  res.setHeader(`Content-Type`, `application/json`);
  res.writeHead(200);
  res.end(JSON.stringify({
    product,
    sum,
  }))
}).listen(8000, () => console.log('Server started'));
```

```javascript
// populateDb.js
import level from 'level'
import sublevel from 'subleveldown'
import nanoid from 'nanoid'

const db = level('example-db')
const salesDb = sublevel(db, 'sales', { valueEncoding: 'json' })
const products = ['book', 'game', 'app', 'song', 'movie']

async function populate () {
  for (let i = 0; i < 100000; i++) {
    await salesDb.put(nanoid(), {
      amount: Math.ceil(Math.random() * 100),
      product: products[Math.floor(Math.random() * 5)]
    })
  }

  console.log('DB populated')
}

populate()
```

```javascript
// loadTest.js
import superagent from 'superagent'

const start = Date.now()
let count = 20
let pending = count
const interval = 200
const query = process.argv[2] ? process.argv[2] : 'product=book'

function sendRequest () {
  superagent.get(`http://localhost:8000?${query}`)
    .then(result => {
      console.log(result.status, result.body)
      if (!--pending) {
        console.log(`All completed in: ${Date.now() - start}ms`)
      }
    })

  if (--count) {
    setTimeout(sendRequest, interval)
  }
}

sendRequest()
```

11-2-4 Promises를 사용한 일괄 처리 및 캐싱

- 프로미스는 비동기 일괄 처리와 요청 캐싱을 구현하는 매우 유용한 도구임.
  - 여러 then()을 동일한 리스너에 연결 할 수 있음.
  - then() 리스너는 한 번의 호출이 보장되며, 연속적으로 연결되어 있을 때에도 동작함.
  - 또한 무조건 비동기적으로 호출됨.

- 배치 처리 코드

  ```javascript
  import { totalSales as totalSalesRaw } from './totalSales.js';

  const runningRequests = new Map();

  export function totalSales(product) {
    if (runningRequests.has(product) { // 이미 요청이 실행중인 경우
      console.log('Batching')
      return runningRequests.get(product); // 해당 프로미스를 반환
    })

    const resultPromise = totalSalesRaw(product); // 요청이 없는 경우, 새로운 프로미스 생성
    runningRequest.set(product, resultPromise);
    resultPromise.finally(() => { // 프로미스가 완료되면, 맵에서 제거
      runningRequests.delete(product);
    })

    return resultPromise;
  }
  ```

  - 이 방법의 중요한 점은, 캐시 무효화 전략에 대해 전혀 고민하지 않아도 된다는점임.
    - 캐시 무효화는 이전부터 많은 문제를 야기해왔음.

- 캐싱 처리 코드

  ```javascript
  import { totalSales as totalSalesRaw } from './totalSales.js';

  const CACHE_TTL = 30 * 1000; // 30초
  const cache = new Map();

  export function totalSales(product) {
    if (cache.has(product)) { // 캐시에 이미 존재하는 경우
      console.log('Cache hit');
      return cache.get(product);
    }

    const resultPromise = totalSalesRaw(product);
    cache.set(product, resultPromise); // 캐시에 저장
    resultPromise.then(() => {
      setTimeout(() => { // 캐시 무효화, 30초 후에 캐시에서 제거
        cache.delete(product); 
      }, CACHE_TTL);
    }, err => { // 에러 발생시 캐시에서 제거
      cache.delete(product);
      throw err;
    })
    return resultPromise;
  }
  ```

- 캐싱 메커니즘 구현에 대한 참고사항
  - 캐시값이 많으면 메모리 낭비가 심함.
  - 여러 인스턴스 사이의 캐시 동기화 문제가 발생할 수 있음.
    - 레디스, 멤캐시드 등의 외부 캐시 서버를 사용하는 것이 좋음.
  - TTL이 아닌, 수동 무효화 방법은 최신 데이터를 제공 할 수 있지만 관리가 어려움.

### 11-3 비동기 작업 취소

11-3-1 취소 가능한 함수를 만들기 위한 기본 레시피

- 모든 비동기 호출 후에, 취소 요청여부가 확인되면 해당 작업을 조기에 종료.
- 구현을 위해 추가되는 코드가 매우 많아, 가독성이 떨어짐.

```javascript
import { asyncRoutine } from './asyncRoutine.js';
import { CancelError } from './CancelError.js';

async function cancelable(cancelObj) {
  const resA = await asyncRoutine('A');
  console.log(resA);
  if (cancelObj.cancelled) {
    throw new CancelError();
  }

  const resB = await asyncRoutine('B');
  console.log(resB);
  if (cancelObj.cancelled) {
    throw new CancelError();
  }

  const resC = await asyncRoutine('C');
  console.log(resC);
}

// use
const cancelObj = { cancelled: false };
cancelable(calcelObj)
  .catch(err => {
    if (err instanceof CancelError) {
      console.log('Cancelled');
    } else {
      console.log('Error', err);
    }
  })

setTimeout(() => {
  cancelObj.cancelled = true;
}, 100);
```

11-3-2 비동기 호출 래핑

- 비동기 루틴을 호출하는 래핑함수 내부에 취소 로직을 포함하는 방법
- 훨씬 읽기 쉽고 간결해짐.
- 그러나 매 함수를 래핑해야 하기에, 코드가 중복될 수 있고 누락될 수 있음.
- 또한 적지만 여전히 가독성에 영향을 끼침.

```javascript
import { CancelError } from './CancelError.js';

export function createCancelWrapper() {
  let cancelRequested = false;

  function cancel() {
    cancelRequested = true;
  }

  function cancelWrapper(func, ...args) {
    if (cancelRequested) {
      return Promise.reject(new CancelError());
    }
    return func(...args);
  }

  return { cancelWrapper, cancel };
}

// use
import { asyncRoutine } from './asyncRoutine.js';
import { createCancelWrapper } from './createCancelWrapper.js';
import { CancelError } from './CancelError.js';

async function cancelable(cancelWrapper) {
  const resA = await cancelWrapper(asyncRoutine, 'A');
  console.log(resA);
  const resB = await cancelWrapper(asyncRoutine, 'B');
  console.log(resB);
  const resC = await cancelWrapper(asyncRoutine, 'C');
  console.log(resC);
}

const { cancelWrapper, cancel } = createCancelWrapper();

cancelable(cancelWrapper)
  .catch(err => {
    if (err instanceof CancelError) {
      console.log('Cancelled');
    } else {
      console.log('Error', err);
    }
  })

setTimeout(() => {
  cancel();
}, 100);
```

11-3-3 제너레이터를 사용한 취소 가능한 비동기 함수

- 함수의 비동기 흐름을 제어하는 수퍼바이저를 작성 할 수 있음.

```javascript
import { CancelError } from './CancelError.js';

export function createAsyncCancelable(geneatorFunction) {
  return function asyncCancelable(...args) {
    const generatorObject = generatorFunction(...args) // 제너레이터 객체 생성
    let cancelRequested = false;

    function cancel() {
      cancelRequested = true;
    }

    const promise = new Promise((resolve, reject) => {
      async function nextStep(prevResult) { // 제너레이터 객체의 next()를 호출하는 함수
        if (cancelRequested) {
          return reject(new CancelError());
        }

        if (prevResult.done) {
          return resolve(prevResult.value);
        }

        try { // 제너레이터 객체의 next()를 호출하고, 결과를 받아옴.
          nextStep(generatorObject.next(await prevResult.value));
        } catch (err) {
          try {
            nextStep(generatorObject.throw(err));
          } catch (err) {
            reject(err);
          }
        }
      }
      nextStep(generatorObject.next());
    })

    return { promise, cancel }; // 취소 가능한 프로미스 반환
  }

  // use
  import { asyncRoutine } from './asyncRoutine.js';
  import { createAsyncCancelable } from './createAsyncCancelable.js';
  import { CancelError } from './CancelError.js';

  const cancelable = createAsyncCancelable(function*() {
    const resA = yield asyncRoutine('A');
    console.log(resA);
    const resB = yield asyncRoutine('B');
    console.log(resB);
    const resC = yield asyncRoutine('C');
    console.log(resC);
  });

  const { promise, cancel } = cancelable();
  promise.catch(err => {
    if (err instanceof CancelError) {
     console.log('Function canceled'); 
    } else {
      console.error(err);
    }
  })

  setTimeout(() => {
    cancel();
  }, 100);
}
```

### 10-4 CPU 바운드 작업의 실행

- 위에서 다룬 totalScale() 함수는 CPU 바운드 작업이 아님.
  - 비동기 작업을 호출하면 스택이 항상 이벤트 루프로 다시 돌아가 다른 요청을 처리 할 수 있으므로, CPU 바운드 작업이 아님.
- 이와 달리 동기 작업을 싱행하는 경우, 즉 CPU 바인딩된 작업은 제어권을 다른 요청에게 넘기지 않으므로, 이벤트 루프가 블로킹됨.
  - 동기 작업의 예시: 파일 IO, 압축, 암호화, 해시 등

10-4-1 부분집합 합계 문제 풀기

- CPU 바인딩된 작업의 예시로, 조합(Combination) 알고리즘을 사용할 것임.
  - 공집합이 아닌 부분집합 중 합이 0인 부분집합을 찾는 문제

```javascript
// subsetSum.js
export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
    this.totalSubsets = 0;
  }

  _combine(set, subset) { // 조합 알고리즘
    for (let i = 0; i < set.length; i++) {
      const newSubset = subset.concat(set[i]); 
      this._combine(set.slice(i + 1), newSubset);
      this._processSubset(newSubset);
    }
  }

  _processSubset(subset) {
    console.log('Subset', ++this.totalSubsets, subset);
    const res = subset.reduce((prev, item) => (prev + item), 0);
    if (res === this.sum) {
      this.emit('match', subset);
    }
  }

  start() {
    this._combine(this.set, []); // 동기 작업
    this.emit('end');
  }
}
```

```javascript
// index.js
import { createServer } from 'http';
import { SubsetSum } from './subsetSum.js';

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  if (url.pathname !== '/subsetSum') {
    res.writeHead(200);
    return res.end('I\'m alive!\n');
  }

  const data = JSON.parse(url.searchParams.get('data'));
  const sum = JSON.parse(url.searchParams.get('sum'));
  res.writeHead(200);
  const subsetSum = new SubsetSum(sum, data);
  subsetSum.on('match', match => {
    res.write(`Match: ${JSON.stringify(match)}\n`);
  })
  subsetSum.on('end', () => res.end());
  subsetSum.start();
}).listen(8000, () => console.log('Server started'));
```

```zsh
node index.js

curl -G http://localhost:8000/subsetSum --data-urlencode "data=[16, 19, 1, 1, -16, 9, 1, -5, -2, 17, -15, -97, 19, -16, -4, -5, 15]" --data-urlencode "sum=0"

curl -G http://localhost:8000 # 한동안 응답 없음
```

- 첫 번째 요청이 완료될 때 까지 두 번째 요청은 응답을 받지 못함.
- 이러한 노드의 단일 스레드 문제를 해결하기 위해 다음과 같은 세가지 방법이 존재함.
  - 인터리빙
  - 외부 프로세스 사용
  - 워커 스레드 사용

11-4-2 setImmediate를 사용한 인터리빙

- CPU 바인딩 알고리즘은 일반적으로 여러 페이즈를 가짐.
- 결과적으로 각 페이즈가 종료되거나, 특정 횟수만큼 실행된 후 이벤트 루프에 제어권을 넘기는 것.

```javascript
// subsetSumDefer.js
// ... 기타 코드
_combineInterleaved(set, subset) {
  this.runningCombine++;
  setImmediate(() => {
    this._combine(set, subset);
    if (--this.runningCombine === 0) {
      this.emit('end');
    }
  })
}
```

- 그러나 이 방법에서는, setImmediate()를 사용해서 비동기적으로 _combine을 호출하기에, 모든 조합이 완료된 시기를 알기가 어려움.
- 이를 위해서는 _combine()을 실행하는 모든 인스턴스의 결과를 추적해야 함.
- 이를 위해 runningCombine 변수를 사용함.

```javascript
_combine(set, subset) {
  for (let i = 0; i < set.length; i++) {
    const newSubset = subset.concat(set[i]);
    this._combineInterleaved(set.slice(i + 1), newSubset);
    this._processSubset(newSubset);
  }
}

start() {
  this.runningCombine = 0;
  this._combineInterleaved(this.set, []);
}
```

- 위와 동일한 커맨드를 사용해서, 시간을 측정 해 보면, 거의 요청 즉시 "I'm alive!"가 출력됨.
- 고려사항
  - setImmediate()를 사용하면, 이벤트 루프가 블로킹되지 않음. 다만 오버헤드가 발생함.
  - 각 페이즈가 오래 걸리는 경우, 인터리빙은 원활하게 동작하지 않음.
  - 즉, 한 페이즈가 지나치게 오래걸리지 않고, 오버헤드를 감수할 수 있는 경우에는 꽤나 좋은 방법이 될 수 있음
- 참고사항
  - setImmediate()가 아닌 nextTick()은 장기 실행 작업을 인터리브 할 수 없음.
  - 이는 nextTick()이 대기중인 IO 이전에 작없을 예약하기 때문으로, 이를 다수 호출시 IO부족으로 에러가 발생함.

11-4-3 외부 프로세스의 사용

- 외부 프로세스를 사용하는 방법은, 노드의 단일 스레드 문제를 해결하는 가장 유용한 방법임.
  - 인터리브 할 필요 없이, 단일 스레드에서 최고의 성능을 발휘할 수 있음.
  - 수정이 쉽고, 작업 소요가 적음
  - 필요 시 저수준의 언어를 사용해서 더욱 빠른 코드를 작성할 수 있음.
- child_process.fork()함수 덕분에 매우 쉽게 외부 프로세스를 생성 할 수 있음.
  - 이 함수는 자식 프로세스의 표준 입출력을 통해 통신할 수 있는 IPC 채널을 생성함.
  - 이를 통해 자식 프로세스와 통신하고, 종료를 감지 할 수 있음.
- 이를 활용한 subsetSum의 리팩토링 예시

  ```javascript
  // processPool.js
  import { fork } from 'child_process';

  export class ProcessPool {
    constructor(file, poolMax) {
      this.file = file;
      this.poolMax = poolMax;
      this.pool = []; // 준비된 프로세스 집합
      this.active = []; // 현재 작업중인 프로세스 집합
      this.waiting = []; // 실행 대기중인 작업 집합
    }

    acquire() {
      return new Promise((resolve, reject) => {
        let worker;
        if (this.pool.length > 0) { // 준비된 프로세스가 있는 경우
          worker = this.pool.pop();
          this.active.push(worker); // 현재 작업중인 프로세스에 추가
          return resolve(worker);   // 프로미스 반환
        }

        if (this.active.length >= this.poolMax) { // 최대 프로세스 개수를 초과한 경우
          return this.waiting.push({ resolve, reject }); // 대기중인 작업에 추가
        }

        worker = fork(this.file);   // 준비된 프로세스가 없지만, 최대 개수를 초과하지 않은 경우 새로운 프로세스 생성
        worker.once('message', message => { // 리스너 등록하고 프로세스 반환
          if (message === 'ready') {
            this.active.push(worker);
            return resolve(worker);
          }
          worker.kill();
          reject(new Error('Improper precess start'));
        })
        worker.once('exit', code => { // 프로세스가 종료되면, 종료 코드를 출력하고, 작업중인 프로세스, 대기중인 프로세스에서 제거
          console.log(`Worker exited with code ${code}`);
          this.active = this.active.filter(w => worker !== w);
          this.pool = this.pool.filter(w => worker !== w);
        })
      })
    }

    release(worker) {
      if (this.waiting.length > 0) { // 실행 대기중인 작업이 있는 경우
        const { resolve } = this.waiting.shift();
        return resolve(worker);
      }
      this.active = this.active.filter(w => worker !== w); // 대기중인 작업이 없는 경우, 작업중인 프로세스에서 제거하고, 준비된 프로세스에 추가
      this.pool.push(worker);
    }
  }
  ```

  - worker는 중지되지 않고 재할당되므로 시간을 절약 할 수 있음.
  - 그러나 어플리케이션의 목표에 따라, 장기 미사용 시 프로세스를 종료하는 것이 더 효율적일 수 있음.
  - 또한 응답하지 않거나 충돌한 프로세스를 감지하고, 이를 종료하는 로직이 필요함.

  ```javascript
  // subsetSumFork.js
  import { EventEmitter } from 'events';
  import { dirname, join } from 'path';
  import { fileURLToPath } from 'url';
  import { ProcessPool } from './processPool.js';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const workerFile = join(__dirname, 'workers', 'subsetSumProcessWorker.js');
  const workers = new ProcessPool(workerFile, 2);

  export class SubsetSum extends EventEmitter {
    constructor(sum, set) {
      super();
      this.sum = sum;
      this.set = set;
    }

    async start() {
      const worker = await workers.acquire(); // 프로세스 풀에서 프로세스를 가져옴
      worker.send({ sum: this.sum, set: this.set }); // send()는 fork()를 통해 생성된 프로세스에 자동으로 할당된 메서드임.
      const onMessage = msg => {
        if (msg.event === 'end') { // 종료 이벤트가 발생한 경우
          worker.removeListener('message', onMessage);
          workers.release(worker);
        }

        this.emit(msg.event, msg.data);
      }

      worker.on('message', onMessage); // 메시지 리스너 등록
    }
  }
  ```

  - 실제 작업을 수행하는 subsetSumProcessWorker.js 구현.

  ```javascript
  import { SubsetSum } from '../subsetSum.js';

  process.on('message', msg => {
    const subsetSum = new SubsetSum(msg.sum, msg.set);

    subsetSum.on('match', data => {
      process.send({ event: 'match', data });
    })

    subsetSum.on('end', data => {
      process.send({ event: 'end', data });
    })

    subsetSum.start();
  })

  process.send('ready');
  ```

  - 최초에 작성한 동기식 subsetSum.js을 그대로 사용하고 있음
    - 독립된 스레드이기에 문제 없음.
  - 다만 자식 프로세스가 다른 언어로 작성된 작업인 경우, 통신을 별도로 구현해주어야 함.
  - 최초 프로그램과 같은 방식으로 실행 해 보면, "I'm alive!"가 출력되고, 다른 요청도 즉시 응답을 받음.
  - 두번 실행해도 마찬가지로, "I'm alive!"가 출력되고, 다른 요청도 즉시 응답을 받음.
  - 그러나 세번 실행하는 경우에는 세 번째 작업이 진행되지 않음.
    - 이는 프로세스 풀의 최대 개수가 2개이기 때문임.

11-4-4 작업자 스레드(worker threads) 사용

- Node.js 10.5.0부터 워커 스레드가 추가되었음.
- 워커 스레드는 child_process.fork()에 대한 보다 가벼운 대안임.
- 기본 프로세스 내에서 실행되지만, 별도의 스레드에서 실행되므로, 메모리 공간이 더 작고 시작 시간이 빠름.
- 그러나 다른 언어와 달리 심층 동기화 및 공유 기능을 지원하지 않음.
  - 심층 동기화(deep synchronization): 경쟁조건, 무결성 손실 등의 문제를 해결하기 위한 동기화 기능. 뮤텍스, 세마포어 등
- 기본적으로 워커 스레드는 메인 스레드와 동일한 메모리 공간을 공유하지 않음.
- 따라서 메인 스레드와의 통신은 다른 방법으로 구현해야 함.
  - 메시지 기반 통신 채널
  - ArrayBuffer 객체의 전송
  - SharedArrayBuffer 객체의 사용
- SubsetSum 예제에 적용

  ```javascript
  // subsetSumWorker.js
  import { Worker } from 'worker_threads';

  // ProcessPool.js 와 유사
  export class ThreadPool {
    // ...
    acquire() {
      return new Promise((resolve, reject) => {
        let worker;
        if (this.pool.length > 0) {
          worker = this.pool.pop();
          return resolve(worker);
        }

        if (this.active.length >= this.poolMax) {
          return this.waiting.push({ resolve, reject });
        }
        worker = new Worker(this.file);
        worker.once('online', () => {
          this.active.push(worker);
          resolve(worker);
        })
        worker.once('exit', code => {
          console.log(`Worker exited with code ${code}`);
          this.active = this.active.filter(w => worker !== w);
          this.pool = this.pool.filter(w => worker !== w);
        })
      })
    }
    // ...
  }
  ```

  ```javascript
  // subsetSumThreadWorker.js
  import { parentPort } from 'worker_threads';
  import { SubsetSum } from '../subsetSum.js';

  parentPort.on('message', msg => {
    const subsetSum = new SubsetSum(msg.sum, msg.set);

    subsetSum.on('match', data => {
      parentPort.postMessage({ event: 'match', data });
    })

    subsetSum.on('end', data => {
      parentPort.postMessage({ event: 'end', data });
    })

    subsetSum.start();
  })
  ```

  ```javascript
  import { EventEmitter } from 'events';
  import { dirname, join } from 'path';
  import { fileURLToPath } from 'url';
  import { ThreadPool } from './threadPool.js';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const workerFile = join(__dirname, 'workers', 'subsetSumThreadWorker.js');
  const workers = new ThreadPool(workerFile, 2);

  export class SubsetSum extends EventEmitter {
    constructor(sum, set) {
      super();
      this.sum = sum;
      this.set = set;
    }

    async start() {
      const worker = await workers.acquire();
      worker.postMessage({ sum: this.sum, set: this.set });

      const onMessage = msg => {
        if (msg.event === 'end') {
          worker.removeListener('message', onMessage);
          workers.release(worker);
        }

        this.emit(msg.event, msg.data);
      }

      worker.on('message', onMessage);
    }
  }
  ```

11-4-5 운영에서 CPU 바인딩된 태스크의 실행

- 위의 과정을 거치며 CPU 바인딩된 작업을 실행하는 방법에 대해 알아봄.
- 다만, 위 방법들은 아이디어를 제공 할 뿐 실제 사용하기엔 각종 에러처리와 테스트가 필요함.
- 따라서 실제 업무에는 보다 검증된 라이브러리를 사용하는 것이 좋음.

### Chapter 11 요약

- 생략
