# 테스트 프레임워크의 동작 원리 이해하기: 미니 Jest 구현(feat. Bun)

최근 현업에 Jest를 도입하고자 하는데요, 이를 위해 Jest와 같은 테스트 프레임워크를 좀 더 깊이있게 이해하고 싶어졌습니다.  
그래서 이번에는 Jest의 주요 기능들을 직접 구현해보면서, 테스트 프레임워크의 동작 원리를 공부해보려고 합니다.

## 무엇이 필요할까?: Jest의 핵심 기능 선정

먼저 Jest 같은 테스트 프레임워크가 제공해야 할 주요 기능들을 정리해보았습니다:

1. 테스트/스펙을 직접 표현하고 구조화하는 `describe`와 `it`(`test`) 함수
2. 검증을 위한 `expect` 매처
3. 이러한 테스트 케이스를 수집하고 관리하는 수집기
4. 테스트 실행과 결과 리포팅

이제 이 기능들을 하나씩 직접 만들어보면서, Jest의 동작 방식을 이해해보겠습니다.

## 프로젝트 준비하기

우선 정말 간단하게, 저는 `Bun`으로 프로젝트를 준비해보겠습니다.  
꼭 `Bun`을 사용할 필요도 없고, `Bun`의 특별한 어떤 기능을 사용하는것도 아니지만, 몇번 쓰다보니 편하더라구요. 😎

```zsh
$ mkdir mini-jest
$ cd mini-jest
$ bun init
```

그리고 테스트 코드를 작성할 때 사용할 파일들을 생성해보겠습니다.

```zsh
$ touch index.ts
$ touch TestSuite.ts
```

자 이제, 필요한 코드를 `/mini-jest/TestSuite.ts` 파일에 모두 작성해보겠습니다.

## 테스트 코드를 표현하는 기본적인 함수: `describe`와 `it`(`test`)

테스트 코드를 작성할 때 가장 먼저 마주하는 것은 `describe`와 `it`(`test`) 함수입니다.  

```js
describe('Calculator', () => {
  it('should add numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle arrays', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
});
```

일반적으로 테스트는 위와 같은 구조로 작성됩니다. 테스트 코드의 본질이라고 할 수 있죠.

간략한 설명을 보태자면, `describe`는 테스트 케이스를 그룹(스위트)화하고, `it`은 각각의 개별적인 테스트 케이스를 정의합니다.  

이런 구조를 구현하기 위한 기본 뼈대를 만들어보겠습니다.

```js
/**
 * TestSuite 클래스는 테스트 그룹화와 테스트 케이스 수집을 위한 기본 구조를 제공합니다.
 * 현재 단계에서는 테스트를 정의하기만 하고 수집 및 실행은 나중에 구현할 예정입니다.
 */
class TestSuite {
  private currentDescribe: string | null;

  constructor() {
    this.currentDescribe = null;
  }

  // describe 메서드는 테스트 그룹화를 위해 사용됩니다.
  describe(name: string, fn: () => void): void {
    const previousDescribe = this.currentDescribe;
    this.currentDescribe = name;
    fn();
    this.currentDescribe = previousDescribe;
  }

  // it 메서드는 개별 테스트 케이스를 정의하는 데 사용됩니다.
  it(name: string, fn: () => void): void {
    const fullName = this.currentDescribe 
      ? `${this.currentDescribe} ${name}` 
      : name;
  }

  // test 메서드는 it과 동일하므로 생략
}
```

사실 당연하게도 `it`만 우선 구현해도 테스트 케이스를 작성할 수 있습니다.  

실제 현업에서도 테스트 구조화가 필요없는 간단한 컴포넌트이거나, 수가 적은 경우에는 `describe`를 생략하는 경우도 있습니다.  
오히려 이렇게 함으로서 뎁스를 줄이고, 개발자의 피로도를 줄일 수 있습니다.  

저도 얼마전까지 습관적으로, 그리고 관례(?)적으로 일단 테스트를 작성할때에는 `describe`로 시작하는 경우가 많았는데요, 최근 사이드 프로젝트에서 많이 배우면서 깨달았습니다.  
사실 어지간한 경우에는 이미 `*.spec.ts`, 혹은 `*.test.ts` 라는 이름으로 해당 컴포넌트나 서비스 등의 테스트 코드가 어느정도 구분되어 있기 마련이라는 것을 말이죠.

결과적으로 **하나의 파일** 안에 **하나의 클래스(모듈)**로 정리되어있고, 이를 **하나의 테스트 파일**로 잘 정리해둔 코드라면 굳이 `describe`를 사용할 필요가 없는 경우도 있습니다.  

하지만 그렇다고 이 글에서 `describe`를 생략하게 되면 글이 너무 심심해질 것 같기도 하고, `describe`가 있어야 필요시에 좀 더 테스트 케이스를 구조화할 수 있으니 함께 구현해보았습니다.  

## 검증 로직: expect 매처 시스템

각각의 테스트 케이스는 스스로가 어떤 목적으로 어떤 검증을 어떻게 수행하는지를 명확하게 표현해야 합니다. 마치 문서처럼 말이죠.  
이 문서에서 동사의 역할을 하는 것이 바로 `expect` 함수입니다.  

각 테스트 케이스 안에서는 `expect`를 통해 실제 값과 예상 값을 비교합니다.
이때 비교란 단순한 값이 같은지 확인하는 것 뿐 아니라, 객체 비교, 포함 관계, 호출횟수와 오류 발생 여부 등 다양한 검증 로직을 제공합니다.  

다만 이 글에서는 분량을 고려하여 우선 단순한 값, 객체 비교와 포함여부, 예외 발생 여부 등 기본적인 검증 로직만 구현해보겠습니다.

```js
// 검증 결과 인터페이스 추가
interface ExpectResult {
  toBe: (expected: unknown) => void;
  toEqual: (expected: unknown) => void;
  toContain: (item: unknown) => void;
  toThrow: (expected?: string | RegExp) => void;
}

expect(actual: unknown): ExpectResult {
  return {
    // 참조 비교. 객체가 완전히 동일한지 검증
    toBe: (expected: unknown): void => {
      this.assertCondition(
          actual === expected,
          `Expected ${expected} but got ${actual}`
        );
    },
    // 객체 비교. 객체의 모든 속성이 동일한지 검증
    toEqual: (expected: unknown): void => {
      const actualStr = JSON.stringify(actual);
      const expectedStr = JSON.stringify(expected);
      this.assertCondition(
        actualStr === expectedStr,
        `Expected ${expected} but got ${actual}`
      );
    },
    // 포함여부 검증
    toContain: (item: unknown): void => {
      this.assertCondition(
        Array.isArray(actual) && actual.includes(item),
        `Expected ${actual} to contain ${item}`
      );
    },
    // 예외 검증
    toThrow: (expected?: string | RegExp): void => {
      if (!(actual instanceof Function)) {
        throw new Error('toThrow() can only be called on functions');
      }
      try {
        actual(); // 함수를 호출하고 예외가 먼저 발생하는지 확인
        throw new Error('Expected function to throw but it did not');
      } catch (e) {
        if (expected) {
          if (!(e instanceof Error)) {
            throw new Error('Caught value is not an Error object');
          }

          const isString = typeof expected === 'string';
          const isRegExp = expected instanceof RegExp;
          const matches = isString
            ? e.message === expected
            : isRegExp && expected.test(e.message);

          this.assertCondition(
            matches,
            `Expected error ${isString ? 'message' : 'pattern'} ` +
              `${this.formatValue(expected)} but got "${e.message}"`
          );
        }
      }
    },
  };
}
```

이와 같은 형태로 구현하면, 실제로 주어진 값이 예상한 값과 **어떤 관계**를 가지는지 표현할 수 있습니다.  
이를 위해 `expect`가 제공하는 메서드들을 충분히, 정확하게 알아두는 것이 좋겠습니다.  
우리가 대화를 할 때에도, 동사를 많이 알고있어야 본인이 아는 내용을 보다 간결하고 정확하게 전달할 수 있는 것처럼, 테스트 코드를 작성할 때에도 마찬가지라고 생각합니다.  

## 테스트 수집기 구현

이제까지 작성한 `describe`와 `it`를 얼핏 보면, 뭐 다 끝난것 아닌가? 싶은 생각이 드실 수도 있습니다. 하지만 지금까지 작성한 코드는 아직 동작하지 않습니다.  

우리가 아무리 테스트 케이스를 작성하더라도, 이를 수집해두고 실행해주는 시스템이 없다면 아무 의미가 없기 때문이죠.  

이를 위해 테스트 케이스를 수집하고 관리할 수 있는 시스템을 간단하게 구현해보겠습니다.  

```js
// 테스트 케이스 인터페이스 추가
interface Test {
  name: string;
  fn: () => void | Promise<void>;
  context: string | null;
}

class TestSuite {
  private readonly tests: Map<string, Test>;
  private currentDescribe: string | null;
  private readonly describeStack: string[];

  constructor() {
    // 테스트 케이스 저장소
    this.tests = new Map<string, Test>();
    
    // describe 문맥 관리
    this.currentDescribe = null;
    this.describeStack = [];
  }

  // describe 구현은 동일...

  // 테스트 케이스 수집
  it(name: string, fn: () => void): void {
    const fullName = this.currentDescribe 
      ? `${this.currentDescribe} ${name}` 
      : name;

    // 테스트 케이스를 수집
    this.tests.set(fullName, {
      name: fullName,
      fn,
      context: this.currentDescribe
    });
  }
}
```

간단하게 `Map`을 사용하여 테스트 케이스를 수집하였습니다.  
추후 결과 리포팅 등의 편의를 위해 `Test` 인터페이스도 추가하였습니다.  

## 테스트 실행과 결과 리포팅

이제 이어서 테스트 케이스를 실행하고 결과를 리포팅하는 시스템을 구현해보겠습니다.

```js
class TestSuite {
  private readonly tests: Map<string, Test>;
  private currentDescribe: string | null;
  private readonly describeStack: string[];
  private passed: number;
  private failed: number;

  constructor() {
    // 테스트 케이스 저장소
    this.tests = new Map<string, Test>();
    
    // describe 문맥 관리
    this.currentDescribe = null;
    this.describeStack = [];
    
    // 결과 통계
    this.passed = 0;
    this.failed = 0;
  }

  // 이전 구현 생략

  // 실행 및 결과 출력 메서드
  public async runTests(): Promise<void> {
    console.log('\nRunning tests...\n');
    
    for (const [name, test] of this.tests.entries()) {
      await this.runSingleTest(name, test);
    }

    this.printResults();
  }

  private async runSingleTest(name: string, test: Test): Promise<void> {
    try {
      await test.fn();

      this.logTestSuccess(name);
      this.passed++;
    } catch (error) {
      this.logTestFailure(name, error);
      this.failed++;
    }
  }

  private logTestSuccess(name: string): void {
    console.log(`✓ ${name}`);
  }

  private logTestFailure(name: string, error: unknown): void {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error instanceof Error ? error.message : String(error)}\n`);
  }

  private printResults(): void {
    console.log('\nTest Results:');
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log(`Total: ${this.tests.size}\n`);

    if (this.failed > 0) {
      process.exitCode = 1;
    }
  }
}
```

이부분은 크게 설명할 것은 없어보입니다.  
단순히 여태까지 클래스 안에 저장된 `tests`를 순회하면서 각각의 테스트를 실행하고, 결과를 출력하는 코드입니다.  

## 모듈 내보내기

이제 마지막으로, 이 모든 코드를 하나로 묶어서 간단히 흉내를 좀 내보겠습니다.  
아래의 내용을 `/mini-jest/index.ts` 파일에 작성해 보겠습니다.

```js
import { TestSuite } from './TestSuite';

const miniJest = new TestSuite();
const describe = miniJest.describe.bind(miniJest);
const it = miniJest.it.bind(miniJest);
const expect = miniJest.expect.bind(miniJest);

// 모든 테스트가 등록된 후 다음 틱에서 실행
setTimeout(async () => {
  await miniJest.runTests();
}, 0);

export {
  describe,
  it,
  expect,
};
```

여기까지 작성된 최종 코드는 [여기에서](https://github.com/HC-kang/TIL/tree/main/JS/Test/mini-jest) 확인하실 수 있습니다.  
편집 과정에서 약간의 수정이 있다보니, 최종 코드와 조금 다를 수 있습니다.

## 사용해보기

이제 이 모든 코드를 하나로 묶어서 사용해보겠습니다.  

`/index.ts` 파일을 생성하고 아래와 같이 작성합니다.

  ```js
  import { describe, it, expect } from './mini-jest';

  describe('테스트 스위트', () => {
    it('should add numbers correctly', () => {
      expect(2 + 2).toBe(4);
    });

    describe('중첩된 테스트 스위트(for toEqual)', () => {
      it('should handle arrays', () => {
        expect([1, 2, 3]).toEqual([1, 2, 3]);
      });

      it('should handle objects', () => {
        expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
      });
    });

    it('should handle in', () => {
      expect([1, 2, 3]).toContain(2);
    });

    it('should handle throw', () => {
      expect(() => {
        throw new Error('test');
      }).toThrow('test');
    });

    it('this test should be failed', () => {
      expect(1).toBe(2);
    });
  });

  describe('다른 테스트 스위트', () => {
    it('should handle arrays', () => {
      expect([1, 2, 3]).toEqual([1, 2, 3]);
    });
  });
  ```

- 실행 결과

  ```zsh
  $ bun jest/index.ts

  Running tests...

  ✓ 테스트 스위트 should add numbers correctly
  ✓ 테스트 스위트 [toEqual] 중첩된 테스트 스위트 should handle arrays
  ✓ 테스트 스위트 [toEqual] 중첩된 테스트 스위트 should handle objects
  ✓ 테스트 스위트 [toEqual] 중첩된 테스트 스위트 should handle strings
  ✓ 테스트 스위트 [toEqual] 중첩된 테스트 스위트 should handle in
  ✓ 테스트 스위트 should handle throw
  ✗ 테스트 스위트 this test should be failed
    Error: Expected 2 but got 1

  ✓ 다른 테스트 스위트 should handle arrays

  Test Results:
  Passed: 7
  Failed: 1
  Total: 8
  ```

## 마무리

이렇게 Jest의 동작을 하나씩 간단하게나마 흉내내어 구현해보니, 생각없이 쓸 때 보다는 이해가 되는 것 같네요.
물론 실제 Jest의 코드는 이보다 훨씬 복잡하고, 다양한 기능을 제공하지만 말이죠.

그럼에도 불구하고 Jest는 굉장히 사용하기 편한 형태로 API를 제공하는데, 다시 한번 이러한 점이 대단하다고 생각합니다.

나중에 기회가 된다면 아래와 같은 좀 더 복잡한 기능들도 추가해보고, 구현도 좀 더 정확하게 따라해보고 싶습니다.

1. `beforeEach`/`afterEach`/`beforeAll`/`afterAll` 등의 훅 시스템
2. 테스트 격리와 타임아웃
3. 스파이와 목 시스템
4. 스냅샷 테스팅
5. 테스트 커버리지 측정

여기까지 읽어주셔서 감사드리고, 혹시 잘못된 부분이 있거나 더 좋은 방법이 있으면 댓글로 알려주시면 감사하겠습니다!
