# 단일책임 원칙 (Single responsibility principle)

1. 정의

    - 클래스에는 하나의 책임만 있어야 한다.

2. 원칙 위반시 증상

    - 기능 변경시 연쇄적 코드 수정 필요
    - 복잡한 코드로 인해 재사용이 어려움
    - 메서드의 몸체가 비대해짐

3. 원칙 적용 방법

    - 클래스를 변경하는 이유는 하나이어야 한다는 기준으로 기능을 나눈다

4. 위반 예제

    - ./before/*