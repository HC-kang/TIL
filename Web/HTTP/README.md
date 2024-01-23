# HTTP

- 기본적으로 실제 통신은 L4(TCP)에 의해 이루어짐.

[참고문서](https://developer.mozilla.org/ko/docs/Web/HTTP)

## HTTP 개요

- HTTP(HyperText Transfer Protocol)
- 클라이언트와 서버의 존재를 전제로 하는 프로토콜
- 클라이언트와 서버 사이에 프록시, 게이트웨이, 터널 등의 중개자가 존재할 수 있음
- 무상태성(Stateless): 서버는 클라이언트의 상태를 보존하지 않음
  - 세션(Session)과 쿠키(Cookie)를 통해 상태를 유지할 수 있음

## HTTP 버전

### HTTP/0.9

- 헤더가 없는 간단한 요청과 응답
- 메서드는 GET만 존재
- 응답은 HTML만 전송 가능
- 예시
  - 요청: `GET /index.html`
  - 응답: `<html>...</html>`

### HTTP/1.0

- 자기설명적: 요청과 응답의 형식이 좀 더 명확히 정의되고, 설명을 위한 헤더가 추가됨
- 헤더 추가: 추가된 헤더로 인해 전송가능한 컨텐츠의 종류 등에 대한 확장성을 가짐
- 기본적으로 단기 커넥션(Short Lived Connection)을 사용
- 단순한 캐싱 메커니즘
  - `Expires` 헤더, `Last-Modified` 헤더 등
- 메서드의 추가
  - `HEAD`: GET과 동일하지만, 응답 본문을 제외한 헤더만 응답
  - `POST`: 서버에 데이터를 전송
- 예시
  - 요청
    - `GET /index.html HTTP/1.0`
    - `Accept: text/html` || `Accept: application/json`등
  - 응답
    - `HTTP/1.1 200 OK`
    - `Cache-Control: no-cache`
    - `Content-Type: text/html` || `Content-Type: application/json`등

### HTTP/1.1

- 지속적 커넥션(Persistent Connection, Keep-Alive)을 사용 할 수 있음
- 파이프라인 커넥션(HTTP Pipelining)을 사용 할 수 있음
- 청크 전송 인코딩(Chunked Transfer Encoding)을 사용 할 수 있음
  - 컨텐츠의 길이를 알 수 없는 경우에 사용
- 추가적인 캐시 제어 매커니즘 사용 가능
  - `Cache-Control` 헤더, `ETag` 헤더 등
- 메서드의 추가
  - `OPTIONS`: 서버의 통신 옵션을 확인하기 위한 메서드
  - `PUT`: 서버에 데이터를 저장/수정하기 위한 메서드
  - `DELETE`: 서버에 저장된 데이터를 삭제하기 위한 메서드

### HTTP/2

- 멀티플렉싱 사용
  - 단일 TCP 커넥션을 통해 여러 요청과 응답을 동시에 전송
  - HTTP/1.1의 파이프라인 커넥션에서 발생하는 HOL(Head Of Line) Blocking 문제를 해결
- 서버 푸시를 사용: 서버가 클라이언트의 요청을 기다리지 않고 능동적으로 리소스를 클라이언트에게 전송
- 헤더 압축을 사용: HPACK 압축 형식을 사용하여 헤더 메타데이터를 압축
- 이진 프레이밍 레이어(Binary Framing Layer)를 사용
  - 요청과 응답을 프레임으로 나눔
  - 이진 프레이밍은 프로토콜의 효율성과 신뢰성을 향상시키고, 멀티플렉싱을 더욱 효과적으로 만듭니다.
  - 사람이 읽을 수 없는 이진 형식으로 데이터를 전송

## HTTP 커넥션 관리

### 단기 커넥션(Short Lived Connection)

- HTTP/1.0의 기본 커넥션(`Connection` 헤더가 없거나, 그 값이 `close`인 경우)
- HTTP/1.1에서는 `'Connection: close'` 헤더를 사용한 경우에만
- 매 번 TCP 커넥션을 맺고 끊음: 오버헤드가 큼

### 영속적 커넥션(Persistent Connection, Keep-Alive)

- Keep-Alive 헤더를 통해 연결이 얼마나 열려있어야 하는 지 명시
- 단, TCP 커넥션이 맺어진 채로 유휴상태인 경우 서버 리소스가 낭비됨.

### 파이프라인 커넥션(HTTP Pipelining)

- 화면 하나에 대응하는 적당한 크기의 RTT(Round Trip Time)를 가정
- 정확한 구현이 어려움
- HOL(Head Of Line) Blocking: 앞선 요청이 끝나지 않으면 뒤의 요청은 처리되지 않음
- 멱등성이 보장되는 요청에 대해서만 사용 가능(GET, HEAD, PUT, DELETE)
- 사실상 단점이 더 많아, HTTP/2에서는 멀티플렉싱으로 대체됨.

## CORS 문제와 해결

## HTTP 압축

### 종단간 압축

- body를 압축하여 전송

### hop-by-hop 압축

- 클라이언트와 서버 간의 특정 노드와 노드 간의 바디 압축

## HTTP 조건부 요청

- 특정 헤더 값에 의존하여 기존과는 다르게 실행되는 요청
  - GET 등 safe 메서드는 연관되어있는 경우에만 회신
  - PUT 등 unsafe 메서드는 발송된 원본 문서가 서버에 저장되에있는 원본과 같은 경우에만 회신

### 검사기

- 매 번 전체 리소스를 바이트 대 바이트로 비교하는 것은 불가능함.
  - 따라서 조건부 요청은 리소스의 버전을 명시하고, 이를 비교하는 방식임.

#### 강한 검사

- 비교하는 두 리소스가 byte to byte로 동일한지 비교하는 것.
- 일부 조건부 헤더에는 무조건 적용이며, 다른 조건부 헤더에는 기본값임.
- 성능의 손실을 감수하더라도 정확한 결과를 얻어야 하는 경우에 사용

#### 약한 검사

- 두 문서의 버전이 같은지 비교하는 것.
- 경우에 따라 약간의 변경에 대해서는 같은 것으로 간주할 수 있음.

### 조건부 헤더

-

[참고 - rfc7232](https://datatracker.ietf.org/doc/html/rfc7232)

## (+)HTTP 협상

- 클라이언트가 보내는 특정 HTTP 헤더(`Accept`...)를 이용하는 방법
- 서버에서 전달되는 상태코드(`300 Multiple Choices`, `406 Not Acceptable`)를 이용하는 방법

### 서버 주도 콘텐츠 협상

-

### 에이전트 주도 협상

## HTTP 캐싱

- 캐싱의 대상

  - HTML 문서, 이미지 혹은 파일 등의 GET 요청에 대한 200 응답(OK)
  - 영구적인 리다이렉트: 301
  - 오류 응답: 404
  - 완전하지 않은 결과: 206
  - 캐시 키로 사용하기 적절한 무언가가 정의된 GET 이외의 응답

- 캐싱의 제어
  - `'Cache-Control': 'no-store' || 'no-cache' || 'public' || 'private'`
    - `'no-store'`: 캐시를 사용하지 않음. 관련 사항을 저장하면 안된다는 의미
    - `'no-cache'`: 캐시를 사용하지 않음. 관련 사항을 저장하되, 서버에 재검증 요청을 보내고 확인한 후에 응답을 사용해야 함.
    - `'public'`: 캐시를 사용할 수 있음. 공용 캐시에 저장해도 됨.
    - `'private'`: 캐시를 사용할 수 있음. 개인화 캐시에 저장해야 함.
  - `'Cache-control': 'max-age=3600'`
  - `'Pragma': 'no-cache'`: HTTP/1.0과 하위호환성을 위해서만 사용

[참고 - rfc7234](https://datatracker.ietf.org/doc/html/rfc7234)

## 주요 상태코드

### 1xx

- 추가 정보 제공
  - 102 Processing: 서버가 요청을 수신하였으며, 아직 요청을 처리 중임

### 2xx

- 성공
  - 200 OK: 요청이 성공적으로 수행됨
  - 201 Created: 요청이 성공적으로 수행되었으며, 새로운 리소스가 생성됨
  - 204 No Content: 요청이 성공적으로 수행되었으며, 서버가 응답 본문에 어떠한 정보도 제공하지 않음

### 3xx

- 리다이렉션
  - 301 Moved Permanently: 요청한 리소스에 대한 URI가 변경되었음
  - 304 Not Modified: 클라이언트가 이미 리소스를 가지고 있으며, 이것이 수정되지 않았음을 알려줌

### 4xx

- 클라이언트 에러
- 요청에 문제가 있음
  - 400 Bad Request: 잘못된 요청
  - 401 Unauthorized: 인증이 필요함
  - 403 Forbidden: 요청이 서버에 의해 거부됨
  - 404 Not Found: 요청한 리소스가 서버에 존재하지 않음
  - 429 Too Many Requests: 요청이 너무 많음

### 5xx

- 서버 에러
- 서버측에 문제가 있음
  - 500 Internal Server Error: 서버에 문제가 있음
  - 503 Service Unavailable: 서버가 요청을 처리할 준비가 되지 않음
  - 504 Gateway Timeout: 서버가 게이트웨이 역할을 하고 있으며, 게이트웨이가 제한 시간 내에 응답을 받지 못함

### 기타

[참고 - rfc2616](https://datatracker.ietf.org/doc/html/rfc2616#section-10)

## wireshark을 활용한 패킷 분석 방법

### TCP 3-Way Handshake

- TCP 커넥션을 맺기 위해 3번의 패킷 교환을 하는 과정
- SYN, SYN/ACK, ACK 순으로 패킷을 교환함.

### TCP 4-Way Handshake

- TCP 커넥션을 종료하기 위해 4번의 패킷 교환을 하는 과정
- FIN, ACK, FIN, ACK 순으로 패킷을 교환함.

[참고자료 - 네트워크 쉽게 이해하기](https://mindnet.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-22%ED%8E%B8-TCP-3-WayHandshake-4-WayHandshake)
