---
title: 타입으로 견고하게 다형성으로 유연하게
date: 2024-01-17
tags: [타입, 다형성, 유연성, 홍재민, 카이스트]
alias: [타입으로 견고하게 다형성으로 유연하게]
---

# 타입으로 견고하게 다형성으로 유연하게

카이스트 프로그래밍 언어 연구실 | 홍재민 | jaemin.hong@kaist.ac.kr

---

저자 도서

[](https://product.kyobobook.co.kr/detail/S000210397750)

## 연구실 소개

ECMAScript
실수를 방지하기위한 ESMeta - 타입 검사기. 현재는 CI에 통합되어있음

C

- 개발 환경 자체가 불편함
- 타입 검사가 부실함

RUST

- 컴파일 시 타입 검사를 사용 할 수 있음

C → Rust 변환기 작성 중

---

## 값의 능력

```jsx
let msg = "hello world";
msg.toUpperCase();

let date = new Date();
date.getHours();
```

타입: 값을 능력에 따라 분류 한것.

- boolean
- number
- string
- Date..

타입 오류 - 문자열에 getHours() 메서드 호출 등..

- 타입 오류의 두 가지 의미
    - 실행 중 타입오류
    - 타입 검사기에서 발생한 오류

```jsx
let date = '2024.01.17. 17:30:00';
date.getHours(); // ERROR
```

타입 에러가 발생하면 이벤트가 실패함.. 원하는 동작을 얻을 수 없음 ⇒ 버그

타입 오류를 어떻게 찾을 수 있느냐? → 타입 검사

타입 검사

- 매번 실행 할 수 없다..
- 프로그램을 실행하지 않고 타입 오류가 있는지 알 수 없을까??
- `타입 검사기`를 통해 확인
    - 통과 - 타입 오류가 절대 일어나지 않는다
        - `사실은, 타입 오류가 일어날수도 있다`
    - 거부 + 거부 이유
        - 타입 오류가 일어나는 경우가 반드시 있다 → 타입 오류가 없게 수정한다
        - 타입 오류가 일어나지 않지만, 검사기가 잘못 판단 할 수 있다 → 거부당하지 않게 수정
- 그러나 이러한 이상적인 타입 검사기는 논리적으로 존재 할 수 없다..

- 타입 검사기의 목적: 타입 안정성(type safety, type soundness)
    - 적어도, 통과 했을 때 문제가 되지는 않게.

- 타입 검사기가 있는 언어 - 정적 - ‘실행하지 않고’
    - C, Java, Rust, TS…
- 타입 검사기가 없는 언어 - 동적 - ‘실행해봐야..’
    - Python, JS, Ruby…
    

### 타입 검사기 사용하기

```tsx
function getDate(b: boolean) {
let date = b ? 'January 17th' : new Date();
if (b)
	date.toUpperCase();
else
	date.getHours();
 // 검사기는 국소적으로만 코드를 확인함. date에 대한 정보가 없음!
```

```tsx
function getDate(b: boolean) {
if (b)
	let date = 'January 17th';
	date.toUpperCase();
else
	let date = new Date();
	date.getHours();
```

### 타입 검사의 원리

작은 부품에서 큰 부품으로.

- 부품? 프로그램의 단위

`'x'.toUpperCase().getHours()`

→ string → string → TYPE ERROR!

```tsx
function add(n: number,m: number): number {
	return n + m;
}

add(1, 2).toUpperCase();
```

→ 개발자가 제공한 정보를 참고

- 다만, 개발자가 잘못 제공한 정보를 찾아낼 수도 있음
    
    ```tsx
    // error: number is not assignable to type string
    function add(n: number,m: number): string {
    	return n + m;
    }
    
    add(1, 2).toUpperCase();
    ```
    

### 타입 추론

```tsx
function add(n: number, m: number) {
	return n + m;
}
add(1, 2).toUpperCase();
```

→ 적당히 봐서, number로 자동으로 인식

- 타입을 작성하지 않는다고, 검사를 스킵하는 것이 아님.
- 말이 되는, 가능한 타입을 모두 스스로 채워넣고 검사

### 타입 정보의 활용

- 변수의 타입 보기(타입 확인)
- 가능한 메소드 자동완성

### 정적 타입 언어 vs 동적 타입 언어

Scala vs Ruby

Scala - 큰 프로그램을 만들 때

Ruby - 작은 프로그램을 빠르게

TS / JS

### 현실적인 타입 검사기

- 타입 검사기에도 구현 실수 등 버그가 있다.
- 언어 자체의 설계 오류가 있다.
    - ‘Java and Scala’s Type System are Unsound’ - Nada Amin, Ross Tate
- 의도적으로 제공하는 위험한 기능이 있는 경우도 있다.
    - any - 서버에게 도저히 정보를 제공 할 수 없는 경우를 위한 타입. 필요한 경우가 분명 있음
    
    ```tsx
    let msg: any = 'hello world';
    let date: Date = msg;
    date.getHours();
    ```
    

### 다형성 - 위 문제를 해결하는 방법(Polymorphism)

서브타입에 의한 다형성(subtype polymorphism) - 객체지향

매개변수에 의한 다형성(parametic polymorphism) - Generics

오버로딩에 의한 다형성(ad hoc polymorphism)

### 서브타입에 의한 다형성

```tsx
interface Person {
	name: string;
}

let x = { "name": "John" }

interface Student {
	name: string;
	grade: number;
}

let x: Student = { "name": "John", grade: 1 }

function greet(p: Person) {
	return `Hello, ${p.name}`;
}
```

- 직관: ‘T 는 S이다’ 가 참이면 T는 S의 서브타입
    - 학생은 사람이다. ✅
    - 사람은 학생이다. ❌
    

구조에 따른 서브타입

- T의 모든 프로퍼티가 S에 있으면, T는 S의 서브타입이다.
- TS의 경우 대체로 이 방법 사용

이름에 따른 서브타입

- Java 등 다른 언어에서는 대부분 이 방법 사용

### 서브타입에 의한 다형성의 한계

```ts
function pick(x: number, y: number): number {
    return Math.random() < 0.5 ? x : y;
}
let x: number = pick(1, 2)
let y: string = pick(1, 2)
```

```ts
function pick(x: unknown, y: unknown): unknown {
    return Math.random() < 0.5 ? x : y;
}
let x: number = pick(1, 2)
let y: string = pick(1, 2)
```

- unknown: 모든 타입의 서브타입
  - 아무데도 넣을 수 없음

### 매개변수에 의한 다형성

```ts
function pick(p: number, x: number, y: number): number {
    return Math.random() < p ? x : y;
}
// 여기서 p는 값. 타입이 아님

function pick<T>(p: number, x: T, y: T): T {
    return Math.random() < p ? x : y;
}
let n: number = pick<number>(0.5, 1, 2);
let s: string = pick<string>(0.5, 'a', 'b');
```

### 두 다형성의 만남

```ts
interface Person {
    age: number;
}

function elder(p1: Person, p2: Person): Person {
    return p1.age > p2.age ? p1 : p2;
}

let s1: Student = { age: 10, school: 'A' };
let s2: Student = { age: 20, school: 'B' };
let s3: Student = elder(s1, s2);

function elder<T>(p1: T, p2: T): T {
    return p1.age > p2.age ? p1 : p2;
}

function elder<T extends Person>(p1: T, p2: T): T {
    return p1.age > p2.age ? p1 : p2;
} // Generic constraint, bounded quantification
```

참고자료
- 도서
- typescript handbook
- https://www.youtube.com/watch?v=AJV43tjKtq8
