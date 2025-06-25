---
id: 02-types
title: Types
---

# 2. 타입(Types, TP)

[[00-index]]

### 2.1 원시 타입(Primitive Type)

#### Rule TP-1-1(필수): 원시 타입(Primitive Type)은 래퍼(Wrapper) 객체를 사용하지 마세요.

TypeScript에서는 원시 타입(`string`, `number`, `boolean`, `symbol`)에 대한 래퍼 클래스(`String`, `Number`, `Boolean`, `Symbol`)를 제공합니다. `hi` 라는 문자열로 변수를 초기화할 때 아래와 같이 사용할 수 있습니다.

```ts
const greeting1 = 'hi';
const greeting2 = new String('hi');
```

하지만 래퍼 객체를 사용할 경우 몇 가지 문제점이 있습니다.

첫 번째, 예상치 못한 동작을 마주할 수 있습니다. 예를 들어 아래 코드를 살펴보겠습니다.

```ts
const str1: string = 'hello';
const str2: String = new String('hello');

console.log(typeof str1); // "string"
console.log(typeof str2); // "object"
```

`typeof` 연산자를 썼을 때 값이 다르다는 것을 확인할 수 있습니다.

더 큰 문제는 아래와 같은 비교연산자를 사용할 때인데, 코드를 작성한 이는 당연히 `str1`과 `str2`이 같다고 인지하겠지만 결과는 다릅니다.

```ts
console.log(str1 === str2); // false
```

두 번째, 메모리와 성능 문제

래퍼 객체는 객체이기 때문에 원시형에 비해 더 많은 메모리를 소비하며, 객체를 생성하고 관리(가비지 컬렉션 등)하는 오버헤드 때문에 원시형에 비해 느립니다. TypeScript가 래핑하고 있는 JavaScript는 필요할 때 자동으로 원시값을 임시 객체로 래핑하기에, 원시값에서도 메서드를 직접 호출할 수 있어 래퍼 객체가 불필요합니다.

```ts
const someStr = ' hello ';
console.log(someStr.trim());
```

세 번째, 타입 시스템에 혼란을 야기할 수 있습니다.

아래 예를 보시겠습니다. 프로그래머는 `string`형과 `String`형을 동일하게 취급한다고 가정하고 코드를 작성했습니다.

```ts
function printLength(value: string) {
  console.log(value.length);
}

printLength('hello'); // ✅ 정상 동작
printLength(new String('hello')); // ❌ 컴파일 에러
```

위 코드에서는 두 번째 `printLength()` 호출 시 컴파일 에러가 발생합니다. 이를 고치려면 아래와 같이 불필요하고 번거롭게 타입 정의를 해야합니다.

```ts
function printLength(value: string | String) {
  console.log(value.length);
}
```

TypeScript는 원시 타입 사용을 기본으로 하고 있습니다. 따라서 래퍼 객체를 사용하면 코드의 타입 안전성과 가독성이 저하될 수 있습니다.

#### Rule TP-1-2(필수): `Object`타입과 `Object` 생성자를 사용하지 마세요.

`Object`는 단순히 `{ a: 1, b: 2}`와 같은 객체(object) 래퍼 타입 같지만 실질적으로는 더 느슨한 타입이며 실상은 `any`에 가깝습니다.

```ts
let obj: Object; // 혹은 let obj = new Object();
obj = 'Hi'; // 허용
obj = 1; // 허용
obj = true; // 허용
obj = { a: 1 }; // 허용
obj = null; // 허용(tsconfig의 'strict: off' 시 가능)
obj = undefined; // 허용(tsconfig의 'strict: off' 시 가능)
obj = () => {}; // 허용
```

TypeScript를 사용하는 가장 큰 이유가 바로 "타입"때문인데, `Object`를 사용하면 의도한 타입을 강제하지 못하고 TypeScript의 이점을 모두 잃게 됩니다.

만약 정말 객체 타입을 사용하고 싶으시다면 `Object` 대신 `object` 타입을 사용하세요. `object`는 객체 타입만을 허용하며, 원시 타입을 제외합니다.

```ts
let obj: object;

obj = { a: 1 }; // 허용
obj = [1, 2, 3]; // 허용
obj = () => {}; // 허용

obj = 42; // 오류: Type 'number' is not assignable to type 'object'.(2322)
obj = 'Hello'; // 오류: Type 'string' is not assignable to type 'object'.(2322)
```

빈 객체를 만드시려면 아래와 같이 간결한 방법을 사용하세요.

```ts
let obj = {};
```

### 2.2 undefined, null

#### Rule TP-2-1(필수): `undefined`과 `null`을 구분해서 사용하세요

TypeScript에서는 `null`과 `undefined`는 값이기도 하면서 타입이기도 한 특수한 존재입니다.

```ts
const x: string | null = null;
const y: number | undefined = undefined;
```

`undefined`와 `null`을 간단하게 비교, 설명드리자면 아래와 같습니다.

|      | `undefined`                       | `null`                               |
| ---- | --------------------------------- | ------------------------------------ |
| 설명 | 값이 할당되지 않은 변수의 초기 값 | "값이 없다"는 것을 명시적으로 나타냄 |
| 타입 | `undefined`                       | `object`                             |
| 할당 | JavaScript 엔진이 자동 할당       | 개발자가 명시적으로 할당             |

종종 이 값을 혼동하는 분들이 계셔서 아래의 짤로 설명하곤 합니다.

![휴지 걸이](./images/tp-2-1-1.png)

설명하자면 아래와 같습니다.

- 휴지 걸이에 휴지가 남아있는 화장지가 걸려있을 경우: 0이 아닌 값
- 휴지 걸이에 화장지가 걸려있으나 사용할 수 있는 휴지가 없는 경우(휴지심 만 있는 경우): 0
- 휴지 걸이에 화장지 자체가 걸러있지 않은 경우: null
- 휴지 걸이 자체가 없는 경우: undefined

`undefined`과 `null` 모두 [거짓같은 값(Falsy)](https://developer.mozilla.org/ko/docs/Glossary/Falsy)이기 때문에 `if`문으로 값의 존재 유무를 확인하는데는 아무 문제 없지만, ORM류의 특정 라이브러리에서는 문제가 될 수 있습니다. 예를 들어 테이블 레코드 업데이트나 삽입 시에 속성이 `undefined`라면 이 값을 업데이트나 삽입 시에 제외시키지만, `null`이라면 테이블의 해당 컬럼 값을 `null`로 처리해버립니다.

#### Rule TP-2-2(필수): 타입 별칭에 `null`이나 `undefined`을 포함하지 마세요.

타입 별칭(`type`)에 union 타입으로 `null`이나 `undefined`이 포함되서는 안됩니다.

```ts
// ❌ 안 좋은 코드
type OperationSystem = 'Windows' | 'MacOS' | 'Linux' | undefined;
```

`null` 혹은 `undefined`가 포함된 타입 별칭은 어플리케이션 모든 곳을 돌아다니면서 이 값을 전파하며, 언제 이 값이 존재하고 존재하지 않는지 불확실하게 만듭니다.

만약 정말로 `null` 혹은 `undefined`가 필요하다면 해당 타입을 다루는 코드와 가장 근접한 곳에서 추가로 정의하여 사용하시기 바랍니다.

```ts
type OperationSystem = 'Windows' | 'MacOS' | 'Linux';

function findOperationSystem(name?: OperationSystem) {
  // ...
}
```

#### Rule TP-2-3(필수): `| undefined` 대신 `?`을 사용하세요

TypeScript 에서는 `undefined`일 수도 있는 타입에 대해서는 union 타입으로 `| undefined`를 넣기보다는 옵셔널 필드 혹은 매개변수를 사용하시기 바랍니다. 옵셔널 필드 혹은 매개변수는 정의된 타입에 암시적으로 `undefined` 타입을 추가합니다.

```ts
interface Hoody {
  size: 'XL' | 'L' | 'M' | 'S' | 'XS';
  color?: string; // color: string | undefined; 와 동일
}

function buyHoody(address?: string): void {
  // ...
}
```

### 2.3 구조적 타입(Structural Type)

#### Rule TP-3-1(권장): 가능하면 `type` 대신 `interface`를 사용하세요.

현재 TypeScript에서 `type`과 `interface`는 일면 비슷합니다. 하지만 버전 4.2 이전은 그렇지 않았습니다.

TypeScript 4.2 버전 이전에는 타입 별칭 선언(type alias declaration)을 사용하면 `.d.ts`출력이 훨씬 더 커지는 문제가 있었습니다. 타입 별칭 선언은 경우에 따라 타입 별칭의 내용이 중복해서 인라인으로 처리하는 반면 인터페이스는 항상 이름으로 참조되기 때문이었습니다.

현재는 `union`및 interchange 유형에 대한 유형 별칭을 보존하도록 수정했기 때문에 해당 문제는 사라졌고 일부 개발자들은 `interface`보다 `type`을 선호하기 시작했습니다.

하지만 `type`보다 `interface`를 먼저 고려해야하는 건 교차(intersection) 타입을 정의 및 사용할 때 입니다.

```ts
interface A {
  x: number;
}

interface B {
  x: string;
}

interface C extends A, B {} // 에러 발생! (x의 타입 충돌)
```

`interface`는 속성 충돌을 감지하는 단일 평면 객체 유형을 생성합니다. 반면 type은 속성을 재귀적으로 병합할 뿐, 어떤 경우에는 `never`를 생성합니다.

```ts
type A = { x: number };
type B = { x: string };

type C = A & B; // x는 never
```

또한 `interface`의 타입 관계는 캐시되지만, 인터섹션 타입(`type & type`)은 전체를 다시 검사해야 합니다.

```ts
interface A {
  foo: string;
}

interface B extends A {}

const obj: B = { foo: 'hello' }; // 빠른 타입 검사 가능

type A = { foo: string };
type B = { foo: string };
type C = A & B;

const obj: C = { foo: 'hello' }; // 전체 타입을 다시 검사함
```

이 때문에 성능 문제가 있을 수 있습니다.

이런 이유로 객체 타입 간의 교차 유형을 만들때는 `interface`를 사용하는게 좋습니다. 그리고 객체 타입 외 원시 타입, 튜플 타입, 객체 타입이 아닌 타입 간의 교차 타입은 타입 별칭을 사용하는게 좋습니다.

#### Rule TP-3-2(권장): 구조적 타이핑은 가능하면 `class` 대신 `interface` 혹은 `type`을 사용하세요.

`class`는 JavaScript, TypeScript 모두 지원하는 문법입니다. 따라서 TypeScript 를 컴파일해도 `class`는 그대로 결과물로 나온 `.js`파일에 들어갑니다. 하지만 `interface`나 `type`은 타입 정보만 담고 있기 때문에 컴파일하면 결과물로 나온 `.js`에 들어가지 않습니다.

따라서 instanceof, 데코레이터나 리플렉션 등 런타임에서 해당 구조적 타입을 다룰 일이 있다면 사용해야하지만 단순히 구조적 타이핑 용도로만 사용한다면 `interface` 혹은 `type`을 사용하시기 바랍니다.

### 2.4 any

#### Rule TP-4-1(필수): `any`를 가능하면 사용하지 마세요

`any`타입은 뜻 그대로 어떠한 타입이든 허용하는 타입으로 TypeScript의 타입 체크를 완전히 우회합니다. 타입을 집합으로 생각할때 `any`타입은 다른 모든 타입의 상위 집합, 즉 전체 집합입니다. 또한 모든 속성을 역참조할 수 있습니다. 그렇기에 `any`는 TypeScript에서 가장 유연하면서 가장 위험한 타입입니다.

타입을 통해 안정성을 높이기 위한 TypeScript 이렇게 위험한 타입이 왜 들어왔을까요? TypeScript는 기본적으로 타입이 없는 기존 JavaScript에 타입 정보를 넣음으로서 컴파일 타임에 최대한 버그를 잡고 프로그램의 안정성을 높이고자 만들어졌습니다. 기존 방대한 JavaScript 프로젝트의 변수, 매개변수, 함수에 하나하나 타입을 달아야지 동작했다면 아마 TypeScript는 시작도 못하고 역사 속으로 사라졌을겁니다.

기존 시스템을 개선하는 것이 주목적인 이유 때문에 TypeScript 의 타입 시스템은 다른 강타입 언어와는 달리 있어도 되고 없어도 되기에 선택적입니다. 일부에만 적용하면서 점점 늘려나갈 수 있기 때문에 점진적이기도 합니다. 이 점진적 적용에 JavaScript와 TypeScript를 이어주는 핵심이 바로 `any` 타입입니다.

다만 이 점진적 적용이 끝난 TypeScript 프로젝트에서는 적극적으로 `any` 사용을 피해야합니다. TypeScript는 타입 체크를 하지 않기 때문에 결과를 예상하기 힘들며 런타임에서 버그가 발생할 가능성이 높아집니다. 제일 큰 문제는 `any`의 전파력입니다.

```ts
let a: any;
let b: number;

const c = a + b; // c는 any
```

`a`와 `b`를 더한 `c`를 반환하는 코드인데, 여기서 `a`가 `any`타입이기 때문에 TypeScript는 `c`의 타입을 `any`로 추론합니다. 이렇게 `any`와 엮이게 되면 타입 추론을 할 수 없고 이 값이 여기저기 쓰이게 되면 시스템 전반적으로 타입 추론을 할 수 없게 되며 결국 TypeScript의 타입 시스템이 무력화되는 결과로 이어집니다.

그렇기에 `any`는 가능하면 사용하지 마시기 바립니다.

#### Rule TP-4-2(필수): `any`를 사용해야 하는 코드가 있다면 린트 경고를 끄고 사유를 적으세요.

`any`는 TypeScript 프로젝트에서는 사용하지 말아야 하지만, 가끔씩은 불가피하게 사용해야 할 경우가 있습니다. `any`사용 불가 린트 규칙이 있다면 이 경우는 에러를 내 않도록 설정해주시고, 사유를 적으세요.

```ts
// 뫄뫄한 이유로 any 사용
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let k: any;
```

#### Rule TP-4-3(필수): `any`보다는 `unknown`을 사용하세요.

`unknown`은 `any`처럼 모든 타입 할당이 가능하지만, 외부에서 입력된 데이터나 API의 응답값 같이 해당 데이터의 타입이 확실하지 않을때 사용합니다. `any`와 다른 점은 `unknown` 타입은 역참조를 허용하지 않기 때문에(즉 사용하지 못하기 때문에) 반드시 타입 변환이 필요하다는 점입니다. 이는 코드 안정성을 높이며 버그 가능성을 줄여줍니다.

```ts
let helloAny: any = 'Hello';
let helloUnknown: unknown = 'Hello';

console.log(helloAny.toUpperCase()); // 문제 없지만 위험
console.log(helloUnknown.toUpperCase()); // 타입검사가 없어서 에러

if (typeof helloUnknown === 'string') {
  console.log(helloUnknown.toUpperCase()); // 사용 가능
}
```

결론적으로 정확한 타입을 알 수 없지만, 타입 검사를 강제하고 싶을 때 unknown을 사용하면 좋습니다.

### 2.5 타입 좁히기

#### Rule TP-5-1(권장): `any`보다는 `any[]`, `Record`를 사용하세요.

`any`타입은 집합으로 치자면 전체 집합입니다. 모든 타입을 커버할 수 있죠. 그래서 `any`를 사용하면 어떠한 타입 시스템도 동작하지 않습니다. 하지만 만약 어떤 값이 들어올지 모르는 배열이라면? 문자열 키를 가졌지만 어떤 값이 올지 모르는 객체라면 그래도 타입을 좁힐 수 있습니다.

어떤 값이 들어올지 모르는 배열: `any[]`
문자열 키를 가졌지만 어떤 값일지 모르는 객체: `Record<string, any>`

이렇게 사용하면 IDE의 도움을 받을 수 있고 최소한의 타입 시스템이 동작하게 됨으로서 버그를 예방할 수 있습니다.

### 2.6 타입 추론(Type Inference)

#### Rule TP-6-1(권장): `string`, `boolean`, `number`, `new` 표현식으로 초기화된 변수나 매개변수에 대한 타입 명시는 생략합니다.

TypeScript는 JavaScript 와는 다르게 매개변수, 변수, 필드, 반환형에 대해서 타입을 명시합니다. 대부분의 경우에 타입을 명시하는 건 좋은 습관이지만 아래와 같이 변수 초기화 시 직관적으로 타입을 추론할 수 있는 경우에는 타입 명시를 생략합니다.

```ts
const x = 42;
```

위와 같은 코드는 누가 봐도 `x`는 `number` 타입이며, 실제 TypeScript도 동일하게 추론합니다. 아래의 코드의 경우에는 번잡합니다.

```ts
const x: number = 42;
```

특히 `new` 연산자를 사용하는 경우에 주의를 기울어야 합니다.

```ts
const x: Map<string, number> = new Map();
const y = new Map<string, number>();
```

위의 코드에서 `x`와 `y` 모두 `Map<string, number>`이라는 사실은 너무나 명확하지만, `y`를 초기화 시키는 표현식이 더욱 간결합니다.

하지만 예외 상황도 있습니다. 변수 초기화 표현식의 결과를 바로 유추할 수 없는 경우입니다.

```ts
const x = getDocuments().toSection().translate();
```

위의 코드는 `x`의 타입을 유추하려면 코드를 모두 확인해야하는 번거로움이 있습니다. 이런 경우에는 타입을 명시하는 것을 추천드립니다.

```ts
const x: string[] = getDocuments().toSection.translate();
```

#### Rule TP-6-2(필수): 반환 타입을 명시하세요

TypeScript에서 함수 및 메서드의 반환 타입 명시는 필수 사항은 아닙니다. 하지만 반환 타입을 명시하면 여러 이점이 있습니다.

```ts
function foo(a: string, b: number): number {
  // ....
}
```

첫 번째, 함수나 메서드에서 코드 변경으로 인해 기존 반환 타입이 의도하지 않게 변경될 경우 이 함수나 메서드를 참고하는 코드로 오류가 번질 수 있는 문제를 사전에 차단할 수 있습니다.

두 번째, 작성자의 명시적인 의도를 정확하게 전달할 수 있으며 이로 인해 코드를 읽거나 리뷰하는 다른 동료가 이해하기 쉬워집니다.

세 번째, 함수나 메서드 자체를 유지보수나 리팩토링하기 쉬워집니다. 내부 코드를 수정하다보면 기존 반환 타입과 일치하지 않는 경우가 종종 생기는데, 반환 타입을 명시하면 컴파일러가 명시된 반환 타입과 다를 경우 바로 오류를 내기 때문에 이런 문제로부터 자유로울 수 있습니다.

네 번째, TypeScript는 함수 내부의 반환형을 곧 잘 추론하지만, 복잡한 함수에서는 이 추론이 늘 정확하지는 않습니다. 이 경우 반환형을 명시해주면 추론 오류를 방지할 수 있습니다.
