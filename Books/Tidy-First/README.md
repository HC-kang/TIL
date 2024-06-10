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

### Chapter05 읽는 순서

### Chapter06 응집도를 높이는 배치

### Chapter07 선언과 초기화를 함께 옮기기

### Chapter08 설명하는 변수

### Chapter09 설명하는 상수

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
