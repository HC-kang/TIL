---
id: 11-modules
title: Modules
---

# 11. 모듈(Modules, SC)

[[00-index]]

### 11.1 일반

#### Rule SC-1-1(필수): 모듈 시스템은 ES6 모듈 시스템을 사용하세요.

TypeScript는 ES6 모듈 시스템을 채택하고 있습니다. `import`, `export` 키워드를 사용하여 모듈을 가져오고 내보낼 수 있습니다.

과거에는 `namespace`나 `amd`, `commonjs` 같은 모듈 시스템도 사용되었지만, 현재는 ES6 모듈 시스템으로 통일되었습니다.

- `namespace`: TypeScript 초기 버전에서 사용되던 모듈 시스템입니다. 현재는 거의 사용되지 않습니다.
- `import` 없이 전역적으로 접근 가능: 전역적으로 접근 가능하기에 관리가 어려울 수 있습니다. 반면 ES6 모듈 시스템은 `import/export`를 사용해 코드 분리가 가능합니다.

### 11.2 Import

#### Rule SC-2-1(권장): `named import`를 사용하세요.

`default import` 보다 `named import`를 사용하는 것을 권장합니다. `named import`는 모듈에서 어떤 것을 가져오는지 명확하게 보여주며, 자동완성 기능을 활용하기에도 용이합니다. 또한, `default export`는 이름을 마음대로 바꿀 수 있어 코드의 일관성을 해칠 수 있습니다.

```ts
// Good
import { a, b } from './module';

// Bad
import c from './module';
```

#### Rule SC-2-2(권장): `import` 순서를 정하세요.

`import` 문의 순서를 정해두면 코드의 가독성을 높일 수 있습니다. 일반적으로 다음과 같은 순서를 권장합니다.

1.  써드파티 라이브러리
2.  내부 모듈 (절대 경로)
3.  내부 모듈 (상대 경로)

```ts
import { Component } from '@angular/core';
import { MyService } from 'src/app/services/my.service';
import { MyComponent } from '../my/my.component';
```

### 11.3 Export

#### Rule SC-3-1(필수): `default export`를 사용하지 마세요.

`default export`는 모듈에서 단 하나의 값만 내보낼 수 있으며, `import` 시 이름을 마음대로 바꿀 수 있어 코드의 일관성을 해칠 수 있습니다. 따라서 `named export`를 사용하는 것을 권장합니다.

```ts
// Good
export const a = 1;
export const b = 2;

// Bad
export default { a: 1, b: 2 };
```
