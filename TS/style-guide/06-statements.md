---
id: 06-statements
title: Statements
---

# 6. 문(Statement, ST)

[[00-index]]

### 6.1 일반

#### Rule ST-1-1(필수): 복합문(Compound Statements)의 시작과 끝은 중괄호({})여야 합니다.

`while`, `for`, `if`, `switch` 등의 제어문(혹은 반복문)은 하나 이상의 문(Statement)의 집합을 필요로 합니다. 이 하나 이상의 문의 집합을 복합문(Compound Statement)이라 합니다. 혹은 블록(block)이라고도 합니다. 보통은 중괄호를 사용하는데, 90년대에 등장한 Python은 `:`과 탭으로만 복합문을 구현할 수 있어서 센세이션을 일으킨 프로그래밍 언어이기도 합니다.

```python
for i in range(10):
    print(i)
    i = 5
```

굉장히 깔끔합니다. 복합문을 표현하는 방법은 Python이 특이한 편이고 JavaScript는 많은 프로그래밍 언어가 채택하고 있는 중괄호로 복합문의 시작과 끝을 알립니다. 즉 JavaScript 복합문의 시작은 중괄호로 시작해서 중괄호로 끝나야 합니다.

```ts
for (const element of words) {
  console.log(element);
}

if (x) {
  doSomething(x);
}
```

아래처럼 사용하면 안됩니다.

```ts
for (const element of words) console.log(element);

if (x) doSomething(x);
```

다만 예외로 복합문이 한 줄일 경우 `if`를 사용하는건 때에 따라 허용합니다.

```ts
if (x) doSomething(x);
```

### 6.2 switch

#### Rule ST-2-1(필수): `switch`의 `default`를 명시하세요.

관련 ESLint : [default-case](https://eslint.org/docs/latest/rules/default-case)

`switch`문에서 `default` 사용은 예상치 못한 상황을 처리하여 코드의 신뢰성과 유지보수성을 높이며, 버그 발생 가능성을 줄이는 좋은 습관입니다.

`switch`문에는 들어올 수 있는 모든 `case`에 대해서 처리하겠지만 세상 일이 다 그렇듯 예상치 못한 값이 들어오는 경우가 있습니다.

```ts
switch (day) {
  case 0:
    return '일요일';
  case 1:
    return '월요일';
  case 2:
    return '화요일';
  case 3:
    return '수요일';
  case 4:
    return '목요일';
  case 5:
    return '금요일';
  case 6:
    return '토요일';
  default:
    throw new Error('비정상적인 값입니다');
}
```

`day`에는 -1이 들어올 수도 있고 99999가 들어올 수도 있습니다. `default`를 사용하면 `case`에서 처리하지 못하는 모든 예외 상황을 포괄적으로 처리할 수 있습니다. 예를 들어 예상치 못한 값이니 로그를 남기는 등의 행동을 할 수 있죠.

심지어 `default`에서 아무 작업을 하지 않는 경우라도 명시적으로 `default`를 작성하는 것이 더 명확한 의도를 전달할 수 있습니다. 없으면 코드 작성자가 실수로 누락했는지 확인이 필요하지만 아래 코드처럼 `default`를 사용하고 있다면 `case`가 외의 별도 상황에서는 명시적으로 아무 작업이 필요없다는 것을 의미하니까요. 게다가 주석까지 달려있다면 금상첨화겠죠.

```ts
switch (some) {
  case 1:
    console.log('하나');
    break;
  case 2:
    console.log('둘');
    break;
  case 3:
    console.log('셋');
    break;
  default:
    // 별 다른 작업 필요 없음
    break;
}
```

`default`는 문법 상으로는 `case`보다 더 앞서 사용할 수도 있습니다만, 통상적으로 맨 마지막에 정의하고 있습니다.

#### Rule ST-2-2(권장): 각 `case`절은 `break` 혹은 `return`이 있어야 합니다.

`switch` 블록 내에서 각 `case`절은 `break` 혹은 `return` 문으로 끝나거나 혹은 예외를 발생해야 합니다. 비어 있지 않은 `case` 절 - 즉 하나 이상의 문이 있는 경우 코드 제어가 다음 `case`절로 넘어가는 "fall through"가 발생해서는 안됩니다. 코드 작성자의 실수인지 의도인지 파악하기 힘들며 좋지 않은 처리 방식입니다.

```ts
switch (x) {
  case 1:
    doStuff();
  // fall through 발생 - break, return, 예외가 없습니다.
  case 2:
    doStuff2();
  // ....\
}
```

아래와 같이 `case`절이 비어있을 경우 "fall through"가 가능합니다.

```ts
switch (x) {
  case 1: // 비어 있어서 "fall through" 가능
  case 2:
    doStuff();
    break;
  // ....\
}
```

#### Rule ST-2-3(권장): `case`가 3개 미만이면 `if...else`를 고려하세요

`switch`의 `case`의 수가 적다면 `if...else`를 고려하시기 바랍니다.

```ts
switch (a) {
  case 1:
    console.log('one');
    break;
  case 2:
    console.log('two');
    break;
  default:
    // pass
    break;
}

if (a === 1) {
  console.log('one');
} else if (a === 2) {
  console.log('two');
} else {
  // pass
}
```

#### Rule ST-2-4(참고): `switch(true)` 패턴을 용도에 맞게 사용하세요

개발자 Seán Barry가 소개해서 유명해진 패턴입니다. ([관련 링크](https://seanbarry.dev/posts/switch-true-pattern))

`switch`문의 기본 동작에 대해서는 위에서 예제를 들었지만, 아래와 같은 패턴으로 사용할 수도 있습니다.

```ts
const user = {
  firstName: 'Seán',
  lastName: 'Barry',
  email: 'my.address@email.com',
  number: '00447123456789',
};

// if만 사용 할 경우
if (!user) {
  throw new Error('User must be defined.');
}

if (!user.firstName) {
  throw new Error("User's first name must be defined");
}

if (typeof user.firstName !== 'string') {
  throw new Error("User's first name must be a string");
}

// switch로 사용할 경우
switch (true) {
  case !user:
    throw new Error('User must be defined.');
  case !user.firstName:
    throw new Error("User's first name must be defined");
  case typeof user.firstName !== 'string':
    throw new Error("User's first name must be a string");
  // ...더 많은 유효성 검사들
  default:
    return user;
}
```

맨 마지막 `switch(true)`문을 주목할 필요가 있습니다. `switch`문의 동작은 `case` 뒤의 값과 `switch`문에서 제공한 값(위 예제에서 `true`)가 같으면 case 절의 복합문을 실행하게 됩니다. 즉 위 `switch`는 그 위의 `if` 문과 동일한 연산을 하는 겁니다.

좀 더 프로그래밍 언어론적으로 설명드리겠습니다. `switch`문의 BNF로 간략하게 표현하면 이렇습니다.

```bnf
switch-statement	::= "switch" '(' expression ')' { case-clause }

case-clause			::= "case" expression ':' { statement }
					| "defualt" ':' { statement }
```

보통 `switch(day)`같이 변수를 `switch` 의 조건으로 제공하지만 `switch(day + 1)`같은 표현식(Expression)도 문법적으로 맞습니다. 변수의 값 참조도 표현식의 일부이기 때문입니다. 그리고 `case` 는 보통 `case "Saturday": ....` 형태의 상수 값을 주로 쓰긴 하지만 `day === 'BadDay'` 같은 표현식도 가능합니다. 즉 Seán Barry는 이 조건을 매우 영리하게 잘 썼다고 보면 됩니다.

다만 망치를 든 사람은 모든게 못으로 보입니다. 막 이 패턴을 배웠다고 `if` 문만 보이면 `switch(true)`를 쓰려고 하는데요, 때와 장소에 맞춰서 써야합니다. 사실 이를 쓰는 이유는 그저 가독성 뿐입니다. 그럼 위의 예제에서 `if`가 가독성이 낮을까요? `switch(true)`가 가독성이 높을까요?

논란의 여지가 있으며 반드시 `switch(true)` 패턴이 가독성이 높지는 않다고 봅니다. 사람에 따라 다르지만, 특히 대부분의 경우에는 `if` 문으로 대체 가능하다 생각합니다. 다만 아래와 같이 `if` 문 안에 조건이 많을 경우에는 가독성 측면에서 누구도 부인할 수 없을 정도로 좋아지긴 합니다. 이를 참고해서 팀 내에서 논의해보시길 바랍니다.

```ts
const ifExample = (user: User): string => {
  if (
    user.name.startsWith('K') ||
    (user.name === 'Trump' && user.age > 60) ||
    (user.name === 'Harris' && user.age < 60) ||
    user.age > 40
  ) {
    return `안녕하세요 ${user.name}님!`;
  }

  return '누구신지는 모르겠지만 안녕하세요?';
};

const switchExample = (user: User): string => {
  switch (true) {
    case user.name.startsWith('K'):
    case user.name === 'Trump' && user.age > 60:
    case (user.name === 'Harris' && user.age < 60) || user.age > 40:
      return `안녕하세요 ${user.name}님!`;
    default:
      return '누구신지는 모르겠지만 안녕하세요?';
  }
};
```

### 6.3 순회(Iteration)

#### Rule ST-3-1(필수): `for...in` 사용 시, 명시적으로 필터링을 하세요.

`for...in` 문은 객체에서 Symbol로 키가 지정되지 않은, 모든 열거 가능한 속성에 대해서 순회합니다. 게다가 부모 프로토타입도 순회하기 때문에 의도치 않은 오류가 발생할 가능성이 높습니다.

```ts
for (const prop in fooObj) {
  // ❌ prop 은 부모 프로토타입일 수 있습니다
}
```

아래와 같이 `if` 문으로 명시적으로 자체 속성을 사용하세요.

```ts
for (const prop in fooObj) {
  if (!fooObj.hasOwn(x)) {
    continue;
  }
  // 이제 prop 는 fooObj의 자체 속성임을 보장합니다.
}
```

혹은 `Object.keys()` 혹은 `Object.entries()` 의 값으로 `for...of` 를 사용해도 됩니다.

```ts
for (const key of Object.keys(fooObj)) {
  // fooObj에서 정의한 키만 key로 옵니다.
}

for (const [key, value] of Object.entries(someObj)) {
  // fooObj에서 정의한 키와 값 만 key, value 로 옵니다.
}
```

#### Rule ST-3-2(필수): 배열을 순회 시 `for...in`을 사용하지 마세요.

JavaScript에서 `Array`는 사실 `Object`의 특수한 형태입니다. 아시다시피 JavaScript에서 모든 객체는 자신의 프로토타입을 통해 상속받습니다. 프로토타입 체계는 다음과 같이 동작합니다:

```ts
const a = [1, 2];
```

이 코드에서 `a`는 배열(Array)로 `Array.prototype`을 상속 받습니다. `Array.prototype`은 `Object.prototype`을 상속받습니다. 결론적으로 `Array`는 결국 `Object`에서 파생된 특수한 타입이라고 볼 수 있습니다. 이는 아래 코드에서 확인하실 수 있습니다

```ts
const a = [1, 2];

console.log(Object.getPrototypeOf(a)); // Array.prototype
console.log(Object.getPrototypeOf(Array.prototype)); // Object.prototype
```

즉, 배열은 `Object`에 0 이상의 정수를 키로 가지고 `length` 속성이 있으며 `Array.prototype`을 상속받은 객체입니다. 이 때문에 `for...in`은 0, 1과 같은 정수형 키 뿐만 아니라 `length` 그리고 `Array.prototype` , `Object.prototype`까지 모두 탐색하게 됩니다. 이는 대부분의 프로그래머가 의도한 바는 아닐겁니다.

게다가 인덱스로 사용하는 0, 1도 문자열로 오기 때문에 탐색에 부적절합니다. 따라서 `for...of` 반복문이나 `Array.prototype.forEach()` 메서드를 사용하여 배열을 순회하시기 바랍니다.

#### Rule ST-3-3(필수): `for` 문에서 숫자 증감을 소수점으로 하지 마세요.

`Rule EX-1-2 부동 소수점의 값을 직접 비교하지 마세요`의 응용편입니다. `for`문은 반복을 한 번 할때마다 그 카운터 값을 증감시키고 이 카운터 값을 비교함으로서 반복을 유지할지 계속할지를 결정합니다. 그런데 이 값이 소수점이라면 제대로 비교를 할 수 없습니다.

```ts
for (let i = 0.0; i < 10; i += 0.1) {
  // ....\
}
```

아래와 같은 버그를 겪을 수도 있으니, 반드시 숫자 증감을 정수로만 하시기 바랍니다.
![버그 사례](./images/st-3-3-1.png)

#### Rule ST-3-4(필수): for 문에서 반복 카운터로 사용하는 숫자 변수를 내부에서 변화시키지 마세요

`for`의 반복 카운터는 반복 제어의 핵심 요소입니다. 내부에서 카운터를 변경하면 아래와 같이 여러 문제를 야기할 수 있습니다.

**무한 루프**
반복 카운터를 임의로 변경하면 종료 조건이 충족되지 않아 무한 루프가 발생할 수 있습니다.

```ts
for (let i = 0; i < 5; i++) {
  console.log(i);
  i -= 1; // 카운터 변경
}
// 출력: 0, -1, -2, ... (무한 루프)
```

**반복 횟수 예측 불가**
`for`문은 정해진 카운터의 초기값, 종료 조건, 증감으로 정해진 횟수만큼 실행되도록 설계되어 있습니다. 하지만 카운터 값을 내부에서 변경하면 이 설계를 깨뜨리는 것이며 이 코드를 읽는 사람도 혼란을 겪을 수 있습니다. 또한 디버깅과 유지보수를 어렵게 만듭니다.

#### Rule ST-3-5(권장): 배열을 순회할 목적이면 for 문 대신 `for...of`, `Array.prototype.forEach()`를 사용하십시오.

Rule ST-3-3, ST-3-4 등의 이유로 배열을 순회할 목적이라면 `for`문 대신 `for...of`, `Array.prototype.forEach()`을 사용하세요. JavaScript의 `for`문은 프로그래밍 언어 C 스타일의 반복문인데, 이 반복문은 가장 흔하게 소프트웨어 버그를 유발하는 이유 중 하나이기 때문에 `Swift`등의 모던 언어에서는 아예 문법에서 빼버리기도 했습니다. 배열을 순회한다는 것은 그 안의 요소에 접근해서 요소의 값을 변경한다거나, 그 값을 읽는 것일 뿐입니다. 이 모든 경우는 `for...of`, `Array.prototype.forEach()`로 충분히 가능합니다.

다만 `for`문의 경우 `for...of`, `Array.prototype.forEach()`보다 성능이 좋습니다. 특히 `forEach()`는 각 요소마다 순회하면서 콜백함수를 실행시키는 오버헤드가 있기 때문에 가장 속도가 느립니다. 다만 일반적인 경우에는 큰 차이가 나지 않으며 배열의 요소 수가 매우매우 많은 경우(천 만개 이상?)에는 미리 벤치마킹을 한 후 사용하시기 바랍니다.

### 6.4 if

#### Rule ST-4-1(권장): 3개 이상의 조건은 지양하세요

가끔씩 `if` 조건문 안의 조건이 여러 개가 와야하는 경우가 있습니다.

```ts
if ((age > 30 && age < 50 && weight > 90) || height > 200) {
  // ...
}
```

보통 3개 이상이 오면 코드를 읽는 사람이 이해하기가 쉽지 않습니다. 이 경우에는 `switch(true)` 패턴을 고민해보시거나 `if(isYoungGiants(age, weight, height) { ....}` 처럼 별도의 함수로 빼는걸 고려해보시기 바랍니다.

#### Rule ST-4-2(권장): 조건에 부정 연산자, 부정적 의미를 담은 식별자는 최소한으로 사용하세요.

`if`문 안의 부울 논리가 복잡하면 참인지 거짓인지 해석하는데 오래 걸리며, 에러가 발생할 여지를 만듭니다. 여기에 일조하는게 많은 조건 그리고 부정 연산자와 부정적 의미를 가진 식별자의 사용입니다.

사람은 부정보다는 긍정을 더 잘 이해합니다. 제일 이해하기 힘든 건 이중 부정입니다.

```ts
if (!user.notAuthorized || !user.isNotAdmin) {
  // ....\
}
```

바로 이해 가시는지요? 부정 연산자와 부정적 의미를 가진 식별자가 결합되었는데다가 OR 조건까지 끼어들어서 이해하기가 상당히 난감합니다. 이 코드를 변환해보겠습니다.

```ts
if (user.authorized || user.isAdmin()) {
  // ....\
}
```

아래 코드가 이해하기 훨씬 쉬우실겁니다.

다만 아래와 같이 짧고 직관적인 부정 비교는 괜찮습니다.

```ts
if (!user.name) {
  // ....\
}
```

#### Rule ST-4-3(권장): `else if`가 3개 이상이면 `switch` 사용을 고려하세요

`if...else`가 3개 이상 연속된다면 가독성 향상을 위해 `switch`문 사용을 고려해보세요.

```