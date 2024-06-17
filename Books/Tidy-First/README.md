# Tidy-First

## Part01 코드 정리법

- 1부는 지저분한 코드 정리를 위한 작은 설계 움직임의 카탈로그임.
  - 즉, 코드 정리에 쓸 수 있는 메뉴판.
- 리팩터링을 적용하는 기간동안은 개발을 멈추는 것이 아님

### Chapter01 보호 구문

- 일종의 얼리 리턴
- `if`문을 사용하여 예외적인 상황을 먼저 처리하고, 그렇지 않은 경우에만 정상적인 코드를 실행하는 방식
- 그러나 너무 많은 보호 구문은 코드를 복잡하게 만들 수 있음
- 예시
  - 원본 코드([dramatiq](https://github.com/Bogdanp/dramatiq) - python library)

    ```py
    if queue_name not in self.queues:
        self.emit_before("declare_queue", queue_name)
        self.queues[queue_name] = Queue()
        self.emit_after("declare_queue", queue_name)
    
        delayed_name = dq_name(queue_name)
        self.queues[delayed_name] = Queue()
        self.delay_queues.add(delayed_name)
        self.emit_after("declare_delay_queue", delayed_name)
    ```

  - 보호 구문 적용

    ```py
    if queue_name in self.queues:   # 보호 구문
        return
    
    self.emit_before("declare_queue", queue_name)
    self.queues[queue_name] = Queue()
    self.emit_after("declare_queue", queue_name)
    
    delayed_name = dq_name(queue_name)
    self.queues[delayed_name] = Queue()
    self.delay_queues.add(delayed_name)
    self.emit_after("declare_delay_queue", delayed_name)
    ```

### Chapter02 안 쓰는 코드

- 안쓰는 코드는 Git에 맡기고, 지우자.
- 버전관리를 하고있다면, 모든 코드는 언제든지 복구 가능하다.
- 최근에는 IDE에도 `timeline` 기능이 강화되어, 이전 코드로 쉽게 돌아갈 수 있다.
  - vscode 기준, 좌측 하단의 `timeline` 버튼을 누르면, 이전 코드로 돌아갈 수 있다.

### Chapter03 대칭으로 맞추기

- 코드를 일관된 형태로 맞추는 것.
  - 코드를 관리하는데에 가장 비싼 비용은 코드를 읽는 것이다.
  - 따라서, 코드 컨벤션이 정말 중요하다.
- 아래와 같이, 같은 코드라도 수많은 방식으로 표현이 가능하다.
  - 이러한 코드는 읽는 사람에게 혼란을 줄 수 있다.
- 예시

  ```go
  foo()
    return foo if foo not nil
    foo := ...
    return foo

  foo()
    if foo is nil
      foo := ...
    return foo

  foo()
    return foo not nil
      ? foo
      : foo := ...
  
  foo()
    return foo := foo not nil
      ? foo
      : ...

  foo()
    return foo := foo || ...
  ```

    - 결과적으로 위 코드들은 모두 같은 의미이지만, 처음 읽는 사람에게는 각각 다른 의도로 보일 수 있다.

### Chapter04 새로운 인터페이스로 기존 루틴 부르기

- 기존 인터페이스를 다루기 어려울 때, 새로운 인터페이스를 만들어 기존 인터페이스를 호출하는 방식을 사용 할 수 있다.
- 이후 새로운 인터페이스를 완성하면 기존 인터페이스를 삭제하고 새로운 인터페이스에 해당 루틴을 구현한다.
- 이와 비슷한 방식
  - 거꾸로 코딩하기: 마지막 부분부터, 마치 이전의 코드가 다 구현되어 있다고 가정하고 코딩하는 방식
  - 테스트 주도 개발: 테스트 부터 작성하고, 그것을 통화하는 코드를 작성한다.
  - 헬퍼 함수 설계: 특정한 작업을 수행해주는 도우미들이 있다면 나머지 작업이 수월해진다.

### Chapter05 읽는 순서

- 독자의 입장이 되어 코드를 작성하자.
  - 읽기 좋은 순서로 코드를 작성하자.
    - 핵심적인 부분을 먼저 작성하고, 그 다음에 세부적인 부분을 작성하자.

### Chapter06 응집도를 높이는 배치

- 하나의 변경사항을 위해 코드의 여러 군데나, 심지어 여러 파일을 수정해야 하는 경우, 코드의 응집도가 낮다고 볼 수 있다.
- 결합도를 제거하기 위한 가치판단 기준
  > 결합도 제거 비용 + 변경 비용 < 결합도에 따른 비용 + 변경 비용

### Chapter07 선언과 초기화를 함께 옮기기

- 선언과 초기화는 가까이에 위치하도록 하자.
  - 이를 기억하는 사소한 것도 읽는 사람에게 부담을 줄 수 있다.

### Chapter08 설명하는 변수

- 인라인에 복잡한 수식이나 표현식이 사용되어있다면, 이를 변수로 추출하여 가독성을 높이자.
  - 변수명을 통해 코드의 의도를 명확히 전달할 수 있다.

- 예시
  - Before

    ```js
    if (a * b + c * d > 100) {
      // do something
    }
    ```

  - After

    ```js
    const isOverLimit = a * b + c * d > 100;
    if (isOverLimit) {
      // do something
    }
    ```

- 이 과정에서도 당연하게도 `코드 정리`와 `동작 변경`을 구분해서 커밋해야 한다.

### Chapter09 설명하는 상수

- 코드에 리터럴 상수가 사용되는 것은 좋지 않다.
  - 매직 넘버를 사용하는 것은 코드를 이해하는데 어려움을 줄 수 있다.

- 예시
  - Before

    ```js
    if (age > 19) {
      // do something
    }
    ```

  - After

    ```js
    const ADULT_AGE = 19;
    const isOverLimit = age > ADULT_AGE;
    if (isOverLimit) {
      // do something
    }
    ```

### Chapter10 명시적인 매개변수

### Chapter11 비슷한 코드끼리

### Chapter12 도우미 추출

### Chapter13 하나의 더미

### Chapter14 설명하는 주석

### Chapter15 불필요한 주석 지우기

## Part02 관리

### Chapter16 코드 정리 구분

### Chapter17 연쇄적인 정리

### Chapter18 코드 정리의 일괄 처리량

### Chapter19 리듬

### Chapter20 얽힘 풀기

### Chapter21 코드 정리 시점

## Part03 이론
