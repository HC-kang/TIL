# Builder Pattern

## 정의

- 하위 클래스가 부분객체를 생성하고 디렉터 객체가 조립 절차에 따라 조립하여 복합객체를 생성하는 패턴

## 구성요소

- Builder
  - 객체를 작성하기 위한 인터페이스를 정의한다.
  - 객체의 각 부분을 만들기 위한 추상메서드(buildPard())를 선언한다.
  - 마지막 결과를 얻기 위한 메서드(getResult())를 정의한다.

- Concrete Builder
  - Builder 인터페이스를 구현한다.

- Director
  - Builder 인터페이스를 사용해서 객체를 생성한다.
  - 각 부분을 조립하는 메서드(construct())를 제공한다.

- Client
  - Director 객체를 사용하여 원하는 기능을 수행한다.
