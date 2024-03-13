# 리얼 월드 HTTP

## Chapter 01 HTTP/1.0의 신택스: 기본이 되는 네 가지 요소

- `메서드`와 `경로`
- `헤더`
- `바디`
- `스테이터스 코드`

### 1.1 HTTP의 역사

- 1990년: HTTP/0.9
- 1996년: HTTP/1.0
- 1997년: HTTP/1.1
- 2005년: HTTP/2

- HTTP/0.9
  - HTML 문서를 가져오기 위한, GET 메서드만 지원하는 최소한의 프로토콜
  - 차후 폼 전송, 정보 갱신, 채팅기능 구현 등에 활용되며 확장되었음.
  - 사실상 0.9라는 명명은 HTTP/1.0 등장 이후 구별하기 위해 명명되었음.

#### 1.1.1 테스트 에코 서버 실행

- 생략: `./examples/test-echo-server` 참조

#### 1.1.2 도커 설치

- 생략

### 1.2 HTTP/0.9로 할 수 있는 것을 시험하다

- HTTP/0.9는 현재 프로토콜과 호환성이 없으므로(하위 호환성이 없음) HTTP/1.0을 사용하여 테스트 진행

```sh
# curl 실행 예시
$ curl --http1.0 http://localhost:18888/greeting
<html><boxy>hello</boxy></html>

# 서버측 로그
GET /greeting HTTP/1.0
Host: localhost:18888
Connection: close
Accept: */*
User-Agent: curl/7.52.1
```

### 1.3 HTTP/0.9에서 1.0으로의 여정

- HTTP/0.9의 한계
  - 하나의 문서만 전송 가능
  - HTML 문서만 전송 가능
    - 콘텐츠의 형식을 서버가 전달할 수 없음
  - 클라이언트는 검색만 가능
  - 새로운 데이터를 추가하거나 갱신, 삭제하는 기능이 없음
  - 서버가 요청을 올바르게 응답했는지 확인할 수 있는 방법이 없음


### 1.4 HTTP의 조상(1) 전자메일

- HTTP 헤더는 현재 요청과 응답에서 모두 사용됨.
  - 이를 통해 여러 가지 유용한 정보를 전달할 수 있음.
  - 이러한 헤더는 전자메일 시스템에서 유래되었음.

- 메일의 원시 정보

    ```
    Delivered-To: some@email.com
    (생략)
    MIME-Version: 1.0
    Received: by 10.176.69.212 with HTTP; Wed, 6 Apr 2016 06:26:27 -0700 (PDT)
    From: "Some Name" <email@email.com>
    Date: Wed, 6 Apr 2016 15:26:27 +0200
    Message-ID: <CAE5P5=someId@mail.gmail.com>
    Subject: Some Subject
    To: some@email.com
    Content-Type: text/plain; charset=UTF-8

    hello
    ```

    - 헤더는 `:`로 구분된 `키:값`의 형태로 구성됨.
    - 한 줄에 하나의 헤더를 작성함.
    - 헤더의 끝은, 빈 줄로 본문과 구분됨.
    - 대소문자를 구분하지 않음.
    - 파싱이 쉽도록 정규화되어있음.
    - 즉, 헤더에는 본문 이외의 모든 정보가 포함되어 있음.
      - 추가 정보, 지시, 명령, 당부 등

#### 1.4.1 헤더의 전송

- curl을 통해서도 헤더를 전송할 수 있음

  ```sh
  $ curl --http1.0 -H "X-Test: Hello" http://localhost:18888
  ```

- RFC에서는, 같은 헤더를 여러 번 보내는 것도 허용하고있음.
  - 이러한 경우 서버의 구현에 따라 배열이나 구분자를 사용한 문자열등으로 처리됨.

#### 1.4.2 헤더 수신

- 생략

#### 1.4.3 MIME 타입

- MIME(Multipurpose Internet Mail Extensions) 타입은, 전자메일 시스템에서 사용되는 콘텐츠 타입을 정의하는 표준
  - `Content-Type` 헤더를 통해 전달됨.
    - 예시
      - `Content-Type: text/plain; charset=UTF-8`
      - `Content-Type: text/html; charset=UTF-8`
      - `Content-Type: image/jpeg`
      - `Content-Type: application/json`
      - `Content-Type: application/octet-stream`
      - `Content-Type: application/x-www-form-urlencoded`

#### 1.4.4 COntent-Type과 보안

#### 1.4.5 전자메일과의 차이

### 1.5 HTTP의 조상(2) 뉴스 그룹

#### 1.5.1 메서드

#### 1.5.2 스테이터스 코드

### 1.6 리디렉트

### 1.7 URL

#### 1.7.1 URL의 구조

#### 1.7.2 URL과 국제화

### 1.8 바디

#### 1.8.1 GET 요청 시의 바디

### 1.9 마치며

## Chapter 02 HTTP/1.0의 시맨틱스: 브라우저 기본 기능의 이면

### 2.1 단순한 폼 전송(x-www-form-urlencoded)

### 2.2 폼을 이용한 파일 전송

### 2.3 폼을 이용한 리디렉트

### 2.4 콘텐트 니고시에이션

#### 2.4.1 파일 종류 결정

#### 2.4.2 표시 언어 결정

#### 2.4.3 문자셋 결정

#### 2.4.4 압축을 이용한 통신속도 향상

### 2.5 쿠키

#### 2.5.1 쿠키의 잘못된 사용법

#### 2.5.2 쿠키에 제약을 주다

### 2.6 인증과 세션

#### 2.6.1 BASIC 인증과 Digest 인증

#### 2.6.2 쿠키를 사용한 세션 관리

#### 2.6.3 서명된 쿠키를 이용한 세션 데이터 저장

### 2.7 프록시
