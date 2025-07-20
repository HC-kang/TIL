---
title: Head First Design Pattern
date: 2025-04-08
tags: [디자인 패턴, 전략 패턴, 옵저버 패턴, 데코레이터 패턴, 팩토리 패턴, 싱글턴 패턴, 커맨드 패턴, 어댑터 패턴, 퍼사드 패턴, 템플릿 메소드 패턴, 이터레이터 패턴, 컴포지트 패턴, 상태 패턴, 프록시 패턴, MVC 패턴]
alias: [헤드퍼스트 디자인패턴]
---

# Head First Design Pattern

**Building Extensible and Maintainable Object-Oriented Software**
*저자: Eric Freeman, Elisabeth Robson*

> 디자인 패턴은 개발자들이 반복적으로 마주치는 문제들에 대한 검증된 해결책입니다. 코드 재사용이 아닌 경험의 재사용을 통해 더 나은 소프트웨어를 만들 수 있습니다.

## 목차
- [Head First Design Pattern](#head-first-design-pattern)
  - [목차](#목차)
  - [Chapter 1: 전략 패턴 (Strategy Pattern)](#chapter-1-전략-패턴-strategy-pattern)
  - [Chapter 2: 옵저버 패턴 (Observer Pattern)](#chapter-2-옵저버-패턴-observer-pattern)
  - [Chapter 3: 데코레이터 패턴 (Decorator Pattern)](#chapter-3-데코레이터-패턴-decorator-pattern)
  - [Chapter 4: 팩토리 패턴 (Factory Pattern)](#chapter-4-팩토리-패턴-factory-pattern)
  - [Chapter 5: 싱글턴 패턴 (Singleton Pattern)](#chapter-5-싱글턴-패턴-singleton-pattern)
  - [Chapter 6: 커맨드 패턴 (Command Pattern)](#chapter-6-커맨드-패턴-command-pattern)
  - [Chapter 7: 어댑터와 퍼사드 패턴 (Adapter \& Facade Pattern)](#chapter-7-어댑터와-퍼사드-패턴-adapter--facade-pattern)
  - [Chapter 8: 템플릿 메소드 패턴 (Template Method Pattern)](#chapter-8-템플릿-메소드-패턴-template-method-pattern)
  - [Chapter 9: 이터레이터와 컴포지트 패턴 (Iterator \& Composite Pattern)](#chapter-9-이터레이터와-컴포지트-패턴-iterator--composite-pattern)
  - [Chapter 10: 상태 패턴 (State Pattern)](#chapter-10-상태-패턴-state-pattern)
  - [Chapter 11: 프록시 패턴 (Proxy Pattern)](#chapter-11-프록시-패턴-proxy-pattern)
  - [Chapter 12: 복합 패턴 (Compound Pattern)](#chapter-12-복합-패턴-compound-pattern)
  - [Chapter 13: 실전 디자인 패턴](#chapter-13-실전-디자인-패턴)
  - [Chapter 14: 기타 패턴들](#chapter-14-기타-패턴들)
    - [추가 패턴 요약](#추가-패턴-요약)
  - [핵심 정리](#핵심-정리)
    - [OO 기초](#oo-기초)
    - [OO 원칙](#oo-원칙)
    - [패턴 카테고리](#패턴-카테고리)

## Chapter 1: 전략 패턴 (Strategy Pattern)

> [!NOTE]
> ### 전략 패턴 (Strategy Pattern)
> - **정의**: 알고리즘군을 정의하고 캡슐화하여 각 알고리즘군을 수정해서 사용할 수 있도록 한다.
> - **목적**: 알고리즘을 클라이언트와 독립적으로 변경할 수 있도록 한다.
> - **예시**: 오리 시뮬레이터에서 다양한 나는 행동과 울음소리 구현

> [!TIP]
> ### 핵심 디자인 원칙
> 1. **변하는 것과 변하지 않는 것을 분리하라**
>    - 애플리케이션에서 달라지는 부분을 찾아내고, 달라지지 않는 부분과 분리한다.
> 2. **구현이 아닌 인터페이스에 맞춰 프로그래밍하라**
>    - 보다 높은 수준의 추상화 단계에서 사고한다.
> 3. **상속보다는 구성(Composition)을 활용하라**
>    - 런타임에 행동을 변경할 수 있는 유연성을 제공한다.

## Chapter 2: 옵저버 패턴 (Observer Pattern)

> [!NOTE]
> ### 옵저버 패턴 (Observer Pattern)
> - **정의**: 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들에게 연락이 가고 자동으로 내용이 갱신되는 일대다(one-to-many) 의존성을 정의한다.
> - **목적**: 객체들 사이에 느슨한 결합(loose coupling)을 유지
> - **예시**: 날씨 모니터링 시스템, GUI 이벤트 처리, MVC 패턴

> [!TIP]
> ### 디자인 원칙
> **느슨한 결합을 위해 노력하라**
> - Subject는 Observer가 특정 인터페이스를 구현한다는 것만 안다
> - Observer는 언제든지 새로 추가할 수 있다
> - 새로운 형식의 Observer를 추가해도 Subject를 변경할 필요가 없다

## Chapter 3: 데코레이터 패턴 (Decorator Pattern)

> [!NOTE]
> ### 데코레이터 패턴 (Decorator Pattern)
> - **정의**: 객체에 추가적인 책임을 동적으로 첨부한다. 서브클래스를 만드는 것보다 유연하게 기능을 확장할 수 있다.
> - **목적**: 기존 코드를 수정하지 않고 행동을 확장
> - **예시**: 커피 주문 시스템 (에스프레소 + 모카 + 휘핑크림), Java I/O 클래스

> [!TIP]
> ### 디자인 원칙
> **개방-폐쇄 원칙 (Open-Closed Principle)**
> - 클래스는 확장에는 열려있어야 하지만, 변경에는 닫혀있어야 한다.
> - 기존 코드를 건드리지 않고 새로운 기능을 추가할 수 있어야 한다.

## Chapter 4: 팩토리 패턴 (Factory Pattern)

> [!NOTE]
> ### 팩토리 메소드 패턴 (Factory Method Pattern)
> - **정의**: 객체를 생성하기 위한 인터페이스를 정의하지만, 어떤 클래스의 인스턴스를 만들지는 서브클래스에서 결정한다.
> - **목적**: 객체 생성을 캡슐화하여 코드의 유연성 증가
> 
> ### 추상 팩토리 패턴 (Abstract Factory Pattern)
> - **정의**: 연관되거나 의존적인 객체들의 패밀리를 생성하기 위한 인터페이스를 제공한다.
> - **목적**: 구체적인 클래스를 지정하지 않고 관련 객체들을 생성

> [!TIP]
> ### 디자인 원칙
> **의존성 역전 원칙 (Dependency Inversion Principle)**
> - 추상화된 것에 의존하라. 구체적인 클래스에 의존하지 마라.
> - 고수준 구성요소가 저수준 구성요소에 의존하면 안 된다.

## Chapter 5: 싱글턴 패턴 (Singleton Pattern)

> [!NOTE]
> ### 싱글턴 패턴 (Singleton Pattern)
> - **정의**: 클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 이에 대한 전역적인 접근점을 제공한다.
> - **목적**: 전역 변수를 사용하지 않고 객체를 하나만 생성
> - **주의사항**: 멀티스레드 환경에서의 동기화 문제 고려 필요

> [!WARNING]
> ### 싱글턴 패턴 사용 시 주의점
> - 느슨한 결합 원칙을 위반할 수 있음
> - 테스트하기 어려울 수 있음
> - 멀티스레드 환경에서 동기화 처리 필요

## Chapter 6: 커맨드 패턴 (Command Pattern)

> [!NOTE]
> ### 커맨드 패턴 (Command Pattern)
> - **정의**: 요청을 객체로 캡슐화하여 서로 다른 요청, 큐, 로그, 실행 취소 등을 지원한다.
> - **목적**: 요청하는 객체와 요청을 수행하는 객체를 분리
> - **예시**: 리모컨, 작업 큐, 매크로 커맨드, 실행 취소 기능

> [!TIP]
> ### 활용 방안
> - **작업 큐**: 커맨드를 큐에 저장하여 순차적 실행
> - **로깅**: 모든 작업을 기록하여 시스템 복구에 활용
> - **매크로**: 여러 커맨드를 묶어서 한 번에 실행

## Chapter 7: 어댑터와 퍼사드 패턴 (Adapter & Facade Pattern)

> [!NOTE]
> ### 어댑터 패턴 (Adapter Pattern)
> - **정의**: 클래스의 인터페이스를 클라이언트가 원하는 다른 인터페이스로 변환한다.
> - **목적**: 호환되지 않는 인터페이스들을 함께 동작하도록 한다.
> 
> ### 퍼사드 패턴 (Facade Pattern)
> - **정의**: 서브시스템의 일련의 인터페이스에 대한 통합 인터페이스를 제공한다.
> - **목적**: 복잡한 서브시스템을 간단한 인터페이스로 감싸서 사용하기 쉽게 만든다.

> [!TIP]
> ### 디자인 원칙
> **최소 지식 원칙 (Principle of Least Knowledge)**
> - 객체는 자신과 밀접한 관계의 객체들과만 상호작용해야 한다.
> - 시스템의 한 부분의 변경이 다른 부분에 영향을 주는 것을 최소화한다.

## Chapter 8: 템플릿 메소드 패턴 (Template Method Pattern)

> [!NOTE]
> ### 템플릿 메소드 패턴 (Template Method Pattern)
> - **정의**: 알고리즘의 골격을 정의하고, 일부 단계를 서브클래스에서 구현하도록 한다.
> - **목적**: 알고리즘의 구조는 유지하면서 특정 단계를 재정의
> - **예시**: 음료 제조 과정, 프레임워크의 라이프사이클 메소드

> [!TIP]
> ### 할리우드 원칙 (Hollywood Principle)
> **"먼저 연락하지 마세요. 저희가 연락드리겠습니다."**
> - 고수준 구성요소가 저수준 구성요소를 호출한다.
> - 의존성 부패(dependency rot)를 방지한다.

## Chapter 9: 이터레이터와 컴포지트 패턴 (Iterator & Composite Pattern)

> [!NOTE]
> ### 이터레이터 패턴 (Iterator Pattern)
> - **정의**: 컬렉션의 구현 방법을 노출하지 않으면서 집합체 내의 모든 항목에 순차적으로 접근하는 방법을 제공한다.
> - **목적**: 컬렉션의 내부 구조를 몰라도 원소들을 순회할 수 있게 한다.
> 
> ### 컴포지트 패턴 (Composite Pattern)
> - **정의**: 객체들을 트리 구조로 구성하여 부분-전체 계층을 나타낸다.
> - **목적**: 클라이언트가 개별 객체와 복합 객체를 똑같이 다룰 수 있게 한다.

> [!TIP]
> ### 디자인 원칙
> **단일 책임 원칙 (Single Responsibility Principle)**
> - 한 클래스는 하나의 책임만 가져야 한다.
> - 클래스가 변경되는 이유는 단 하나여야 한다.

## Chapter 10: 상태 패턴 (State Pattern)

> [!NOTE]
> ### 상태 패턴 (State Pattern)
> - **정의**: 객체의 내부 상태가 바뀜에 따라 객체의 행동을 바꿀 수 있게 한다.
> - **목적**: 객체가 마치 클래스를 바꾸는 것처럼 보이게 한다.
> - **예시**: 뽑기 기계, TCP 연결 상태

> [!TIP]
> ### 전략 패턴 vs 상태 패턴
> - **전략 패턴**: 클라이언트가 Context에 어떤 전략을 사용할지 지정
> - **상태 패턴**: Context의 내부 상태가 바뀜에 따라 알아서 행동이 바뀜

## Chapter 11: 프록시 패턴 (Proxy Pattern)

> [!NOTE]
> ### 프록시 패턴 (Proxy Pattern)
> - **정의**: 다른 객체에 대한 대리자 또는 자리표시자를 제공하여 그 객체에 대한 접근을 제어한다.
> - **종류**:
>   - **원격 프록시**: 다른 JVM의 객체에 대한 로컬 대리자
>   - **가상 프록시**: 생성 비용이 높은 객체를 필요할 때까지 생성을 미룸
>   - **보호 프록시**: 접근 권한에 따라 객체 접근을 제어

## Chapter 12: 복합 패턴 (Compound Pattern)

> [!NOTE]
> ### 복합 패턴 - MVC (Model-View-Controller)
> - **Model**: 데이터, 상태, 애플리케이션 로직을 관리
> - **View**: 모델의 시각적 표현
> - **Controller**: 사용자 입력을 받아 모델에 전달
> 
> ### MVC에 사용된 패턴들
> - **전략 패턴**: View와 Controller의 관계
> - **컴포지트 패턴**: View의 구성
> - **옵저버 패턴**: Model과 View의 관계

## Chapter 13: 실전 디자인 패턴

> [!NOTE]
> ### 패턴 사용 지침
> 1. **패턴은 만들어지는 것이 아니라 발견되는 것이다**
> 2. **과도한 사용을 피하라** - 필요할 때만 사용
> 3. **단순함을 유지하라** (KISS - Keep It Simple, Stupid)
> 4. **YAGNI** (You Aren't Gonna Need It) - 필요하지 않으면 만들지 마라

> [!WARNING]
> ### 안티패턴 (Anti-Pattern)
> - 나쁜 해결책을 문서화한 것
> - 왜 그 해결책이 매력적으로 보이는지 설명
> - 장기적으로 왜 나쁜지 보여줌
> - 더 나은 대안을 제시

## Chapter 14: 기타 패턴들

### 추가 패턴 요약

| 패턴 | 설명 | 사용 시기 |
|------|------|-----------|
| **브리지 (Bridge)** | 구현부와 추상부를 분리 | 여러 플랫폼에서 동작해야 할 때 |
| **빌더 (Builder)** | 복잡한 객체의 생성 과정을 캡슐화 | 생성 과정이 복잡한 객체를 만들 때 |
| **책임 연쇄 (Chain of Responsibility)** | 요청을 처리할 객체를 찾을 때까지 연쇄적으로 전달 | 여러 객체가 요청을 처리할 수 있을 때 |
| **플라이웨이트 (Flyweight)** | 많은 수의 작은 객체를 효율적으로 지원 | 동일한 객체가 많이 필요할 때 |
| **인터프리터 (Interpreter)** | 언어의 문법을 위한 클래스 계층 구조 정의 | 간단한 언어를 구현할 때 |
| **중재자 (Mediator)** | 객체 간의 복잡한 통신과 제어를 중앙화 | 객체 간 상호작용이 복잡할 때 |
| **메멘토 (Memento)** | 객체의 상태를 저장하고 복원 | 실행 취소 기능이 필요할 때 |
| **프로토타입 (Prototype)** | 객체를 복사하여 새 인스턴스 생성 | 객체 생성 비용이 클 때 |
| **비지터 (Visitor)** | 객체 구조와 처리를 분리 | 객체 구조는 고정, 새로운 연산 추가 필요 시 |

---

## 핵심 정리

### OO 기초
- **추상화 (Abstraction)**
- **캡슐화 (Encapsulation)**
- **다형성 (Polymorphism)**
- **상속 (Inheritance)**

### OO 원칙
1. 변하는 것을 캡슐화하라
2. 상속보다는 구성을 활용하라
3. 인터페이스에 맞춰서 프로그래밍하라
4. 느슨한 결합을 위해 노력하라
5. 클래스는 확장에는 열려있고 변경에는 닫혀있어야 한다
6. 추상화에 의존하라. 구체 클래스에 의존하지 마라
7. 친한 친구들하고만 대화하라
8. 먼저 연락하지 마라. 우리가 연락할게
9. 클래스는 하나의 이유로만 변경되어야 한다

### 패턴 카테고리
- **생성 패턴**: 객체 인스턴스 생성을 위한 패턴 (Singleton, Factory, Abstract Factory, Builder, Prototype)
- **행동 패턴**: 클래스와 객체들이 상호작용하고 책임을 분산하는 방법 (Strategy, Observer, Command, Template Method, Iterator, State, Chain of Responsibility, Interpreter, Mediator, Memento, Visitor)
- **구조 패턴**: 클래스나 객체를 조합해 더 큰 구조를 만드는 패턴 (Decorator, Adapter, Facade, Composite, Proxy, Bridge, Flyweight)
