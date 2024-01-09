# RxJS

- 옵저버블 시퀀스를 사용하여 비동기 및 이벤트 기반 프로그램을 작성하기 위한 라이브러리.
- Observable이라는 코어 타입과 위성 타입(Observer, Schedulers, Subjects), Array 메서드에서 영감을 받은 연산자(map, filter, reduce, every 등)를 제공하여 비동기 이벤트를 컬렉션으로 처리할 수 있도록 한다.
- [공식문서](https://rxjs.dev/guide/overview)

## RxJS가 해결하려는 문제

### 1. 입력 데이터의 오류

- 입력 데이터의 전달 시점이 다양하다. (동기, 비동기)

### 2. 상태 전파 문제

- 상태 전파를 위한 커플링 코드가 많아진다.
- 옵저버 패턴의 도입과 한계
  - 발행자와 구독자간 순환참조가 발생 할 수 있다.
  - 에러 처리를 위한 방법이 없다.
  - 상태변화가 종료되는 지점을 알 수 없다.
- RxJS의 해결 방법
  - Observable을 Read-only로 만들어 순환 참조를 방지한다.
  - update(next) 이외에, error, complete 메서드를 통해 에러와 종료를 전달한다.

### 3. 로직 오류

- 변수의 할당
- 반복문과 분기문
- 함수형 프로그래밍

## RxJS의 주요 개념

### 1. Observable

### 2. Operator

### 3. Observer

### 4. Subscription

## Observable

## Operator
