---
id: 10-comments
title: Comments
---

# 10. 주석(Comment, CM)

[[00-index]]

### 1. 일반

#### Rule CM-1-1(필수): 클래스 멤버, 클래스 메서드, 함수, 속성 선언 등 에는 TSDoc 형태의 주석을 사용하세요.

모든 프로그래밍 언어에는 주석이 있습니다. JavaScript도 예외는 아닙니다. JavaScript에서 주석의 형태는 아래와 같습니다.

```ts
// 이것은 주석입니다.
/*
이것도 주석입니다.
*/
```

여기에 함수, 메서드, 클래스, 변수 선언 위에 JSDoc이라 불리는 특수한 형태의 주석을 달 수 있습니다. `/**`로 시작해서 `*/`로 끝나야 합니다. `/* ... */`과 다르다는 점 유의해주세요.

```js
/**
 * Add the given two numbers
 *
 * @param {Number} a number to add
 * @param {Number} b number to add
 * @return {Number} sum vbalue
```
