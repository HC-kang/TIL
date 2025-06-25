---
id: 07-functions
title: Functions
---

# 7. 함수(Function, FC)

[[00-index]]

### 7.1 일반

#### Rule FC-1-1(권장): 매개 변수가 3개 이상인 함수는 구조적 타입으로 매개 변수를 줄여보세요.

함수의 매개변수가 많아지면 가독성이 떨어지며, 순서가 헷갈리면 잘못된 값을 전달할 위험이 있습니다.

```ts
function sendFAX(
  CorpNum,
  Sender,
  Receiver,
  ReceiverName,
  FilePaths,
  ReserveDT,
  SenderName,
  AdsYN,
  Title,
  RequestNum,
  UserID,
  success,
  error
);
```

위 코드는 제가 버그를 일으킨 써드파티 SDK의 함수 정의입니다. JavaScript로 되어있어서 `.d.ts`를 통해서 타입을 정의하고 구현했는데 13개의 매개 변수 때문인지, 집중력이 떨어졌을때 했는지 결국 버그를 내고 말았습니다.

매개 변수가 3개 이상일 경우 `interface`등의 구조적 타입으로 매개변수를 줄여보세요.

```ts
interface UserParams {
  id: number;
  name: string;
  age: number;
}

function createUser({ id, name, age }: UserParams) {
  return { id, name, age };
}
const user = createUser({ id: 1, name: 'Alice', age: 25 });
```

구조적 타입을 매개변수로 사용하면 여러 이점이 있습니다. 매개변수 순서때문에 발생하는 실수를 방지할 . 수있으며 확장이 용이합니다. 위 코드에서는 `UserParams`에 추가만 하면 됩니다. 또한 선택적 매개변수도 활용 가능하죠.

다만 3개 미만(혹은 이하)일 경우에는 매개변수 타입 정의가 더 비용이 많이 든다는 점 참고하시기 바랍니다.

#### Rule FC-1-2(권장): 매개 변수가 객체인 경우 `Readonly` 유틸리티 타입을 사용하세요

매개변수가 객체인 경우 호출한 함수에서 매개 변수의 속성이나 요소를 변경할 경우 원래 값에 영향이 갑니다. 이는 버그를 유발하며 디버깅을 까다롭게 합니다.

```ts
interface Foo {
  a: number;
  b: number;
}

const bar: Foo = { a: 1, b: 1 };
const bar2: Foo = { a: 2, b: 2 };

function someFunc(p1: Foo, p2: Foo): number {
  // a = { a : 4, b: 3};
  p1.a = -1;
  return p1.a + p1.a;
}

console.log(bar, bar2); // ❌bar.a의 값 변경: { "a": -1, "b": 1 }, { "a": 5, "b": 5 }
```

JavaScript와 달리 TypeScript에서는 `Readonly<T>` 유틸리티 타입을 사용하면 호출한 함수 내에서 매개 변수를 변경하지 못하게 할 수 있습니다. 이런 경우 매개 변수는 불변을 유지할 수 있기 때문에 예상치 못한 부작용을 막을 수 있습니다.

```ts
interface Foo {
  a: number;
  b: number;
}

const bar: Foo = {
  a: 1,
  b: 1,
};

function add(num: Readonly<Foo>): number {
  num.a = 4; // ERROR!
  return num.a + num.b;
}
```
