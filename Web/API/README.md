---
title: API
date: 2024-01-09
tags: [API, TCP, HTTP, REST, SOAP, GraphQL, gRPC, WebSockets]
alias: [API]
---

# API

## API의 종류

### REST (REpresentational State Transfer)

- 2000년 [Roy Fielding의 박사학위 논문](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)에서 소개된 아키텍처 스타일.
- HTTP를 기반으로 함.
- Server-side의 데이터를 Client-side에서 쉽게 사용하는 것을 목표로 함.
- JSON, XML등의 형식으로 데이터를 주고 받음.
- 아래의 6가지 조건을 준수함
  - 통일된 인터페이스
  - 무상태성
  - 캐싱 지원
  - 클라이언트-서버 아키텍처
  - 계층화 시스템
  - 클라이언트 측에서 실행될 수 있는 코드 제공
- **장점**
  1. GET, POST, PUT, DELETE등의 HTTP 메소드를 사용하여 실행되므로 다방면에 효율적으로 활용될 수 있음.
  2. 클라이언트와 서버를 완전히 분리하여 서로간의 의존성을 줄이고 확장성을 가질 수 있게 함.
  3. 캐싱이 용이하여 Public API 구현에 효과적임.
  4. JSON, XML 등 다양한 데이터 형식을 지원하므로 다양한 애플리케이션에서 사용하기 용이함.
- **단점**
  1. 때때로 비대한 메타데이터(헤더, 기타 사용자가 정의한 추가정보 등)로 인해 지연시간이 증가하고 대역폭을 낭비할 수 있음.
  2. 언더, 오버페칭 문제
     - 언더페칭(과소수집): 사용자가 필요한 정보보다 적은 정보를 받는 것. 이로인해 추가적인 요청이 필요하게 됨.
     - 오버페칭(과다수집): 사용자가 필요한 정보보다 많은 정보를 받는 것. 이로인해 불필요한 데이터를 받게 되고 대역폭이 낭비됨.
  3. 구조에 대한 명확한 규약이 없어서, 개발자 간에 많은 협조와 조정이 필요하고 이로인한 비용이 발생할 수 있음.

### SOAP (Simple Object Access Protocol)

- XML 기반의 메시지 교환 프로토콜.
- 1990년대에 개발된, 상대적으로 오래 된 프로토콜.
- **장점**
  1. 언어와 플랫폼에 완전히 독립적임.
  2. 오류 처리 기능이 내장되어있음.
     - REST에서도 상태코드 등을 통해 오류 처리를 할 수 있지만, SOAP에서는 오류 처리를 위한 별도의 표준화된 형식이 존재함.
  3. 보안이 용이하여 은행, 금융 등에서 사용하기 용이함.
     - REST와 다르게, WS-Security 등의 표준을 통해 보안을 제공함.
- **단점**
  1. 표준화되어 다양한 플랫폼에서 접근성이 용이하지만, 매우 형식적이고 장황해 질 수 있음.
  2. XML을 사용하므로, JSON에 비해 무겁고 처리 속도가 느림.
  3. 상대적으로 사용자가 줄어들고 있음.

### GraphQL

- REST의 언더페칭, 오버페칭 문제를 해결하기 위해 페이스북에서 개발한 쿼리 언어.
- 2015년에 공개됨.
- **장점**
  - API 사용자가 필요한 정보만을 요청할 수 있음.
- **단점**
  - 하나의 요청에 중첩된 데이터를 요청할 수 있으므로, 서버에 부하가 걸릴 수 있음.
  - REST와 달리, HTTP 메소드를 사용하지 않으므로, 캐싱이 어려움.

### gRPC (google Remote Procedure Call)

- g는 2015년에 구글에서 개발한 버전에 해당함.
- 다른 곳에 있는, 다른 문맥에서 실행되는 코드를 호출하는 기술.
- 사용자가 원격지에 있는 프로시저를 선택해서, 매개변수를 직렬화 해 전달하면, 원격지에서는 해당 프로시저를 실행하고 결과를 직렬화 해 전달함.
- **장점**
  1. HTTP/2를 기반으로 하므로, 다른 프로토콜에 비해 빠른 속도를 보여줌.
  2. 낮은 지연시간과 직렬화를 통한 빠른 데이터 전송 속도를 보여줌.
  3. Protocol Buffer를 사용하므로, 데이터를 효율적으로 압축할 수 있음.
  4. 다양한 언어를 지원하므로, 다양한 환경에서 사용하기 용이함.
- **단점**
  1. HTTP/2를 기반으로 하므로, HTTP/2를 지원하지 않는 환경에서는 사용할 수 없음.
  2. 바이너리 TCP, 데이터를 사용하므로, 디버깅이 어려움.

### WebSockets

- TCP 기반의 양방향 통신 프로토콜.
- HTTP와 달리, 클라이언트와 서버가 연결되어 양방향으로 데이터를 주고 받을 수 있음.
- 낮은 오버헤드를 가짐.
- **장점**
  1. 실시간 양방향 통신이 가능함.
  2. 서버가 클라이언트의 요청을 기다리지 않고, 클라이언트가 서버에게 데이터를 전송할 수 있음.
- **단점**
  1. HTTP와 달리, 연결을 유지해야 하므로, 서버에 부하가 걸릴 수 있음.

---

출처: [Postman blog - A guide to the different types of APIs](https://blog.postman.com/different-types-of-apis/)

---

## RESTful?

- 주요 용어
  - 자원, 문서(Resource, Document): 사용자가 접근 가능한 문서, 이미지, 데이터 등의 모든 것을 의미함.
  - 컬렉션(Collection): 서버에 존재하는 자원의 집합을 의미함.
  - URL(Uniform Resource Locator): 자원의 위치를 나타내는 문자열.

1. JSON을 사용한다
   1. XML은 파싱이 어렵고, 여타 프레임워크에서 지원이 부족하다.
   2. 반면에 JSON은 PHP, Python 등 다른 언어에서도 지원이 잘 되어있다.
2. 엔드포인트에 동사가 아닌 명사를 사용한다.
   1. GET, POST, PUT, DELETE 등의 HTTP 메소드가 이미 정의되어 동사로 사용되므로, 엔드포인트에 동사를 사용할 필요가 없다.
   2. 즉 `GET /getPosts`, `POST /createPost` 등의 형식이 아닌, `GET /posts`, `POST /posts` 등의 형식을 사용한다.
   3. 다만, http 메소드로 표현 할 수 없는 동사는 사용할 수 있다.
      1. 예를 들어, `PUT /posts/1/move`는 id가 1인 post를 이동시키는 것이다.
3. 컬렉션에는 복수형 명사를, 리소스에는 단수형 명사를 사용한다.
   1. API는 기본적으로 사용자가 접근 가능한 리소스의 집합으로 볼 수 있다.
   2. 예를 들어, `GET /leagues/seattle/teams/trebuchet/players`는 시애틀 팀의 트레뷰셋 팀의 선수들을 가져오는 것이다.
      1. 여기에서 `leagues`, `teams`는 컬렉션, `seattle`, `trebuchet`은 도큐먼트이다.
4. 상태코드를 사용한다.
   1. 상태코드를 사용하면, 클라이언트가 서버의 상태를 쉽게 파악할 수 있다.

      | 상태코드 | 설명 | 예시 |
      | --- | --- | --- |
      | 100 - 199 | 정보 | 102 processing |
      | 200 - 299 | 성공 | 200 OK |
      | 300 - 399 | 리다이렉션 | 301 moved permanently |
      | 400 - 499 | 클라이언트 에러 | 400 bad request |
      | 500 - 599 | 서버 에러 | 500 internal server error |

5. 중첩을 통해 관계를 표현한다.
   1. 예를 들어, `GET /posts/1/comments`는 id가 1인 post의 댓글을 가져오는 것이다.
   2. 이렇게 중첩을 통해 관계를 표현하면, 클라이언트가 서버의 구조를 쉽게 파악할 수 있다.
6. 요청된 데이터를 조회할 때, 필터, 정렬, 페이지네이션을 사용한다.
   1. 필터: `GET /posts?author=1`은 id가 1인 작성자의 post를 가져오는 것이다.
   2. 정렬: `GET /posts?sort=created_at`은 작성일자를 기준으로 post를 정렬하는 것이다.
   3. 페이지네이션: `GET /posts?page=1&limit=10`은 1페이지에 10개의 post를 가져오는 것이다.
7. 보안을 위해 SSL을 사용한다.
   1. SSL을 사용하면, 클라이언트와 서버 간의 통신이 암호화되므로, 중간에 데이터를 가로채더라도 데이터를 볼 수 없다.
8. 버저닝을 통해 API를 관리한다.
   1. 버저닝을 통해, API의 변경사항을 관리할 수 있다.
   2. `GET /v1/posts`, `GET /v2.0/posts`, `GET /2.0/posts` 등
9. 정확한 API 문서를 작성하고, 제공한다.
   1. 아래의 요소를 포함하는 것이 좋다.
    - 관련된 엔드포인트의 목록
    - 엔드포인트에 대한 요청의 예제
    - 몇가지 언어로의 기본적인 구현 예제
    - 각 에러에 대한 설명

### 구체적인 예시

- `POST /store/{store-id}/products`
  - 나쁜 예시

    ```request
    Content-Type: application/json
    {
      "name": "Product `""
    }
    ```

    ```response
    HTTP/1.1 200 OK
    Content-Type: application/json
    {
      "result": { "id": 1 }
    }
    ```

  - 좋은 예시

    ```request
    Content-Type: application/json
    {
      "name": "Product 1"
    }
    ```

    ```response
    HTTP/1.1 201 Created
    Location: /store/1/products/1

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Location: /store/1/products/1
    {
      "id": 1,
      "name": "Product 1"
    }
    ```

- `GET /store/{store-id}/products`
  - 나쁜 예시

    ```response
    HTTP/1.1 200 OK
    Content-Type: application/json
    {
      "result": [{
        "id": 1,
        "name": "Product 1"
      }]
    }
    ```

  - 좋은 예시

    ```response
    HTTP/1.1 200 OK
    Content-Type: application/vnd.store.product+json
    [{
      "id": 1,
      "name": "Product 1",
      "links": [{
        "self": "/store/1/products/1"
      }]
    }]
    ```

- `GET /store/{store-id}/products/{product-id}/comments`
  - 나쁜 예시

    ```response
    HTTP/1.1 200 OK
    Content-Type: application/json
    {
      "result": [{
        "id": 1,
        "product_id": 1,
        "text": "Comment 1"
      }]
    }
    ```
  
  - 좋은 예시

    ```response
    HTTP/1.1 200 OK
    Content-Type: application/vnd.store.product.comment+json
    [{
      "id": 1,
      "store_id": 1,
      "product_id": 1,
      "text": "Comment 1",
      "links": [{
        "self": "/store/1/products/1/comments/1",
        "product": "/store/1/products/1"
        "store": "/store/1",
      }]
    }]
    ```

### 고민해볼 케이스

- 파일 속성확인 / 다운로드
  - `GET /files/{file-id}`
    - 케이스 1
      - `GET /files/{file-id}/properties` 별도 사용
    - 케이스 2
      - `GET /files/{file-id}?properties=true` 쿼리스트링 사용
    - 케이스 3 (최적)
      - `GET /files/{file-id}` 엔드포인트 사용
        - `Accept: application/json` 헤더를 통해 JSON을 요청
        - `Accept: application/octet-stream` 헤더를 통해 파일을 요청 혹은
        - `Accept: image/png` 헤더를 통해 이미지를 요청

- GET 요청시 데이터 변경이 필요한 경우?
  - HTTP 스펙상 GET 메서드는 세이프 메서드이므로, 데이터 변경이 불가능함.
  - 따라서 정석은 GET 요청시 데이터 변경이 필요한 경우 PUT, POST, PATCH 등의 메서드를 함께 사용해서 리퀘스트를 두 번 보내는 것.
  - 혹은 쿼리스트링을 통해 데이터 변경을 요청하는 것: `GET /mails/{mail-id}?preview=true`, 정석은 아니지만, 일반적으로 많이 사용됨.

- 다수의 변경이 생기는 경우?

- HTTP 캐싱
  - 계산되는 정보의 경우?
  - 사용자마다 다른 정보를 제공하는 경우?: Role, Permission 등
  - 

---

출처: [REST API Best Practices – REST Endpoint Design Examples](https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/)
출처: [RESTful API Designing guidelines — The best practices](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)
