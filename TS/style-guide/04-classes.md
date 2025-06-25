---
id: 04-classes
title: Classes
---

# 4. 클래스(Class, CL)

[[00-index]]

### 4.1 일반

#### Rule CL-1-1(필수): `readonly` 를 활용하세요

생성자 외에서 변경하지 않는 멤버 변수(생성자 매개변수 포함)에 `readonly` 를 적극적으로 사용하세요. `readonly` 접근 제어자가 설정된 속성은 재할당이 불가하기에 프로그램의 안정성을 높이는데 도움이 됩니다. 단, 객체의 경우 내부 속성까지 불변은 아니니 참고하시기 바랍니다.

```ts
class Foo {
  private readonly prop1: string;

  constructor(private readonly someService: SomeService) {
    this.prop1 = 3;
  }
}
```

#### Rule CL-1-2(권장): `public` 접근 제어자에 일관성이 있어야 합니다.

TypeScript 클래스의 멤버 변수와 메서드의 기본 접근 제어자는 `public` 입니다. 즉 아무 접근 제어자를 명시하지 않으면 `public`이라는 뜻입니다. 프로젝트에서 일관되게 사용하던지 혹은 사용하지 말아야 합니다.

```ts
class Foo {
  prop1: string; // public
  public prop2: string; // public

  add(a: number, b: number): number {} // public
  public multiply(a: number, b: number): number {} // public
}
```

#### Rule CL-1-3(필수): `toString()`를 가능하면 재정의하지 마세요.

`toString()`는 `Object`의 메서드입니다. 클래스도 `Array`, `Map`과 같이 `Object`의 하위 클래스이기 때문에 `toString()`을 사용합니다. 하지만 실질적으로 `toString()` 메서드를 직접 부르는 코드는 거의 보지 못하셨을겁니다. JavaScript는 문자열이 있어야 할 곳에서 객체를 마주치면 내부적으로 자동으로 이 메서드를 호출하기 때문입니다.

클래스에서는 특히 이 `toString()`을 손쉽게 재정의할 수 있으며 `Array`나 `Map`등과는 달리 클래스 자체 멤버 변수의 값을 일목 요연하게 보고싶은 경우가 많기 때문에 자주 재정의하는 편이라 주의가 필요합니다. `toString()` 메서드는 언제나 호출이 성공해야 하며 특별한 부수작용이나 무한루프가 있어서는 안됩니다.

`toString()`을 잘못 재정의 했을때 겪을 수 있는 문제는 여러가지가 있지만 그 중 하나는 `JSON.stringify()` 문제입니다. `toString()`의 반환값을 JSON 형태로 한다고 해도 `JSON.stringify()`을 통한 결과값과는 다릅니다. `JSON.stringify()`는 `toString()`을 사용하지 않기 때문입니다.

```ts
class User {
  constructor(public name: string, public address: string) {}

  toString() {
    return `{ "name": "${this.name} 님", "address": "대한민국 ${this.address}"`;
  }
}

const user = new User('Kim', '대전시');
console.log(JSON.stringify(product)); // {"name":"Kim","address":"대전시"}"
```

이 경우는 `toJSON()` 메서드를 재정의하세요.

```ts
class User {
  constructor(public name: string, public address: string) {}

  toJSON() {
    return { name: this.name + ' 님', address: '대한민국 ' + this.address };
  }
}

const user = new User('Kim', '대전시');
console.log(JSON.stringify(product)); // {"name":"Kim 님","address":"대한민국 대전시"}
```

#### Rule CL-1-4(권장): 빈 생성자는 생략하세요.

ES2015 이상에서는 클래스 생성자가 명시되지 않은 경우 기본 클래스 생성자를 제공하기 때문에 빈 생성자나 단순히 상위 클래스에 위임하는 생성자(즉 `super`만 있는 경우)는 생성자를 만들 필요가 없습니다.

```ts
class Foo {
  constructor() {} // ❌ 빈 생성자
}

class Child {
  consturctor(value: number) {
    super(value); // ❌ super 만 있음
  }
}
```

그러나 멤버 변수 선언, `public` 접근 제어자가 아닌 경우, 매개변수에 데코레이터가 붙은 경우는 생성자 본문이 비어있더라도 생략해서는 안됩니다.

```ts
class Foo {
  // ✅ 생성자가 없음
}

class Foo1 {
  constructor(private readonly parcelService) {} // ✅ 멤버 변수 선언
}

class Foo2 {
  constructor(@Injectable myService) {} // ✅ 데코레이터
}

class Foo3 {
  private constructor() {} // ✅ public 이 아닌 생성자
}
```

#### Rule CL-1-5(권장): `#` private 접근 제어자를 사용하지 마세요.

ES2020(ES11)부터 도입된 JavaScript의 Private 필드(#)은 외부에서 절대 접근할 수 없고 클래스 내부에서만 접근할 수 있는 접근 제어자입니다. 얼핏 `private`과 비슷하지만 내부 동작 방식은 많이 다릅니다.

```ts
class User {
  #privateValue: number;
  constructor(public name: string, public address: string) {}

  getSecret(): number {
    return this.#privateValue;
  }
}
```

위와 같은 `User` 클래스가 있습니다. 큰 문제는 없어 보입니다. 그냥 `private` 처럼 동작하는거 아닌가 싶습니다. 하지만 다시 말씀드리지만 TypeScript는 JavaScript로 컴파일하기 때문에 그 동작을 보려면 실제 JavaScript로 컴파일된 결과를 봐야합니다.

```js
use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _User_privateValue;
class User {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        _User_privateValue.set(this, void 0);
    }
    getSecret() {
        return __classPrivateFieldGet(this, _User_privateValue, "f");
    }
}
_User_privateValue = new WeakMap();
```

여기서 `#`을 사용하면 안되는 이유가 나옵니다.

첫 번째로 `#` Private 필드는 클래스에 포함되지 않습니다. 즉 일반적인 객체처럼 객체 속성이어야 히든 클래스로 관리하는데 컴파일 한 결과는 `User` 클래스 외부에 `WeakMap`으로 정의되어 있습니다. 그렇기에 JavaScript 엔진이 `#` private 필드에 접근할 때는 일반적인 속성에 접근(예: this.propertyName) 할 때와는 달리 별도의 내부 매커니즘으로 호출해야기 때문에 성능이 저하됩니다.

두 번째로 `#` private 필드는 위 코드에서 보듯이 객체 외부에 정의되기 때문에 객체의 프로토타입 체인에 존재하지 않게 됩니다. 이 때문에 리플렉션이나 디버깅이 어렵습니다. 객체의 속성이 아니기에 `Object.keys()`, `JSON.stringify()`에도 해당 필드는 나타나지 않습니다.

세 번째로 일반적인 멤버와는 달리 별도의 `WeakMap`으로 관리하기 때문에 다량의 인스턴스를 만들 경우 일반적인 클래스보다 메모리 사용량이 증가합니다.

절대 외부에 해당 속성을 노출시키지 않아야 할 특별한 이유가 없는한 `#`Private 접근 제어자를 사용하지 마세요.

#### Rule CL-1-6(권장): 멤버 변수 선언 대신 생성자 매개 변수 선언을 적극 활용하세요.

TypeScript에서는 클래스 멤버 변수 선언 대신 생성자 매개 변수로 멤버 변수 선언이 가능합니다.

```ts
class User {
  name: string;
  address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }
}
```

위 코드는 일반적인 클래스 사용법입니다. 멤버 변수를 선언하고 생성자에서 값을 초기화합니다.

```ts
class User {
  constructor(name: string, address: string, private readonly age: number) {}
}
```

위 코드는 생성자 매개변수를 통해 멤버 변수를 선언하는 방식입니다. 이 방식을 사용하면 멤버 변수 선언과 초기화를 한 번에 함으로서 코드가 깔끔해지기도 하고 `public`, `private`, `readonly` 등의 접근 제한자와 함께 사용할 수 있습니다.

다만 아래의 경우에는 굳이 사용하실 필요는 없습니다.

- 생성자 로직이 복잡한 경우
- 기본 값이 필요한 경우
