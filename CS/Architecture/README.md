# 아키텍처 기본

## Layered Architecture

- Input과 Output 사이에 여러 개의 Layer를 두어 활용하는 것.
  - Presentation Layer
  - Business Layer
  - Persistence Layer
  - Data Access Layer
- 각각의 레이어는 자신의 하위 레이어에만 의존해야 한다.
- 대부분의 레이어는 각각 닫혀있어야 한다.
  - Presentation Layer는 외부에서 접근할 수 있어야 한다.
  - Persistence Layer는 외부에서 접근할 수 없어야 한다.
- 다만, 싱크홀 패턴이 지나치게 많이(20% 초과) 발생하는 경우, 계층을 개방하는 것도 선택지로 가능하다.
- 소규모일 때 구조가 단순하여 유지보수가 쉬워, 간단한 프로젝트에 적합하다.
- 그러나 규모가 커질수록 각 레이어 간의 의존성이 복잡해지고, 레이어 간의 의존성이 높아지면서 유지보수가 어려워진다.

## Clean Architecture

- 비즈니스 로직을 중심에 두고, 외부 요소들을 레이어 형태로 감싸는 것.
- 의존성 방향은 중(위에서 아래) 방향으로 향함
  - 웹, 디바이스, UI, DB..
  - Controller, Presenter, Gateway..
  - UseCase
  - Entities
- 테스트 용이성이 높고 유연성, 확장성이 높다.
- 그러나, 구조가 복잡하여 초기 구축 비용이 높다.

## Hexagonal Architecture

- 어플리케이션의 여러 포트를 통해 외부와 소통하는 어댑터의 집합으로 설명
  - Application Core
  - Ports
  - Adapters
- 외부 요소와 결합도가 낮아 테스트와 유지보수가 쉬움.
- 다른 데이터 소스나 UI로 전환을 할 수 있음.
- 그러나, 구조가 복잡하여 초기 구축 비용이 높다.
- 개념적으로 복잡하고 오버 엔지니어링이 될 수 있음.
