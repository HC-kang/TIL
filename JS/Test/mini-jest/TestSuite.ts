interface Test {
  name: string;
  fn: () => void | Promise<void>;
  context: string | null;
}

interface ExpectResult {
  toBe: (expected: unknown) => void;
  toEqual: (expected: unknown) => void;
  toContain: (item: unknown) => void;
  toThrow: (expected?: string | RegExp) => void;
}

export class TestSuite {
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

  // 테스트 그룹화
  public describe(name: string, fn: () => void): void {
    const previousDescribe = this.currentDescribe;
    this.currentDescribe = previousDescribe 
      ? `${previousDescribe} ${name}`
      : name;
    
    this.describeStack.push(this.currentDescribe);
    
    try {
      fn();
    } finally {
      this.describeStack.pop();
      this.currentDescribe = this.describeStack[this.describeStack.length - 1];
    }
  }

  // 개별 테스트 케이스 정의
  public it(name: string, fn?: () => void | Promise<void>): void {
    const fullName = this.currentDescribe 
      ? `${this.currentDescribe} ${name}` 
      : name;
    
    if (fn === undefined) {
      return;
    }

    this.tests.set(fullName, {
      name: fullName,
      fn,
      context: this.currentDescribe
    });
  }

  // 검증 메서드
  public expect(actual: unknown): ExpectResult {
    return {
      toBe: (expected: unknown): void => {
        this.assertCondition(
          actual === expected,
          `Expected ${this.formatValue(expected)} but got ${this.formatValue(
            actual
          )}`
        );
      },
      toEqual: (expected: unknown): void => {
        const actualStr = JSON.stringify(actual);
        const expectedStr = JSON.stringify(expected);
        this.assertCondition(
          actualStr === expectedStr,
          `Expected ${this.formatValue(expected)} but got ${this.formatValue(
            actual
          )}`
        );
      },
      toContain: (item: unknown): void => {
        this.assertCondition(
          Array.isArray(actual) && actual.includes(item),
          `Expected ${this.formatValue(actual)} to contain ${this.formatValue(
            item
          )}`
        );
      },
      toThrow: (expected?: string | RegExp): void => {
        if (!(actual instanceof Function)) {
          throw new Error('toThrow() can only be called on functions');
        }
        try {
          actual();
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

  private assertCondition(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(message);
    }
  }

  // 유틸리티 메서드
  private formatValue(value: unknown): string {
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    if (value === undefined) {
      return 'undefined';
    }
    if (value === null) {
      return 'null';
    }
    if (Array.isArray(value)) {
      return `[${value.map(v => this.formatValue(v)).join(', ')}]`;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

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