# CORS(Cross-Origin Resource Sharing)

## 1. CORS란?

- CORS는 **Cross-Origin Resource Sharing**의 약자로, 한국어로는 **교차 출처 리소스 공유**라고 한다.
- CORS는 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.
- 웹 애플리케이션은 리소스가 자신의 **출처(도메인, 프로토콜, 포트)와 다를 때** 교차 출처 HTTP 요청을 실행한다.
- **단순 요청**이 아닌 경우, 브라우저는 사전 요청(preflight request)를 실행하여 서버가 이 요청을 안전하게 실행할 수 있는지 확인한다.

## 2. 주요 개념

- **출처**(origin)
  - 스키마(http, https...), 호스트명, 포트로 구성된다.
  - ex) https://www.naver.com:443

- **단순 요청**(simple request)
  - 요청 메소드가 GET, HEAD, POST 중 하나이다.
  - 표준 헤더만 사용하고, 사용자 정의 헤더를 사용하지 않는다.
    - 표준 헤더: Accept, Accept-Language, Content-Language, Content-Type...
    - 사용자 정의 헤더: X-TEST, X-My-Custom-Header...
  - Content-Type이 application/x-www-form-urlencoded, multipart/form-data, text/plain 중 하나이다.

- **사전 요청**(preflight request)
  - 사전 요청은 OPTIONS 메소드를 사용한다.
  - 단순 요청이 아닌 경우, 브라우저는 사전 요청을 실행하여 서버가 이 요청을 안전하게 실행할 수 있는지 확인한다.
  - 사전 요청은 두 단계로 이루어진다.
    - 첫 번째 단계: OPTIONS 메소드를 사용하여 사전 요청을 실행한다.
      - 이 단계에서 header, method 등을 확인한다.
      - 또한 'Access-Control-Request-Method'와 'Access-Control-Request-Headers' 헤더가 서버에 전송됨.
      - 이에 대한 응답으로 'Access-Control-Allow-Methods'와 'Access-Control-Allow-Headers' 헤더가 전송됨.
    - 두 번째 단계: 실제 요청을 실행한다.
  - 캐시를 사용할 수 있다.
    - 사전 요청의 결과는 캐시에 저장할 수 있다.
    - 캐시를 사용하면 사전 요청을 다시 실행하지 않아도 된다.
    - 이는 Allow-Control-Max-Age 헤더를 사용하여 설정할 수 있다.

- **주요 헤더**
  - 'Access-Control-Allow-Origin': 요청을 허용하는 출처
    - '*'는 모든 출처를 허용한다는 의미이다.
    - ex) 'Access-Control-Allow-Origin': 'https://www.naver.com'
  - 'Access-Control-Allow-Methods': 요청을 허용하는 메소드
    - ex) 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  - 'Access-Control-Allow-Headers': 요청을 허용하는 헤더
    - ex) 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-SOME-HEADER'
  - 'Access-Control-Allow-Credentials': 요청에 쿠키를 포함할 수 있는지 여부
    - ex) 'Access-Control-Allow-Credentials': 'true'
  - 'Access-Control-Max-Age': 사전 요청의 결과를 캐시할 시간(초 단위)
    - ex) 'Access-Control-Max-Age': '86400'
