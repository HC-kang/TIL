---
id: 05-expressions
title: Expressions
---

# 5. 표현식(Expression, EX)

[[00-index]]

### 5.1 일반

#### Rule EX-1-1(권장): 2중 이상의 조건 표현식(Conditional Expression)은 사용하지 마세요.

조건 연산자(Conditional Operator) 혹은 삼항 연산자(Ternary Operator)를 사용한 조건 표현식은 간단한 `if`문을 대체할 수 있는, 가독성 향상 측면에서 빈번하게 사용하는 표현식입니다.

```ts
const isToBe = hasQuestion ? toBe() : notToBe();

// if 표현 시
let isToBe;
if (hasQuestion) {
  isToBe = toBe();
} else {
  isToBe = notToBe();
}
```

다만 이는 간단한 조건을 표현할때로 제한해야 합니다. 아래 코드를 보시겠습니다.

```ts
const isToBe = hasQuestion ? (meetOphelia() ? toBe() : notToBe()) : killClaudius() ? toBe() : notToBe();
```

어떤가요. 논리가 바로 이해 되시나요? 이렇게 2중 이상의 조건 표현식은 `if...else`문 사용을 추천드립니다. 위 코드는 아래와 같이 `if`문으로 쓰는게 좋습니다.

```ts
if (hasQuestion) {
  if (meetOphelia()) {
    toBe();
  } else {
    notToBe();
  }
} else {
  if (killClaudius()) {
    toBe();
  } else {
    notToBe();
  }
}
```

#### Rule EX-1-2(필수): 부동 소수점의 값을 직접 비교하지 마세요.

JavaScript에서 숫자는 IEEE 754 표준의 64비트 부동소수점 형식으로 저장하고 표현합니다. 쉽게 말하자면 컴퓨터에서는 부동 소수점을 정확한 값이 아닌 근사값으로 저장할 수 밖에 없는 구조적 한계가 있어서 그렇습니다. 상세 설명은 제가 적은 이 [문서](https://www.wisewiredbooks.com/csbooks/ch2-computer-basic/section3-base-notation.html#%EB%B6%80%EB%8F%99-%EC%86%8C%EC%88%98%EC%A0%90)를 참고하시기 바랍니다.

이 때문에 굉장히 직관적이고 간단한 연산에도 예상치 못한 결과를 받아보곤 합니다.

```ts
const a = 0.1 + 0.2; // 실제 결과: 0.30000000000000004
console.log(a === 0.3); // false
```

사람에게 0.1 + 0.2 를 더하면 얼마인지 물어보면 산수를 하실줄 아는 사람이라면 모두 0.3이라고 대답하겠지만 컴퓨터에게는 좀 어려운 문제입니다. 비단 JavaScript 만의 문제는 아니고 부동 소수점을 IEEE 754 표준을 따르는 모든 시스템에서 벌어지는 문제이기 때문에 낙담할 필요는 없습니다. 따라서 컴퓨터는 멍청해서(?) 부동소수점 값 비교를 못한다고 생각하시고 부동소수점 끼리의 값 비교는 허용 오차를 사용하여 비교하시기 바랍니다.

```ts
function equal(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

const x = 0.2;
const y = 0.3;
const z = 0.1;
console.log(equal(x + z, y)); // true
```

이 경우를 위해 JavaScript의 Math 전역 객체에는 `EPSILON`이라는 상수 값을 가지고 있습니다. 이 값은 `2.220446049250313e-16`, JavaScript 의 기본 64비트 실수형 가수부에서 0을 제외하고 가장 작은 숫자입니다. 그 말인 즉슨 `number`타입 `x`가 표현하지 못하는 값인 0 초과 `2.220446049250313e-16` 미만인 값을 무시하기 위함입니다.

다만 이 경우는 1 미만 소수점일때 해당되고 숫자가 커지면 이 코드 역시 문제가 있습니다.

```ts
function equal(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

const x = 1000.1;
const y = 1000.2;
const z = 2000.3;
console.log(equal(x + y, z)); // false
```

위의 경우는 값이 크기 때문에 허용 오차도 같이 커져야합니다.

```ts
function equal(x, y, tolerance = Number.EPSILON) {
  return Math.abs(x - y) < tolerance;
}

const x = 1000.1;
const y = 1000.2;
const z = 2000.3;
console.log(equal(x + y, z, 2000 * Number.EPSILON)); // true
```

따라서 `Number.EPSILON`값을 절대적으로 신봉하기보다는 이 값을 이해하고 값 범위에 맞춰 위와 같이 사용하시길 바랍니다.

#### Rule EX-1-3(권장): 단항 증가(unary plus, +) 연산자를 조심히 사용하세요

문자열로 표현된 숫자(예: "123")을 숫자로 바꾸기 위해 단항 증가 연산자를 사용하는 경우가 있습니다. 간편하고 코드도 간단해진다는게 그 이유입니다.

```ts
const someValue = +strMyNumber + 17274;
```

하지만 숫자 파싱이 실패할 경우 `NaN`을 반환하기 때문에 위 코드에서 `aaa`, `123f`등의 문자열이 들어오면 단항 증가 연산의 결과는 `NaN`이 되며 여기에 무슨 값을 더하건 다 `NaN`이 됩니다.

문자열로 표현된 숫자가 확실한 경우 사용해도 되겠지만, 만약 `strMyNumber`가 외부로부터 입력된 값일 경우에는 절대 사용하지 마시거나 미리 정규표현식으로 숫자를 표현한 문자열임을 확인 후 사용하시기 바랍니다.

#### Rule EX-1-4(필수): `new` 연산자로 객체를 생성하세요.

과거 JavaScript에서는 `new` 없이도 객체를 생성할 수 있었습니다. 그러나 최근의 생성자는 무조건 `new` 연산자로 객체를 생성해야 합니다. 아래와 같은 레거시 생성자는 `new` 없이도 호출은 가능합니다.

- Object()
- Function() 과 그 파생 클래스
- Error() 와 그 파생 클래스
- RegExp()
- Array()

그 외에는 모두 `new`와 함께 호출해야 하며 그렇지 않으면 TypeError가 발생합니다. 하지만 일관성을 위해서 위 객체를 포함하여 객체를 생성할때는 모두 `new`를 사용하시기 바랍니다.

#### Rule EX-1-5(필수): 전개 연산자 사용 시 피연산자가 객체 리터럴 혹은 순회 가능한 객체가 와야합니다.

전개(spread, '...') 연산자 사용 시 피연산자가 객체 리터럴 혹은 순회 가능한 객체가 와야합니다. 이 부분은 TypeScript라도 걸러내기 힘들고 런타임 에러가 발생합니다. 특히 `null`, `undefined`이 오지 않도록 조심하세요.

```ts
const targetIds = [7];
const totalIds = [5, ...(shouldTotalIds && targetIds)]; // ...의 피연산자는 false
console.log(bar);

// 출력: (shouldTotalIds && targetIds) is not iterable
```

다만 이 경우는 배열에 한합니다. 배열에서 `undefined`, `null`, `boolean` 등과 같이 순회 가능한 객체가 오지 않으면 런타임 에러가 발생하는데, 객체 리터럴에서는 그냥 무시합니다.

Nullish coalescing(??) 혹은 OR(||) 연산자 등으로 안전하게 기본값을 설정할 수 있습니다.

#### Rule EX-1-6(필수): 전개 연산자 사용 시 값 덮어쓰기를 주의하세요.

전개 연산자를 사용시 가능하면 다른 속성 정의 혹은 배열 요소보다 먼저 오는게 좋습니다. 의도치않게 기존 값을 덮어 쓸 수 있습니다.

```ts
const x = {
  a: 10,
  b: 7,
};

const y = {
  a: 5,
  ...x,
};

console.log(y); // { "a": 10, "b": 7 }
```

`y.a`는 5라고 정의했으나 `x`를 전개연산하는 과정에서 `y.a` 값을 `x.a`의 값으로 덮어 썼습니다. 전개 연산의 순서는 버그의 원인 중 하나이기에 가능하면 아래와 같이 전개연산을 먼저 사용하시기 바랍니다.

```ts
const x = {
  a: 10,
  b: 7,
};

const y = {
  ...x,
  a: 5,
};

console.log(y); // { "a": 5, "b": 7 }
```

#### Rule EX-1-7(필수): 전개 연산자 사용 시 같은 타입에 사용하세요

전개 연산자는 객체 리터럴 혹은 순회 가능한 객체(배열 등)에 사용 가능합니다. 그렇기에 객체 리터럴에서 배열을 피연산자로 전개 연산을 사용할 수(!) 있습니다.

```ts
const k = ['a', 'b', 'c'];
const y = {
  a: 5,
  ...k,
};

console.log(y); // { "0": "a", "1": "b", "2": "c", "a": 5 }
```

아마 대부분 원하는 결과가 아닐거라고 생각합니다. 객체 리터럴에 전개 연산자를 사용할때는 피연산자가 객체 리터럴이어야하며, 배열에 전개 연산자를 사용할 때는 피연산자가 배열이어야 합니다.

배열에서 객체 리터럴을 전개 연산자의 피연산자로 사용할 수는 없습니다.

#### Rule EX-1-8(필수): 다차원 배열을 전개 연산자의 피연산자로 사용하지 마세요

전개 연산자는 얕은 복사로 동작하기에 다차원 배열을 복사하는 데 적합하지 않습니다. 다차원 배열은 배열 안에 또 배열의 참조를 들고있기 때문에 만약 배열을 변경시킨다면 원본 배열에 영향이 갑니다.

```ts
const a = [[1], [2], [3]];
const b = [...a];

b.shift().shift();
// 1

// 배열 'a'에 영향이 갑니다.
console.log(a);
// [[], [2], [3]]
```

위 코드에서 `b.shift()`는 `[1]`을 반환하며 `[1]`에 또 다시 `shift()`를 실행하면 `[]`이 됩니다. `a`에는 영향이 없을 걸로 생각할 수 있지만 `b.shift()` 첫 번째에서 `[1]`의 참조를 반환하고 이는 곧 `a[0]`의 참조입니다. 이 참조에서 `shift()`를 통해 첫 번째 요소를 제거하게 되면 `a`의 값인 `1`이 제거됩니다.

#### Rule EX-1-9(참고): 객체 인스턴스 생성 이후에 속성을 추가하거나 제거하지 마세요.

JavaScript 엔진은 객체를 히든 클래스(Hidden Class)라는 내부 데이터 구조로 관리합니다. JavaScript는 동적 타이핑 언어다보니 런타임에서 데이터의 타입이 정해집니다. 이 때문에 객체 인스턴스의 경우 속성에 접근하는 속도면에서 정적 타이핑 언어와 비교했을 때 불리합니다. 객체의 속성은 메모리 오프셋 값으로 접근하는데 컴파일 타임에 메모리 오프셋이 결정되는 정적 타이핑 언어와는 달리 동적 타이핑 언어는 런타임에 타입이 결정되서 이 값을 미리 알 방법이 없기 때문에 속성에 접근할 때마다 동적 탐색(dynamic lookup)을 해야합니다.

동적 탐색은 비용이 많이 들지만 동적 타이핑 언어에서는 피할수가 없습니다. 다만 Node.js 와 크롬의 근간을 이루는 `V8` JavaScript 엔진은 동적 탐색을 피하고 성능을 높이기 위해 히든 클래스(Hidden Class) 기법으로 객체를 관리합니다. (다른 JavaScript 엔진의 동작은 잘 모르겠습니다 😅)

```ts
class User {
  constructor(name: string, address: string) {}
}

const user1 = new User('김씨', '대전광역시'); // Hidden Class #1
const user2 = new User('박씨', '광주광역시'); // Hidden Class #1 (재사용)
```

위에서 `user1`, `user2`는 같은 히든 클래스를 사용합니다. 흡사 같은 틀을 사용하는 붕어빵이라고 보면 되겠습니다. 그렇기에 `user1.address` 접근은 기존에 만들어놓은 히든 클래스의 오프셋을 이용해서 바로 접근 가능합니다.

그런데, 여기서 동적으로 속성을 추가/삭제함으로서 위의 `User`의 히든 클래스의 틀이 깨진다면 어떻게 될까요? 어 저는 꼬리 없는 붕어빵이요. 저는 지느러미 없는 붕어빵이요. 주문이 들어올 때마다 틀을 다시 만들어야 합니다. 즉 새로운 히든 클래스를 만들게 되면 JIT 컴파일러가 최적화했던 코드를 다시 분석하며 이 과정에서 성능 저하가 발생합니다.

```ts
const user3 = new User('이씨', '부산광역시');
(user3 as any).email = 'lee@foo.com'; // ❌ 새로운 속성이 추가되서 기존 히든클래스 무효화
```

TypeScript 코드에서는 동적으로 속성을 추가/삭제하는 일은 잘 없지만, 가장 문제되는 경우는 `Object`를 해시맵으로 사용하는 경우입니다. 속성을 추가할때마다 새로운 히든 클래스를 만들기에 성능 저하가 발생합니다.

```ts
const objDict = {}; // 새로운 히든 클래스 생성
objDict.name = '한씨'; // 새로운 히든 클래스 생성
objDict.email = 'email@email.com'; // 새로운 히든 클래스 생성
objDict.age = 99; // 새로운 히든 클래스 생성
```

이는 뒤에 나오는 `SD-2-10(권장): 해시맵이 필요할 때 Object대신 Record 혹은 Map을 사용하세요.` 규칙을 참고하세요.

#### Rule EX-1-10(필수): `==` 대신 `===`을 사용하세요.

JavaScript에서는 다른 프로그래밍 언어에도 있는 연산자인 `==` 연산자가 존재합니다. 거기에 덧붙여 `===` 연산자도 있습니다. `==`는 `비교 연산자(Equality)`라 부르며 `===`는 `엄격한 비교 연산자(Strict equality)`라고 합니다. 문젠 `=` 하나 차이인데 두 연산자의 동작이 매우 다릅니다.

`==`는 타입을 자동 변환해서 비교하지만, `===`는 타입 변환 없이 값과 타입을 모두 비교합니다. 이 자동 변환 과정때문에 프로그래머가 예상치 못한 결과를 받아볼 수 있습니다.

```ts
console.log(false == ''); // true  -> 빈 문자열은 false로 변환
console.log(false === ''); // false -> 다른 타입

console.log(0 == '0'); // true  -> 타입 변환 발생
console.log(0 === '0'); // false -> 다른 타입

console.log(null == undefined); // true  -> 둘 다 "없음"을 의미한다고 간주
console.log(null === undefined); // false -> 다른 타입
```

따라서 언제나 `===`을 사용하세요. `==`와 `===`의 비교표는 이 [링크](https://dorey.github.io/JavaScript-Equality-Table/)를 참고하세요.
