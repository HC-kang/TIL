# Detecting memory leaks in nodejs and V8

## V8 garbage collector

- 가비지 콜렉터란?
  - In Computer Science, garbage collection (GC) is a form of automatic memory management. The garbage collector attempts to reclaim memory which was allocated by the program, but is no longer referenced

- 가비지 콜랙터의 책임
  - GC가 관리하는 것
    - objects
    - array
    - primitives
    - closures
    - function

  - GC가 관리하지 않는 것
    - Resources other than memory
    - network sockets
    - database handles
    file and device descriptors

- 가비지 콜렉터의 필수요소

- 가비지 콜렉터의 기본 원칙
  - GC는 현재 혹은 미래에 사용될 수 없는, 즉 참조되지 않는 데이터 객체를 찾아서 메모리를 해제하는 것이다.

- 가비지 콜렉터의 주기업무
  - Find live/dead objects
  - Recycle/reuse the memory occupied by dead objects
  - Compact/defragment memory(optional)

- 가비지 콜렉터의 장단점
  - 장점
    - 메모리 해제를 생각할 필요가 없다.
    - 메모리를 다루며 발생가능한 수많은 에러를 막아준다.

  - 단점
    - 개발자가 이미 인지하고있더라도 모든 객체에 대한 조사를 해야한다.
    - 메인 스레드를 차지하여 프로그램의 성능을 떨어뜨릴 수 있다.
    - GC가 메모리를 해제하는 시점을 예측할 수 없다.
