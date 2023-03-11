# 자바스크립트 객체

## 객체 리터럴과 객체

### 리터럴

- 리터럴(Literal)이란, 소스 코드의 고정된 값을 대표하는 용어

### 프로퍼티

- 객체가 가진 속성. 데이터 프로퍼티와 접근저 프로퍼티로 나뉨. 일반적으로 데이터 프로퍼티를 지칭함.

#### 접근자 프로퍼티

- 주로 비공개를 의미하기 위해 이름이 _(언더스코어)로 시작함.
- getter, setter로 정의
- 그러나 JS에서는 비공개(private) 프로퍼티를 지원하지 않아, 필요시 지역변수와 즉시실행 함수를 사용하여 구현

```Javascript
var coffee = (function () {
    var _name = "Americano";
    return {
        get name() {
            return _name;
        },
        set name(value) {
            console.log("call setter")
            _name = value;
        }
    }
}());
```

### 메소드

- 프로퍼티 중, 값이 함수형인 프로퍼티를 뜻함.
