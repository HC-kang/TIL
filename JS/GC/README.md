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

- 프로그램 실행시 할당되는 메모리의 종류(Resident Set)
  - Stack
    - 정적 메모리 할당
    - 함수명, 변수명, 매개변수, 리턴값, 지역변수, 함수 호출시 사용되는 정보
    - GC가 아닌 OS가 관리
  - Heap
    - 동적 메모리 할당
    - 7개의 공간으로 나뉨
      - cell space
      - property cell
      - map space
      - young generation
        - Most objects are allocated here. New-space is small and is designed to be garbage collected very quickly. independent of other spaces.
        - from space
        - to space
      - old generation
        - Contains most objects which may have pointers to other objects. Most objects are moved here after surviving in new-space for a while.

- Minor GC: scavenge
  - heap 영역 중 young generation의 메모리를 관리하는 것
  - A generational garbage collection strategy is well suited to an application that creates many short-lived objects. as is typical of many transactional applications.
  - 절차1
    - from space에 있는 객체들을 순회하며 참조가 있는 객체를 찾는다.
    - 참조가 있는 객체를 from space에서 to space로 이동시킨다.
    - to space로 이동한 객체는 생존한 객체로 간주되어 mark된다.
    - to space로 새로운 객체가 생성된다.
    - from space는 비워진다.
    - from space와 to space의 이름을 바꾼다.
  - 절차2
    - from space에 있는 객체들을 순회하며 참조가 있는 객체를 찾는다.
    - mark된 객체가 있다면 이는 생존한 객체로 간주되어 old generation으로 이동시킨다.
    - 그 외 참조가 있는 객체는 to space로 이동시킨다.
    - to space로 새로운 객체가 생성된다.
    - from space는 비워진다.
    - from space와 to space의 이름을 바꾼다.

- Major GC: mark-sweep
  - heap 영역 중 old generation의 메모리를 관리하는 것
  - Major GC in V8 starts with concurrent marking. As the heap approaches a dynamically computed limit, concurrent marking tasks are started. The helpers are each given a number of pointers to follow, and they mark each object they find as they follow all references from discovered objects. Concurrent marking happens entirely in the background while JavaScript is executing on the main thread. Write barriers are used to keep track of new references between objects that JavaScript creates while the helpers are marking concurrently.
  - 절차
    - Marking: The garbage collector identifies which objects are in use and which ones are not. The objects in use or reachable from known roots recursively are marked as alive. It's technically a depth-first-search of the heap which can be considered as a directed graph.

    - Sweeping: The garbage collector traverses the heap and makes note of the memory address of any object that is not marked alive. This space is now marked as free in the free list and can be used to store other objects.

    - Compacting: After sweeping, if required, all the survived objects will be moved to be together. This will decrease fragmentation and increase the performance of allocation of memory to newer objects.

   