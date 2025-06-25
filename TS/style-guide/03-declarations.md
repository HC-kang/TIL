---
id: 03-declarations
title: Declarations and Definitions
---

# 3. 선언과 정의(Declaration and Definition, DD)

[[00-index]]

### 3.1 로컬 변수 선언(Local variable declarations)

#### Rule DD-1-1(필수): `var` 대신 `const` 와 `let`을 사용하세요

관련 ESLint: [no-var](https://eslint.org/docs/latest/rules/no-var)

언제나 `const` 와 `let` 을 사용하세요. `var` 는 절대 사용하지 마시기 바랍니다.

```ts
const foo = 'something';
let bar = 'else';
var badFoo = 'no'; // var 사용
```

JavaScript의 `var` 는 함수 범위이며 이 때문에 많은 버그를 야기합니다. ES6부터는 블록 범위 변수로 `let` 혹은 `const` 를 사용할 수 있습니다. 따라서 `var` 를 사용하지 마세요.

```ts
function printEnoughLunch(people: Array<string>, lunch: Array<string>): void {
  var count = people.length;

  if (count > lunch.length) {
    var count = lunch.length; // 변수 재정의. 지금은 코드가 짧아서 프로그래머가 알아채기 쉬우나, 코드가 길어진다면 알아차리기 힘듭니다
    console.log(`배가 고파요. ${count}개의 점심은 부족합니다.`);
  }

  console.log(`우리는 ${count}명이고 점심은 ${lunch.length} 개 입니다.`);
}
printEnoughLunch(['1', '2'], ['1']);

// 실행 결과
// 배가 고파요. 1개의 점심은 부족합니다.
// 우리는 1명이고 점심은 1 개 입니다.
```

#### Rule DD-1-2(필수): 변수가 다시 할당되지 않는다면 `const` 를 사용하세요.

관련 ESLint : [prefer-const](https://eslint.org/docs/latest/rules/prefer-const)

```ts
// 올바른 예
const pizza = 'pepperoni';

// 잘못된 예
let pasta = 'basil';
const pizza = 'pepperoni';
```

값을 변경시킬 수 있는 `let`을 사용하는 경우 낮은 빈도로 할당되어있는 값을 변경시켜 문제를 야기시킬 수 있습니다. 그러므로 값의 변경이 이루어지지 않는 경우 상수 선언 (`const`)을 사용하는 편이 좋습니다.

```ts
let pie = 3.1415922; // 재할당이 이루어지지 않는 경우 const를 사용하는 편이 좋습니다.
```

#### Rule DD-1-3(필수): 지역 변수 선언 시 한 번에 하나의 변수 만을 선언해야 합니다

코드의 오류를 줄이고 가독성을 높여 유지보수를 원활하게 하기 위함입니다.

아래의 코드처럼 여러 변수를 한 번에 선언하는 경우가 있습니다.

```ts
let x = 1,
  y = 2,
  z = 3;
```

이런 선언은 여러가지 문제를 야기합니다.

**타입의 혼란**

한 번에 타입이 다른 여러 변수를 선언할 경우 실수의 가능성이 높아집니다.

```ts
let x: number = 1,
  name = 'triangle';
```

이 경우 `name`는 타입을 명시하지 않았기 때문에 TypeScript는 `name`의 타입을 추론합니다. 위 예제는 간단한 타입 선언이라 직관적이지만 타입이 복잡할 경우 TypeScript가 잘못된 타입으로 추론할 수 있습니다.

위 코드는 아래와 같이 수정해야 합니다.

```ts
let x = 1;
let name = 'triangle';
```

**주석 달기 어려움**

한 번에 여러 변수를 선언하면 각 변수에 대한 주석을 달기 어렵습니다.

```ts
/** 가로, 세로 높이 */
let x = 1,
  y = 2,
  z = 3;
```

이 경우 IDE에서 변수에 대한 툴팁이 나오지 않거나 첫 번째 변수인 `x`만 툴팁이 나옵니다. 따라서 위 코드는 아래와 같이 변수 선언을 분리해야 합니다. 변수 선언을 분리하면 해당 변수의 용도와 의미를 주석으로 설명하기 쉬워집니다.

```ts
let x = 1; // 좌표의 X 값
let y = 2; // 좌표의 Y 값
let z = 3; // 좌표의 Z-Index
```

**이해의 어려움**

여러 변수를 한 줄에 선언하면 변수 이름을 `x`, `i` 와 같이 짧고 뜻을 이해하게 짓는 경향이 있습니다. 게다가 변수를 한 줄에 하나씩 선언하는 것보다 읽고 이해하기가 힘들기 때문에 여러 명이 작업하는 프로젝트에서는 필히 한 줄에 하나의 변수를 선언해야 합니다.
