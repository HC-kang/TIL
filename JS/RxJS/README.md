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

- 시간을 축으로 연속된 데이터를 저장하는 컬렉션 객체
- 스트림이라고도 한다.
- 네이밍 컨벤션으로 맨 뒤에 `$`를 붙인다.

### 2. Operator

- Observable을 생성, 변환, 필터링, 결합, 분리 등 조작하는 함수
- 오퍼레이터는 항상 새로운 Observable 인스턴스를 반환한다.

### 3. Observer

- Observable을 통해 전달된 데이터를 소비하는 객체.
- Observable의 `subscribe` 메서드를 통해 등록한다.
- `next`, `error`, `complete` 메서드를 구현한다.
  - 이는 각각 다음 데이터, 에러 상태, 완료를 의미한다.

### 4. Subscription

- Observable.prototype.subscribe의 리턴값
- 자원의 해제를 위해 사용한다.

## Observable

- Observable을 생성하는 세 가지 방법
  - `new Observable()`

    ```js
    const { Observable } = rxjs;
    const numbers$ = new Observable(function subscribe(observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
    });
    numbers$.subscribe(x => console.log(x));
    ```

  - `Observable.create()`

    ```js
    const { Observable } = rxjs;
    const numbers$ = Observable.create(function subscribe(observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
    });
    numbers$.subscribe(x => console.log(x));
    ```

  - rxjs의 생성 함수 사용
    - of
    - range
    - fromEvent
    - from
    - interval

    ```js
    const { of } = rxjs;
    const numbers$ = of(1, 2, 3);
    numbers$.subscribe(x => console.log(x));
    ```

- Observable 구현 시 고려해야 할 것들
  - 에러 처리
  - 완료 처리
  - 구독 해제

- 특별한 용도의 Observable
  - empty: 데이터를 발행하지 않고 완료만 발생시키는 Observable

    ```js
    // 구현
    Observable.create(function subscribe(observer) {
      observer.complete();
    });

    // 사용
    of(1, -2, -3).pipe(
        map(number => number < 0 ? empty() : number)
    )
    .subscribe({
        next: v => console.log(v),
        error: e => console.error(e),
        complete: () => console.log('complete')
    })
    ```

  - throwError: 에러만 발생시키는 Observable

    ```js
    // 구현
    Observable.create(function subscribe(observer) {
      observer.error(new Error('error'));
    });

    // 사용
    of(1, -2, -3).pipe(
        map(number => number < 0 ? throwError('error') : number)
    )
    .subscribe({
        next: v => console.log(v),
        error: e => console.error(e),
        complete: () => console.log('complete')
    })
    ```

  - never: 아무것도 발행하지 않는 Observable

    ```js
    // 구현
    Observable.create(function subscribe(observer) {
      // 아무것도 하지 않는다.
    });

    // 사용
    of(1, -2, -3).pipe(
        map(number => number < 0 ? never() : number)
    )
    .subscribe({
        next: v => console.log(v),
        error: e => console.error(e),
        complete: () => console.log('complete')
    })
    ```

## Operator
