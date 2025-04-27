# Multi-Paradigm Programming

## 1장 멀티패러다임이 현대 언어를 확장하는 방법

### 1.1 객체지향 디자인 패턴의 반복자 패턴과 일급함수

#### 1.1.1 GoF의 반복자 패턴

#### 1.1.2 ArrayLike로부터 Iterator 생성하기

```ts
/* lib.es5.ts
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}
*/

class ArrayLikeIterator<T> implements Iterator<T> {
  private index = 0;
  constructor(private arrayLike: ArrayLike<T>) {}

  next(): iteratorResult<T> {
    if (this.index < this.arrayLike.length) {
      return {
        value: this.arrayLike[this.index++],
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  }
}

const arrayLike: ArrayLike<number> = {
    0: 10,
    1: 20,
    2: 30,
    length: 3,
};

const iterator: Iterator<number> = new ArrayLikeIterator(arrayLike);

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

#### 1.1.3 ArrayLike를 역순으로 순회하는 이터레이터 만들기

```ts
function reverse<T>(arrayLike: ArrayLike<T>): Iterator<T> {
  let idx = arrayLike.length;

  return {
    next() {
      if (idx === 0) {
        return { value: undefined, done: true };
      } else {
        return { value: arrayLike[--idx], done: false };
      }
    },
  };
}
```

#### 1.1.4 지연 평가되는 map 함수

```ts
function map<A, B>(transform: (value: A) => B, iterator: Iterator<A>): Iterator<B> {
  return {
    next(): IteratorResult<B> {
      const { value, done } = iterator.next();
      return done
        ? { value, done }
        : { value: transform(value), done };
    }
  };
}
```

### 1.2 명령형 프로그래밍으로 이터레이터를 만드는 제너레이터 함수

#### 1.2.1 제너레이터 기본 문법

```ts
function* generator() {
  yield 1;
  console.log('after 1');
  yield 2;
  yield 3;
}

const iter = generator();

console.log(iter.next()) // { value: 1, done : false }
console.log(iter.next()) // hi, { value: 2, done : false }
console.log(iter.next()) // { value: 3, done : false }
console.log(iter.next()) // { value: undefined, done : true }
```

##### yield* 표현식

```ts
function* generator() {
  yield 1;
  yield* [2, 3]; // 이터레이터 반환
  yield 4;
}

const iter = generator();

console.log(iter.next()) // { value: 1, done : false }
console.log(iter.next()) // { value: 2, done : false }
console.log(iter.next()) // { value: 3, done : false }
console.log(iter.next()) // { value: 4, done : false }
console.log(iter.next()) // { value: undefined, done : true }
```

#### 1.2.2 제너레이터로 작성한 reverse 함수

```ts
function* reverse<T>(arrayLike: ArrayLike<T>): IterableIterator<T> {
  let idx = arrayLike.length;

  while (idx) {
    yield arrayLike[--idx];
  }
}

const array = ['A', 'B', 'C', 'D', 'E', 'F'];
const reversed = reverse(array);

console.log(reversed.next()) // { value: 'F', done : false }
console.log(reversed.next()) // { value: 'E', done : false }
console.log(reversed.next()) // { value: 'D', done : false }
```

### 1.3 자바스크립트에서 반복자 패턴 사례: 이터레이션 프로토콜

```ts
const arr = [1,2,3,4];
const [a, ..., b] = arr;

console.log(a)
console.log(b)
```

#### 1.3.3 제너레이터로 만든 이터레이터도 이터러블

##### 제너레이터로 만든 map 함수

```ts
function* map<A, B>(f: (value: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const value of iterable) {
    yield f(value);
  }
}
```

### 1.4 이터러블을 다루는 함수형 프로그래밍

#### 1.4.1 forEach 함수

##### for...of

```ts
function forEach(f, iterable) {
  for (const value of iterable) {
    f(value);
  }
}

const array = [1, 2, 3];
forEach(console.log, array);
// 1
// 2
// 3
```

##### while

```ts
function forEach(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  let result = iterator.next();
  while (!result.done) {
    f(result.value);
    result = iterator.next();
  }
}

const set = new Set([4, 5, 6]);
forEach(console.log, set);
// 4
// 5
// 6
```

#### 1.4.2 map 함수

##### for...of

```ts
function* map(f, iterable) {
  for (const value of iterable) {
    yield f(value);
  }
}

const array = [1, 2, 3];
const mapped = map(x => x * 2, array);

console.log([...mapped]); // [2, 4, 6]

const mapped2 = map(x => x * 3, array);
forEach(console.log, mapped2);
// 3
// 6
// 9
```

##### while

```ts
function* map(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    yield f(value);
  }
}

const mapped = map(([k, v]) => `${k}: ${v}`, new Map([['a', 1], ['b', 2]]));
forEach(console.log, mapped);
// a: 1
// b: 2
```

##### return { next, ... }

```ts
function map(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  return {
    next() {
      const { done, value } = iterator.next();
      return done
        ? { done, value }
        : { done, value: f(value) };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}

const iterator = function* () {
  yield 1;
  yield 2;
  yield 3;
}

const mapped = map(x => x * 10, iterator());

console.log([...mapped]); // [10, 20, 30]
```

#### 1.4.3 filter 함수

##### for...of

```ts
function* filter(f, iterable) {
  for (const value of iterable) {
    if (f(value)) {
      yield value;
    }
  }
}

const array = [1, 2, 3, 4, 5];
const filtered = filter(x => x % 2 === 0, array);
console.log([...filtered]); // [2, 4]
```

##### while

```ts
function* filter(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    if (f(value)) {
      yield value;
    }
  }
}

const array = [1, 2, 3, 4, 5];
const filtered = filter(x => x % 2 === 0, array);
console.log([...filtered]); // [2, 4]
```

##### return { next, ... }

```ts
function filter(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  return {
    next() {
      const { done, value } = iterator.next();
      if (done) return { done, value };
      if (f(value)) return { done, value };
      return this.next(); // 조건에 맞지 않으면 재귀 호출
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}

console.log(...filter(x => x % 2 === 1, [1, 2, 3, 4, 5])); // 1, 3, 5
```

#### do...while / while

```ts
function filter(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  return {
    next() {
      do {
        const { done, value } = iterator.next();
        if (done) return { done, value };
        if (f(value)) return { done, value };
      } while (true); // 현재 구현에서 사실상 재귀 호출과 동일한 표현
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}

function filter(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  return {
    next() {
      while (true) {
        const { done, value } = iterator.next();
        if (done) return { done, value };
        if (f(value)) return { done, value };
      }
    },
    [Symbol.iterator]() {
      return this;
    }
  }
}
```

#### 1.4.4 고차 함수 조합하기

```ts
forEach(console.log,
  map(x => x * 10,
    filter(x => x % 2 === 1,
      naturals(5)
    )
  )
);
// 10
// 30
// 50
```

#### 1.4.5 재미난 filter

```ts
function* filter(f, iterable) {
  for (const value of iterable) {
    yield* [value].filter(f);
  }
}

const array = [1, 2, 3, 4, 5];
const filtered = filter(x => x % 2 === 0, array);
console.log([...filtered]); // [2, 4]
```
