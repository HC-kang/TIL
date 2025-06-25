---
id: 09-built-in-objects
title: Standard Built-in Objects and Functions
---

# 9. 표준 내장 객체 및 함수(Standard Built-in Objects/Functions, SD)

[[00-index]]

### 9.1 일반

#### Rule SD-1-1(필수): Deprecated 되거나 구식 기능을 사용하지 마세요.

JavaScript 표준이 아니거나, 지원이 중단된 기능을 사용하지 마세요.

- `with`문과 같이 더 이상 지원하지 않는 기능은 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features)에서 확인하실 수 있습니다.
- TC39에서 제안되었지만 아직 정식 기능이 아닌 기능을 사용하지 마세요. 2025.02.11 기준으로 예를 들면 `Temporal`이 있습니다.

### 9.2 표준 내장 객체

#### Rule SD-2-1(필수): `Array.prototype.map()`은 호출한 `Array`의 요소의 값 만 변경시켜야 합니다.

`Array.prototype.map()`은 `Array` 에서 가장 많이 사용하는 메서드 중 하나입니다. `map()`의 콜백 함수는 배열 내부의 값을 변경시키는 부수 효과(Side Effect)를 일으킵니다. 하지만 배열 내부 외의 값 외에 다른 값을 변경시키는 부수 효과가 콜백 함수 안에 같이 있기도 합니다. 아래 코드를 참고하겠습니다.

```ts
const itemPrices = [10000, 18000, 40000];
let total = 0;
const withTax = itemPrices.map((itemPrice) => {
  total += itemPrice;
  return itemPrice * 1.1;
});

console.log(withTax); // [11000, 19800, 44000]
console.log(total); // 68000
```

`map()`의 콜백 함수 내에서 배열 값이 아닌 `total`의 값을 계속 변경시키고 있습니다. 위 코드는 안티 패턴입니다. 이 경우 배열을 두 번 순회하도록 코드를 수정해야 합니다.

```ts
const itemPrices = [10000, 18000, 40000];
const total = itemPrices.reduce((acc, itemPrice) => acc + item, 0);
const withTax = itemPrices.map((itemPrice) => itemPrice * 1.1);
```

원본 배열의 값을 변경시키지 않는 복사 메서드(Copying Method)는 순수 함수와 함께 사용하는 것이 가장 좋기 때문에 권장하지 않습니다.

#### Rule SD-2-2(필수): `Array.prototype.map()`의 반환 값을 반드시 사용하세요

위의 규칙을 너무 신봉한 나머지 정말 조심스럽게 배열 내의 속성의 값만 수정하는 코드를 작성했습니다.

```ts
const items = [
  { name: 'WFG', price: 10000 },
  { name: 'THC', price: 18000 },
  { name: 'CCC', price: 40000 },
];

items.map((item) => {
  item.price = item.price * 1.1;
});
```

코드 작성자가 조심하긴 했지만 이 역시 안티 패턴입니다. `map()`의 반환 값을 사용하지 않는다면 `map()`의 원래 목적인 배열 내 각 요소의 변환이라는 목적에 어긋나게 사용하고 있을 가능성이 매우 높습니다. 이 경우 `Array.prototype.forEach()` 혹은 `for...of` 반복문을 사용시기 바랍니다. `map()`은 복사 메서드로 얕은 복사를 하기 때문에 성능에 미치는 영향은 크지 않습니다.

```ts
items.forEach((item) => {
  item.price = item.price * 1.1;
});
```

#### Rule SD-2-3(필수): `Array` 생성자를 사용하지 마세요

`Array` 생성자를 사용하지 마세요. 매개 변수의 갯수와 타입에 따라 `Array()` 생성자 사용 시 혼동을 초래할 수 있습니다.

아래는 `Array` 생성자의 문법입니다.

```ts
new Array();
new Array(element0);
new Array(element0, element1);
new Array(element0, element1, /* …, */ elementN);
new Array(arrayLength);
```

`Array` 생성자는 `new`를 붙이거나 붙이지 않아도 모두 새로운 인스턴스를 생성하며 `new`의 존재 유무와 상관없이 매개 변수와 기타 문법은 모두 동일합니다. `Array` 생성자는 설계에 크게 2가지 문제가 있습니다.

첫 번째, 인자의 타입에 따라 동작이 다릅니다. `Array` 생성자에 전달된 인수가 하나이며 해당 인수가 0에서 2^32 - 1(포함) 사이의 정수인 경우, `length` 속성이 해당 숫자로 설정된 새 배열을 반환합니다. 만약 정수가 아니라면 전달된 유일한 인수가 요소가 되는 새로운 배열을 반환합니다.

```ts
// new Array(element0)
const a = new Array(2); // [undefined, undefined]
// new Array(arrayLength)
const b = new Array('B'); // ['B']
```

두 번째, 인자의 갯수에 따라 동작이 다릅니다. 앞서 `Array` 생성자의 인수가 2^32 - 1(포함) 사이의 정수인 경우 하나일 경우와 여러 개일 경우의 동작이 다릅니다. 전자는 `length` 속성이 인수의 숫자로 설정된 새로운 배열을 반환하지만 후자는 주어진 인자가 요소가 되는 새로운 배열을 반환합니다.

```ts
// // new Array(arrayLength)
const a = new Array(2); // [undefined, undefined]
// // new Array(element0, element1)
const b = new Array(2, 3); // [2, 3]
```

`Array` 생성자 대신 중괄호 표기법으로 배열의 값을 초기화하고 길이를 지정하시기 바랍니다.

```ts
const a = [2];
const b = [2, 3];
```

#### Rule SD-2-4(필수): `Array.prototype.forEach()` 내에서 값을 반환하지 마세요.

`Array.prototype.forEach()` 콜백 함수 내에서 값을 반환하는 것은 아무 의미가 없으며, 대부분의 경우 의도하지 않은 오해를 일으킬 수 있습니다.

```ts
const someNumbers = [1, 2, 3];
const result = someNumbers.forEach((num) => {
  return num * 2; // ❌ 값 반환
});
```

`Array.prototype.forEach()`는 배열의 각 요소에 대해 제공된 콜백 함수를 실행할 뿐이며, 결과 값을 반환하지 않습니다. `Array.prototype.forEach()`는 중단할 수 없는 반복문이기 때문에 콜백 함수 내에서 `return`을 사용하더라도, 이는 단지 해당 반복의 콜백 함수 실행을 종료할 뿐이며 그 다음 요소에 대한 콜백 함수 호출은 계속 진행됩니다.

데이터 변환이 목적이라면 `Array.prototype.map()`을 사용하세요.
조건에 따라 반복을 중단하려면 `Array.prototype.forEach()` 대신 `for` 혹은 `for...of` 반복문을 사용하세요.

#### Rule SD-2-5(필수): `Array.prototype.forEach()`에서 `await` 를 사용하지 마세요

`Array.prototype.forEach()`는 콜백 함수로 동기 함수가 필요합니다.

```ts
const someNumbers = [1, 2, 3];
let sum = 0;

const addTwoNumber = async (a, b) => a + b;
somNumbers.forEach(async (num) => {
  sum = await addTwoNumber(sum, num);
});

console.log(sum); // 6이 아니라 실제 출력은 0
```

콜백 함수 내에서는 프로미스를 기다리지 않기 때문에 실제 기대하는 동작과 다른 동작을 할 가능성이 높습니다.

#### Rule SD-2-6(필수): `Array` 순회 가능한 메서드의 콜백 함수 내에서 대상 Array 값을 수정하지 마세요

`Array.prototype.forEach()`같이 배열의 각 요소를 접근하면서 콜백 함수를 실행하는 메서드를 순회 메서드(Array iterator method)라고 합니다.(전체 메서드는 본 규칙의 하단 참고)

순회 메서드는 호출하는 배열의 값을 변경하지 않지만 제공한 콜백 함수는 그 값을 변경시킬 수 있습니다. 하지만 콜백 함수에서 콜백 함수를 실행하는 배열의 삭제 및 삽입은 이해와 예측이 어려운 코드를 만드는 경우가 많기 때문에 일반적으로 지양해야 합니다.

아래 함수가 있습니다.

```ts
function testSideEffect(effect) {
  const arr = ['e1', 'e2', 'e3', 'e4'];
  arr.forEach((elem, index, arr) => {
    console.log(`array: [${arr.join(', ')}], index: ${index}, elem: ${elem}`);
    effect(arr, index);
  });
  console.log(`Final array: [${arr.join(', ')}]`);
}
```

함수를 실행시키면 콘솔 로그는 아래와 같이 출력됩니다.

```ts
testSideEffect((arr, index) => {
  if (index === 1) arr.splice(2, 0, 'new');
});

// "array: [e1, e2, e3, e4], index: 0, elem: e1"
// "array: [e1, e2, e3, e4], index: 1, elem: e2"
// "array: [e1, e2, new, e3, e4], index: 2, elem: new"
// "array: [e1, e2, new, e3, e4], index: 3, elem: e3"
// "Final array: [e1, e2, new, e3, e4]"
```

`e4`를 순회하지 않았습니다. 콜백 함수는 순회 메서드에서 호출이 시작되었을 때 배열의 초기 `length` 값을 읽고 0과 `length - 1` 사이의 요소를 순회한다는 점입니다. 즉 중간에 요소가 추가되어서 `length`가 4에서 5로 늘어나도 새로 추가된 4번째 인덱스를 방문하지 않습니다.

콜백 함수에서 요소를 삭제하면 어떤 일이 일어날까요? 아래 예제를 보겠습니다.

```ts
testSideEffect((arr, index) => {
  if (index === 1) arr.splice(2, 1);
});

// "array: [e1, e2, e3, e4], index: 0, elem: e1"
// "array: [e1, e2, e3, e4], index: 1, elem: e2"
// "array: [e1, e2, e4], index: 2, elem: e4"
// "Final array: [e1, e2, e4]"
```

`length`는 여전히 4이기 때문에 `length-1`값인 인덱스 3에 접근하려 했지만 범위를 벗어났기 때문에 더 이상 배열을 순회하지 않습니다.

이처럼 내부에서 요소를 추가/삭제하는 행위는 그 결과를 예측하기 힘들기 때문에 사용하지 마시기 바랍니다.

참고1. 순회 `Array` 메서드

- [`Array.prototype.every()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`Array.prototype.filter()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [`Array.prototype.find()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`Array.prototype.findIndex()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [`Array.prototype.findLast()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
- [`Array.prototype.findLastIndex()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
- [`Array.prototype.flatMap()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [`Array.prototype.forEach()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [`Array.prototype.map()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [`Array.prototype.some()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

#### Rule SD-2-7(권장): `Array` 메서드 사용시 가능하면 불변을 유지하는 메서드를 사용하세요.

2023년 7월 이후로 `Array`에 아래와 같은 새로운 메서드가 추가되었습니다.

- Array.prototype.toReversed()
- Array.prototype.toSorted()
- Array.prototype.toSpliced()

이는 각각 `Array.prototype.reverse()`, `Array.prototype.sort()`, `Array.prototype.splice()`의 또 다른 버전입니다. 크게 다른 점은 호출한 원본 배열을 변경시키는 기존 메서드와는 달리 기존 배열을 변경시키지 않고 메서드가 처리한 결과값을 복사본으로 반환합니다.

기존 배열은 불변한다는 이점이 있으니 `Array.prototype.reverse()`, `Array.prototype.sort()`, `Array.prototype.splice()`대신 해당 메서드를 권장합니다.

#### Rule SD-2-8(필수): 전역 함수보다는 `Number` 전역 객체의 함수를 사용하세요.

JavaScript의 초기 설계 이슈 문제로 숫자를 다루는 `parseInt()`, `parseFloat()`등의 함수와 `Infinity`와 같은 상수가 전역 함수 및 상수로 정의되었습니다. JavaScript가 이렇게 흥할지 모르고 가벼운 마음에 이렇게 설계했지만 웹을 지탱하는 언어가 된 이후로는 네임스페이스 오염, 일관성 부족 등 많은 문제를 야기했습니다.

이 문제를 알고있었기에 ES6 이후로는 `Number` 전역 객체가 이를 모두 커버하게 되었습니다. 아래 전역 함수는 모두 `Number` 전역 객체의 메서드 혹은 상수의 값을 사용하시기 바랍니다.

- `parseInt()` 대신 `Number.parseInt()`
- `parseFloat()` 대신 `Number.parseFloat()`
- `isNan()` 대신 `Number.isNan()`
- `isFinite()` 대신 `Number.isFinite()`
- `Infinity` 대신 `Number.POSITIVE_INFINITY`
- `-Infinity` 대신 `Number.NEGATIVE_INFINITY`

#### Rule SD-2-9(필수): `String` 전역 객체의 `trimLeft()`, `trimRight()`보다 `trimStart()`, `trimEnd()`를 사용하세요.

`String.prototype.trimLeft()`, `String.prototype.trimRight()` 보다 `String.prototype.trimStart()`, `String.prototype.trimEnd()`를 사용하세요.

과거에는 문자열 시작과 끝의 공백 등의 문자를 정리하기 위해 `trimLeft()`, `trimRight()`가 있었습니다. 하지만 이 API 명 자체가 좌에서 우로 쓰는 영어 등의 언어 등에 맞춰져 있기 때문에 아랍어와 같이 우에서 좌로 사용하는 언어에 사용하거나, 세로쓰기일 경우 그 뜻이 모호한 문제가 있었습니다. 마침 `padStart()`, `padEnd()`가 표준으로 채택되면서 이 API와의 일관성을 맞출 필요가 생겼습니다. 마침내 ES2019에서 `trimStart()`와 `trimLeft()`를 언급하면서, `trimStart()` 사용을 권장하게 되었습니다.

일부 JS 엔진은 `trimLeft()`, `trimRight()`를 그저 `trimStart()`, `trimEnd()`의 별칭(alias)으로만 사용하기도 합니다.

#### Rule SD-2-10(권장): 해시맵이 필요할 때 `Object`대신 `Record` 혹은 `Map`을 사용하세요.

많은 프로그래밍 언어에서는 키(key)와 값(value) 쌍의 집합 데이터 타입을 지원합니다. 마치 인덱스가 있는 사전과 같기에 흔히 `dictionary`라고도 하고 `map`, `hashmap`이라고도 합니다.

`Map` 전역 객체가 등장하는 ES6 이전에는 JavaScript에서는 이 해시맵이 없었기 때문에 그냥 Object를 사용했었습니다. 하지만 Object 타입은 해시맵으로 사용하기엔 아래와 같은 몇 가지 문제가 있습니다.

- Object에서는 해시맵의 전체 크기를 쉽게 알기 힘듭니다. `Object.keys()`를 통해 반환된 배열의 `length`를 구하는게 일반적입니다. 여기서 오는 비효율은 덤입니다.
- Object 에서는 문자열과 Symbol 만이 키가 될 수 있습니다. 기타 데이터는 모두 암묵적으로 문자열로 변환됩니다.
- Object 에서는 삽입 순서는 고려하지 않습니다.
- Object는 프로토타입이 있습니다. 우발적으로 키가 겹칠 가능성이 있습니다.
- Object는 값에 타입의 제약이 없고 타입 안정성이 약하기에 TypeScript 컴파일러나 IDE의 도움을 받기 어렵습니다.
- `Map`에 비해 성능이 뒤처집니다.

대안은 크게 2가지 입니다. 하나는 TypeScript에서 제공하는 `Record<K, V>` 유틸리티 타입을 사용, 또 다른 하나는 ES6 이후로 지원되는 `Map` 전역 객체를 사용하는 것입니다.

**대안1. `Record<K,V>` 사용**

TypeScript의 유틸리티 타입으로서, `type Record<K extends keyof any, V> = { [P in K]: V; };` (`K`는 키의 타입으로 주로 `string`, `number`, `symbol`이겠구요, `V`는 값의 타입입니다.)이라는 문법을 지닙니다.

```ts
const x: Record<string, any> = { a: 1 };
const y: Record<number, any> = { 1: 'abc' };
```

얼핏보면 `Object`와 비슷해보이지만, 어떠한 값이건 허용하는 `Object`와는 달리 타입을 좁힐 수 있습니다.

```ts
const obj: Object = {};
obj['name'] = 'Kim';
obj['no'] = 399;
obj[100] = 'test';
console.log(obj); // { "name": "Kim", "no": "399", "100": "test" }

const myRecord: Record<number, any> = {}; // 키는 number로 제한
myRecord[100] = 'test'; // 정상
myRecord['name'] = 'Kim'; // 에러. 키는 number 여야 함
console.log(myRecord); // { "100": "test" }
```

`Record` 유틸리티 타입을 TypeScript 컴파일러가 컴파일 한 결과는 `Object`와 같습니다. 즉, 런타임에서는 단순한 Object로 동작한다는 말입니다. 그렇기에 `Object`의 성격은 그대로 지니지만 TypeScript 컴파일러의 도움을 받아 컴파일 이전에 키와 값의 타입을 제약할 수 있으며 별도의 타입 별칭을 사용할 수 있습니다.)

또한 순수한 키-값 데이터 저장 용도로 사용하려면, 프로토타입을 제거해야 하는 작업(`Object.create(null)`)이 필요합니다.

**대안2. `Map` 사용**

`Map`은 ES6에서 키와 값의 쌍을 관리하기 위한 전역 객체입니다. `Object`와는 달리 본격적으로 해시맵을 위해 탄생한 친구인지라 해시맵 관리를 위한 삽입, 조회, 삭제 등의 메서드와 속성이 구비되어 있습니다.

```ts
const x = new Map<string | number, any>();
x.set('name', 'Kim');
x.set('no', 399);
x.set(123, 'abc');

console.log(x.get('name')); // 'Kim'
console.log(x.get('age')); // undefined
console.log(x.get(123)); // 'abc'
console.log(x.size); // 3
```

해시맵을 위해 `Object`대신 `Map`을 사용하면 아래의 장점이 있습니다.

- 문자열 혹은 Symbol 만 가능한 `Object`와는 달리 임의의 키 타입을 지원합니다. 심지어 객체나 함수도 가능합니다.
- `Object`와는 달리 삽입 순서가 유지됩니다.
- 키-값 쌍 조작에서 성능이 좋습니다. 벤치마크 결과에 따라 다르지만 추가, 삭제는 `Object`와 큰 차이는 안나지만 대용량 데이터를 다룰 때 메모리 사용량과 조회 시간이 압도적으로 좋습니다.
- 해시맵 관리를 위한`get`, `set` 등의 내장 메서드와 속성이 있어서 편하게 데이터 관리가 가능합니다.

단점도 존재합니다. `Object`와 달리 JSON 직렬화가 안됩니다. `Object`는 가능하며(주1) `Record`는 내부적으로는 `Object`이기 때문에 `Record` 역시 가능합니다.

(주1: 애당초 JSON의 약자가 JavaScript Object Notation, 즉 JavaScript 객체 표기법...)

정리하자면

- `Object`를 사용하기 보다는 `Record` 유틸리티 타입을 사용하시기 바랍니다.
- `Map`이 언제나 뛰어나진 않습니다. 상황에 맞춰 `Record`와 `Map` 중 택일해서 사용하세요.
- `Record`가 적합한 경우
  - 정적인 키-값 매핑(특정 키 집합(예: `'KO' | 'JP' | 'CN'`) 또는 문자열 기반 키)이 필요할 때
  - 컴파일 타임에 키와 값의 타입을 엄격히 제한해야 할 때
  - 상대적으로 다뤄야할 데이터가 간단하고 크기가 크지 않을 때
- `Map`이 적합한 경우
  - 키가 동적으로 생성되거나 문자열 외의 타입을 가질 때
  - 삽입 순서 유지가 필요할 때
  - 상대적으로 다뤄야할 데이터가 클 경우

#### Rule SD-2-11(권장): Unix Time Epoch를 구할때 `Date.now()`를 사용하세요.

1970년 1월 1일 00:00:00 UTC 부터 현재까지의 총 초(second)를 Unix Time 혹은 Unix Epoch Time 이라고 합니다.

```ts
const x = new Date().getTime();
const y = new Date().valueOf();
```

`Date` 객체 인스턴스의 `getTime()` 혹은 `valueOf()`는 밀리세컨드 단위의 Unix Time 을 반환합니다. 다만 객체를 생성해야 하는데요, 객체를 생성하지 않고 현지 시간의 Unix Time을 구하려면 정적 메서드인 `now()`를 사용하세요.

```ts
const x = Date.now();
```

### 9.3 표준 내장 함수

#### Rule SD-3-1(필수): `eval()`을 사용하지 마세요

JavaScript의 전역 함수 중 `eval()`이라는 함수는 매개 변수로 주어진 문자열을 그대로 실행합니다.

```js
eval('console.log("hello")');
```

많은 JavaScript 문서에서 `eval`의 문제점을 마르고 닳도록 이야기 하고 있습니다. 가장 큰 이유는 바로 보안입니다. 만약 `eval()`의 매개변수로 주어진 문자열이 외부에서 온 문자열이고 이를 그대로 전달하면 코드 인젝션 공격(Code Injection Attack)에 취약해집니다. 공격자는 이 취약점을 찾아 시스템에 피해를 끼치거나 데이터를 탈취할 수 있습니다.

사용하지 않아야 하는 이유 중 보안이 가장 크고 절대적이지만 추가적으로 몇 가지 이유를 더 들겠습니다.

1. 성능 저하: JavaScript 엔진은 코드를 실행 전 최적화를 수행합니다. 하지만 `eval()`에서 실행하는 코드는 최적화가 어렵기 때문에 성능 저하가 있을 수 있습니다.
2. 디버깅 및 정적 코드 분석의 어려움: `eval()`은 실행 중에 코드를 동적으로 생성하고 실행하기 때문에 디버깅도 어렵고 각종 정적 분석 도구의 지원을 받을 수 없습니다.
3. 가독성 및 유지보수의 어려움: `eval()`을 사용하면 코드의 동작을 한 눈에 파악할 수 없고 특히나 외부에서 오는 코드에 의존적일 경우 유지보수가 더욱 힘듭니다.
4. 엄격한 `Content Security Policies`가 적용될 경우에는 실행되지 않습니다.

#### Rule SD-3-2(권장): 객체 깊은 복사가 필요할 때 `structuredClone()`을 사용하세요

개발을 하다보면 객체를 깊은 복사(Deep Copy)해야할 때가 있습니다. 아래처럼 하는건 얕은 복사(Shallow Copy)입니다.

```ts
const x = { a: 1 }; // 예제라서 타입 정의 생략
const y = x;
y.a = 2;
console.log(x, y);
// { "a": 2 }, { "a": 2 }
```

얕은 복사는 객체의 레퍼런스만 할당하기 때문에 - 즉 `x`와 `y`는 같은 객체를 가리키기 때문에 `y`의 속성을 변경하면 `x`의 속성도 변경됩니다. 따라서 깊은 복사 시에는 아래와 같은 코드를 많이 사용했었습니다.

```ts
const clone = JSON.parse(JSON.stringify(x));
```

이 경우 `x`의 타입이 유실되면서 `any`타입으로 변경되고, TypeScript의 타입 체킹 지원을 못받게 됩니다. 이 때문에 깊은 복사는 써드파티 라이브러리인 `lodash`의 `cloneDeep()` 메서드를 사용하곤 했는데요, Node 17, Chrome 98, Firefox 94 버전부터 지원한 `structuredClone()`을 사용하면 깊은 복사를 손쉽게 할 수 있으며 타입도 유실되지 않기 때문에 TypeScript의 타입 지원도 받을 수 있습니다.

```ts
const clone = structuredClone(x);
```

하지만 이도 만능은 아닙니다. 객체에 함수가 있으면 `DataCloneError` 예외가 발생합니다. 아래는 `structuredClone()`에서 지원하는 데이터 타입입니다.

- Array
- ArrayBuffer
- Boolean
- DataView
- Date
- Error ( Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError 만 지원)
- Map
- Number
- Object 객체: 객체 리터럴같은 일반 객체만 지원합니다.
- Symbol을 제외한 원시 타입
- RegExp: `lastIndex` 값은 보존되지 않습니다.
- Set
- String
- TypedArray
