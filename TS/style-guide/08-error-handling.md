---
id: 08-error-handling
title: Error Handling
---

# 8. 에러 처리(Error Handling, ER)

[[00-index]]

#### Rule EH-1-1(권장): `catch`절은 비워두지 마세요.

`try...catch`의 `catch`절은 `try` 절 내 복합문 내에서 예외가 발생하면 이를 받아서 처리하는 로직이 담겨있습니다. 따라서 `try`를 쓴 이상 아래 코드처럼 `catch`절이 비어 있다는 것은 말이 안된다고 볼 수 있겠습니다.

```ts
try {
  someFunc();
} catch (err: unknown) {}
```

만약 `try`절 내에서 발생한 예외가 굳이 로직을 정지시킬 필요가 없어서 `catch`절에 적을 로직이 없다면 주석이라도 달아두셔야 합니다.

```ts
try {
  someFunc();
} catch (err: unknown) {
  // someFunc()에서 발생한 TypeError는 동작에 영향을 끼치지 않기에 그냥 넘어간다
}
```

#### Rule EH-1-2(필수): 예외 값은 Error 만 사용하세요.

`throw` 혹은 프로미스의 `reject`는 `Error`타입의 값으로만 예외를 발생할 수 있는 것은 아닙니다. 문자열이나 숫자 혹은 어떠한 값이라도 예외 혹은 프로미스의 `reject`의 값이 될 수 있습니다.

```ts
throw 'hello';
throw 123;

new Promise((resolve, reject) => reject('hello'));
new Promise((resolve, reject) => reject(123));
```

그러나 예외가 발생한 값이나 거부된 값이 `Error`가 아닌 경우 스택 추적 정보를 채우지 않습니다. 스택 추적 정보는 디버깅에 중요한 정보이기 때문에 `Error` 혹은 이를 상속한 클래스의 값으로 예외를 발생시키거나 프로미스의 `reject`의 값으로 사용하시기 바랍니다.

```ts
class NotFoundException extends Error {}

throw new NotFoundException('Not Found');
new Promise((resolve, reject) => reject(new Error('hello')));
```

#### Rule EH-1-3(권장): catch절의 매개변수 타입은 `unknown`으로 받으세요.

위의 규칙 `EH-1-2`와 연관된 규칙입니다.

TypeScript 4.0부터 `catch` 절의 `error` 타입이 기본적으로 `unknown`이 되었습니다. 이전에는 `any`였습니다. 이유는 JavaScript 에서 아무 값이나 `throw` 할 수 있기 때문에 `catch`절의 `error` 타입이 `Error` 혹은 `Error`의 하위 클래스가 아닐 수도 있기 때문입니다. 이 경우 타입을 `any`로 두면 안전하지 않습니다.

```ts
try {
  throw 123; // 숫자를 throw
} catch (error) {
  console.log(error.toUpperCase()); // ❌ 런타임 에러 발생
}
```

`any` 타입이면 어떤 속성이든 접근할 수 있지만, 실제로 해당 속성이 없으면 런타임 오류가 발생할 수 있습니다. 반면, `unknown`이면 반드시 타입 검사를 거쳐야 하므로 안전한 코드 작성이 가능합니다.

```ts
try {
  throw new Error('뭔가 잘못되었다....');
} catch (error: unknown) {
  // unknown 타입
  if (error instanceof Error) {
    console.log(error.message); // 안전하게 이용 가능
  } else {
    console.log('Unknown Error', error);
  }
}
```

`tsconfig`에서 `useUnknownInCatchVariables`값이 `true`라면 `catch`절의 `error`타입을 `unknown`으로 명시하지 않으면 컴파일 에러가 발생합니다. `strict`옵션이 켜져있다면 자동으로 `true`값으로 지정됩니다. `false`라면 기존처럼 타입을 명시하지 않은, `any` 타입으로 사용할 수 있습니다.

예외 값을 `Error` 혹은 그 하위 클래스로만 제한하는 규칙 `EH-1-2`이 엄격하게 적용된다면 아래와 같이 `error`값이 `Error` 클래스라고 가정하고 코딩하셔도 됩니다.

```ts
function assertIsError(e: unknown): asserts e is Error {
  if (!(e instanceof Error)) {
    throw new Error('e is not an Error');
  }
}

try {
  callSomeFunc();
} catch (err: unknown) {
  assertIsError(err);
  console.error(err.message); // err이 Error라고 간주
}
```

다만 써드파티 라이브라리가 반드시 `Error`를 반환한다는 보장이 없으니 유연하게 대응하시면 됩니다.
