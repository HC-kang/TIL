---
id: 12-environment
title: Environment
---

# 12. 환경(Environment, EV)

[[00-index]]

### 12.1 tsconfig

#### Rule EV-1-1(필수): `strict` 옵션을 켜세요

`tsconfig.json` 파일에서 `strict` 옵션을 `true`로 설정하는 것을 강력하게 권장합니다. 이 옵션은 TypeScript가 제공하는 타입 체크 기능을 최대한 활용하여 잠재적인 오류를 컴파일 시점에 발견할 수 있도록 돕습니다.

`strict` 옵션을 켜면 다음과 같은 하위 옵션들이 모두 활성화됩니다.

-   `noImplicitAny`: `any` 타입을 암시적으로 가지는 변수나 매개변수에 대해 오류를 발생시킵니다.
-   `noImplicitThis`: `this` 표현식에 `any` 타입이 암시적으로 지정될 때 오류를 발생시킵니다.
-   `alwaysStrict`: JavaScript의 `strict mode`를 활성화하고, 각 소스 파일 상단에 `"use strict";`를 추가합니다.
-   `strictBindCallApply`: `Function.prototype.bind`, `call`, `apply` 메서드를 더 엄격하게 검사합니다.
-   `strictNullChecks`: `null`과 `undefined`를 모든 타입에서 제외하고, 명시적으로 할당해야만 사용할 수 있도록 합니다.
-   `strictFunctionTypes`: 함수 타입을 더 엄격하게 검사합니다.
-   `strictPropertyInitialization`: 클래스의 속성이 생성자에서 초기화되지 않았을 경우 오류를 발생시킵니다.

이러한 옵션들은 코드의 안정성을 크게 향상시키고, 예상치 못한 버그를 사전에 방지하는 데 큰 도움이 됩니다.

### 12.2 파일

#### Rule EV-2-1(필수): 소스코드는 `UTF-8`인코딩으로 저장되어야 합니다.
