![](https://velog.velcdn.com/images/hc-kang/post/3e4522ae-dacc-4ec0-8455-ecddd19d17f5/image.png)

## HTTP 개요 - HTTP란 무엇일까?

HTTP는 `HyperText Transfer Protocol`의 약자이고, 말 그대로 하이퍼텍스트를 전송하는 규약입니다.
여기에서 하이퍼텍스트(HyperText)란 우리가 흔히 `링크`라고도 부르는 것인데, 어릴 때 쓰던 게시판에서 파란색 텍스트를 클릭하면 다른 문서로 이동하고 이미 한 번 클릭했던 텍스트는 보라색으로 변했던 것을 기억하실겁니다. 이것이 바로 `하이퍼텍스트`입니다.

![](https://velog.velcdn.com/images/hc-kang/post/59e527da-0bde-4687-87e7-4ef1716fc9ef/image.png)

조금 더 과거로 돌아가서 발단을 알아보자면, 사실 HTTP의 최초 목적은 연구기관(CERN)에서 연구자료를 공유하기 위한 목적으로 시작되었습니다.
이러한 연구자료, 특히 논문은 상호 참조되는 경우가 많았는데요, 이를 위해 문서에서 다른 문서를 쉽게 참조하기 위한 방법이 필요했습니다. 이러한 수요로 인해 등장한 것이 바로 `하이퍼텍스트`입니다. 그리고 이를 효율적으로 작성하고 사용 할 수 있는 HyperText Markup Language, 즉 HTML도 이 때 같이 등장하게 되었습니다.

> HTTP는 텍스트 기반의 프로토콜이다.

예전에 처음 논문을 볼 때 한글이나 워드 등의 별도의 프로그램이 없이도 브라우저에서 이를 바로 볼 수 있다는 것을 신기해했었는데, 지금 와서 생각해보니 오히려 이게 더 당연한 것이었던 것 같다는 생각이 드네요.

다시 본론으로 돌아가서 이러한 HTTP의 특징에 대해 좀 더 알아보겠습니다.

앞서말한 연구자료의 공유 측면에서 생각해볼때, 필연적으로 소비자와 공급자가 생기게 됩니다. 누군가는 연구 자료를 요청하고, 누군가는 이를 응답하는 쌍방의 관계가 생기는거죠. 즉 본질적으로 클라이언트와 서버의 관계를 전제로 하는 프로토콜이라고 할 수 있습니다.

> HTTP는 클라이언트와 서버의 존재를 전제로 하는 프로토콜이다.

또한, 초기 목적이 연구자료의 간단한 공유였기에 공급자들은 상태관리등의 복잡한 기능을 필요로 하지 않았습니다. 그저 요청 하나를 받으면 하나의 응답을 주는 간단한 방식이었죠. 이러한 특징으로 인해 HTTP는 무상태성(Stateless)을 가지고 있습니다. - 물론 현재는 세션과 쿠키를 통해 상태를 유지할 수도 있습니다. 이는 이후에 다루도록 하겠습니다 -

> HTTP는 무상태성(Stateless)인 성격을 가지고 있다.

'각각의 요청이 독립적이고, 서버는 클라이언트의 상태를 보존하지 않는다.'
이러한 특성에서 또다른 특징을 도출 할 수 있습니다. 바로 HTTP는 자기설명적(Self-Descriptive)이라는 것입니다. 왜냐하면 상태를 갖지 않는 독립된 요청만으로 판단하여 응답해야 하기 때문이죠. 이를 위해 요청과 응답의 형식이 명확히 정의되어 있고, 설명을 위한 헤더가 추가되었습니다. 물론 이 과정이 한번에 이루어진 것은 아닙니다. 이 과정에 대해서도 후에 차차 알아보도록 하겠습니다.

> HTTP는 상태코드와 헤더를 사용하여 자기설명적(Self-Descriptive)인 성격을 가지고 있다.

이러한 특성으로 인해 HTTP는 사용하기 편하고 높은 확장성을 가진 프로토콜이 되었습니다. 이러한 특성들을 기반으로 넓은 범위의 웹 서비스에 활용되며, 이 과정에서 다양한 기능과 사용법이 추가되었습니다. 특히 단순한 클라이언트-서버 구조뿐 아니라, 프록시, 게이트웨이, 터널 등의 여러 중개자가 존재하는 복잡한 구조에서도 사용될 수 있게 되었습니다.

> HTTP에서 서버와 클라이언트 사이에는 프록시, 게이트웨이, 터널 등 여러 중개자가 존재할 수 있다.

<!-- - 클라이언트와 서버의 존재를 전제로 하는 프로토콜
- 클라이언트와 서버 사이에 프록시, 게이트웨이, 터널 등의 중개자가 존재할 수 있음
- 무상태성(Stateless): 서버는 클라이언트의 상태를 보존하지 않음
  - 세션(Session)과 쿠키(Cookie)를 통해 상태를 유지할 수 있음 -->

## HTTP 버전 - HTTP의 발전과정 톺아보기

### HTTP/0.9

사실 처음에는 '0.9'에 해당하는 버전이 존재하지 않았습니다. 단순히 HTTP였죠. 이후 좀 더 다듬어진 HTTP/1.0이 등장하면서 이와 구분하기위해 '0.9'라는 표현이 사용되었습니다.

0.9 버전의 HTTP는 처음에 언급했던대로 굉장히 단순한 형태를 가지고 있었습니다. 헤더가 없는 간단한 요청과 응답만을 지원하며, 메서드는 GET만 존재했습니다. 또한 응답은 HTML만 전송 가능했습니다.

- HTTP/0.9의 예시
  - 요청

    ```http
    GET /index.html
    ```

  - 응답

    ```html
    <html>\nSOME HYPERTEXT DOCS\n</html>
    ```

- 위에서 볼 수 있듯이, 요청은 GET 메서드만 사용할 수 있습니다.
- 응답은 HTML만을 전송할 수 있으며, 응답 본문만을 전송하고 헤더는 존재하지 않습니다
- 요청과 응답 모두 단순하게 하나의 행으로 구성되어있습니다.

### HTTP/1.0

HTTP/1.0은 0.9 버전에 비해 많은 변화가 있었습니다. 먼저 그 중 가장 큰 두 가지 변화를 살펴보겠습니다.

첫째로, 요청과 응답의 형식이 좀 더 명확히 정의되었고습니다. 요청에는 메서드, URI, 프로토콜 버전이 포함되며, 메서드도 `GET`뿐만 아니라 `HEAD`, `POST` 요청이 추가되었습니다. 응답의 경우에는 상태코드와 상태 메시지가 추가되어 요청에 대한 처리 결과를 보다 명확하게 전달할 수 있게 되었습니다.

둘째로, 요청과 응답에 대한 설명, 즉 메타정보를 위한 헤더가 추가되었습니다. 따라서 요청시에 클라이언트는 `Accept` 헤더를 통해 (HTML 외에도)원하는 컨텐츠의 종류를 명시할 수 있게 되었고, 서버는 `Content-Type` 헤더를 통해 전송하는 컨텐츠의 종류를 명시할 수 있게 되었습니다.

- HTTP/1.0의 예시
  - 요청

    ```http
    GET /home HTTP/1.0\r\n
    Host: localhost:3000\r\n
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7\r\n
    Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6\r\n
    Cache-Control: no-cache\r\n
    Connection: close\r\n
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36\r\n
    \r\n
    ```

  - 응답

    ```http
    HTTP/1.0 200 OK\r\n
    Content-Type: text/html\r\n
    Content-Length: 100\r\n
    Date: Fri, 10 May 2024 14:04:16 GMT\r\n
    Connection: close\r\n
    \r\n
    <!DOCTYPE html>\r\n
    <html lang="en">\r\n
    <head>\r\n
        <meta charset="UTF-8">\r\n
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n
        <title>Home with images</title>\r\n
    </head>\r\n
    <body>\r\n
        <div>\r\n
            <img src="./some/image.png" alt="someimage">\r\n
        </div>\r\n
    </body>\r\n
    </html>
    ```

HTTP/0.9와 다르게 요청과 응답이 길어졌습니다. 이제는 개행문자를 사용하여 요청과 응답 내에서 영역(행)을 구분할 수 있어졌고, 이를 통해 상태와 헤더, 본문을 구분할 수 있게 되었습니다. 그리고 `Accept` 헤더를 통해 HTML 외에 다양한 리소스를 요청 할 수 있게되었습니다. 또한 요청의 경우 개행문자를 두 번 사용하여 요청의 끝을 명시하게 되었고 응답의 경우 `Content-Length` 헤더를 통해 본문의 길이를 명시할 수 있게 되어 이를 통해 본문의 끝을 알 수 있게 되었습니다.

이러한 변화로 인해 HTTP/1.0은 좀 더 자기설명적(Self-Descriptive)인 성격을 띄게 되었을 뿐더러, 헤더를 사용해 몇 가지 추가적인 기능을 사용 할 수 있게 되었습니다. 바로 `지속적 커넥션`과 `캐싱`입니다.

먼저 `지속적 커넥션`에 대해 먼저 알아보겠습니다.
HTTP/0.9부터 모든 요청은 단기 커넥션(Short Lived Connection)을 사용했습니다. 즉, 매 요청마다 TCP 커넥션을 맺고 끊었습니다. 이는 오버헤드가 크고 비효율적이었습니다. 이에 HTTP/1.0에서는 `Connection: keep-alive` 헤더를 통해 지속적 커넥션을 사용할 수 있게 되었습니다. 이를 통해 하나의 TCP 커넥션을 통해 여러 요청과 응답을 주고 받을 수 있게 되었습니다. 그러나 이때까지는 기본적으로 커넥션을 일회성으로 사용했으며 필요한 경우 `Connection: keep-alive` 헤더를 통해 지속적 커넥션을 사용할 수 있었습니다.

![](https://velog.velcdn.com/images/hc-kang/post/be9a0c71-13b2-453d-bee7-70e05cae3dd7/image.png)

- `Connection: close`: 커넥션을 닫음
  - ![](https://velog.velcdn.com/images/hc-kang/post/d421a0cd-d7b9-4462-8718-8939f4ca447b/image.png)

- `Connection: keep-alive`: 커넥션을 유지 / 재활용
  - ![](https://velog.velcdn.com/images/hc-kang/post/753e7488-90bd-49bc-b544-ddd09d642b93/image.png)

이어서 `캐싱`에 대해 알아보겠습니다.
인터넷이 발전함에 따라 점차 웹 컨텐츠가 증가함에 따라 한 페이지를 표시하는데에 수십개 이상의 리소스를 다운로드하는 경우가 생기기 시작했습니다. 당연히 이중에는 동일한 리소스를 다시 요청하는 경우도 많았죠. 여기서 개발자들은 굳이 동일한 리소스를 매번 받을 필요가 없다는 사실을 깨닫습니다. 여기서 먼저 `Last-Modified`헤더가 등장합니다.

```http
Last-Modified: Wed, 08 May 2024 08:00:00 GMT
```

서버는 이제 응답을 보낼 때, 위와 같은 헤더를 추가합니다. 이를 통해 해당 컨텐츠가 언제 수정되었는지를 클라이언트에게 알립니다. 이때 클라이언트는 `200 OK`를 수신하며 결과를 로컬에 저장합니다.

```http
If-Modified-Since: Wed, 08 May 2024 08:00:00 GMT
```

이제부터 클라이언트는 같은 요청을 다시 보낼 때 위와 같은 헤더를 추가합니다. 그리고 서버는 이 헤더와 자신이 가진 정보를 비교한 수 최신 정보라면 `304 Not Modified` 상태코드와 빈 본문을 응답합니다. 만약 최신이 아니라면 다시금 `200 OK`과 본문을 리턴합니다.

그런데 여기서도 약간 모자랍니다. 왜냐하면 결국 통신은 클라이언트와 서버 사이를 왕복해야 하기 때문이죠. 여기서 새로운 방법인 `Expired` 헤더가 또다시 등장합니다.

```http
Expires: Wed, 08 May 2024 08:00:00 GMT
```

이제 서버는 응답을 보낼 때 위와 같은 헤더를 추가합니다. 이를 통해 해당 컨텐츠가 언제까지 유효한지를 클라이언트에게 알립니다. 이때 클라이언트는 `200 OK`를 수신하며 결과를 로컬에 저장합니다.
그리고 이제 클라이언트는 동일한 리소스가 다시 필요할 때, `Expires` 값과 현재 시간을 비교하여 캐시가 유효한지를 판단합니다. 이 방법은 최소한의 확인 요청조차 없이 캐시를 사용할 수 있게 하여 트래픽을 줄여줍니다.

### HTTP/1.1

위처럼 HTTP/1.0에서 많은 발전이 있었습니다. 그러나 아직 부족한 점이 많았고, 이에 HTTP/1.1이 등장하면서 이러한 부족한 점을 보완하고 새로운 기능을 추가하였습니다. 그에따라 현재까지도 HTTP/1.1은 가장 널리 사용되고 있는 버전입니다.

- HTTP/1.1의 예시
  - 요청

    ```http
    GET /home HTTP/1.1\r\n
    Host: localhost:3000\r\n
    Connection: keep-alive\r\n
    Pragma: no-cache\r\n
    Cache-Control: no-cache\r\n
    sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", \r\n"Not-A.Brand";v="99"\r\n
    sec-ch-ua-mobile: ?0\r\n
    sec-ch-ua-platform: "macOS"\r\n
    Upgrade-Insecure-Requests: 1\r\n
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) \r\nAppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 \r\nSafari/537.36\r\n
    Accept: text/html,application/xhtml+xml,application/xml;q=0.\r\n9,image/avif,image/webp,image/apng,*/*;q=0.8,application/\r\nsigned-exchange;v=b3;q=0.7\r\n
    Sec-Fetch-Site: none\r\n
    Sec-Fetch-Mode: navigate\r\n
    Sec-Fetch-User: ?1\r\n
    Sec-Fetch-Dest: document\r\n
    Accept-Encoding: gzip, deflate, br, zstd\r\n
    Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6\r\n
    \r\n
    ```

  - 응답

    ```http
    HTTP/1.1 200 OK\r\n
    Content-Type: text/html\r\n
    Date: Fri, 10 May 2024 14:22:39 GMT\r\n
    Connection: keep-alive\r\n
    Keep-Alive: timeout=5\r\n
    Content-Length: 455\r\n
    \r\n
    <!DOCTYPE html>\r\n
    <html lang="en">\r\n
    <head>\r\n
        <meta charset="UTF-8">\r\n
        <meta name="viewport" content="width=device-width, \r\ninitial-scale=1.0">\r\n
        <title>Home with images</title>\r\n
    </head>\r\n
    <body>\r\n
        <div>\r\n
            <img src="http://localhost:3000/images/iu1.png" \r\nalt=".........1">\r\n
            <img src="http://localhost:3000/images/iu2.png" \r\nalt=".........2">\r\n
            <img src="http://localhost:3000/images/iu3.png" \r\nalt=".........3">\r\n
        </div>\r\n
    </body>\r\n
    </html>
    ```

HTTP/1.1에 추가된 주요 기능은 다음과 같습니다.

- 지속적 커넥션(Persistent Connection, Keep-Alive)이 기본으로 채택됨
  - 크롬 브라우저에서는 기본적으로 `Connection: Keep-Alive`를 사용합니다.
    - ![](https://velog.velcdn.com/images/hc-kang/post/d437a4fc-78b3-4647-ba8a-69f2f111ac38/image.png)
    - 보시다시피 Connection ID를 일부 공유하는 것을 볼 수 있습니다.
    - 또한 패킷을 직접 떠보면 아래와 같이 두 가지 요청이 하나로 이어져있음을 확인 할 수 있습니다.
      - 이미지!!@@@@@@@@@@@@
  - 서버에서 강제로 `Connection: close`를 사용하면 아래와 같은 결과를 볼 수 있습니다.
    - ![](https://velog.velcdn.com/images/hc-kang/post/7c4be00e-ea99-4b19-835e-5c5207f67c25/image.png)
    - 매 요청마다 다른 커넥션을 사용하는것을 볼 수 있습니다.

   
- 청크 전송 인코딩(Chunked Transfer Encoding)을 사용할 수 있음
- 기타 메서드의 추가: `OPTIONS`, `PUT`, `DELETE`
- 보다 진보된 캐시 제어 매커니즘 사용 가능: `Cache-Control`, `ETag` 등 헤더 추가
  - `Cache-Control: no-store`: 캐시를 사용하지 않음
    - `Cache-Control: no-cache`: 캐시를 사용하지 않음. 서버에 재검증 요청을 보내고 확인한 후에 응답을 사용해야 함
    - `Cache-Control: public`: 캐시를 사용할 수 있음. 공용 캐시에 저장해도 됨
    - `Cache-Control: private`: 캐시를 사용할 수 있음. 개인화 캐시에 저장해야 함
- `Host` 헤더 추가: 하나의 서버에 여러 도메인을 사용 할 수 있음

이처럼, HTTP/1.1에는 헤더를 바탕으로 수많은 기능이 추가되었습니다. 이러한 기능들은 HTTP의 확장성을 높이고, 더욱 다양한 웹 서비스를 제공할 수 있게 되었습니다. 이때문에 HTTP/2.0은 물론 HTTP/3.0이 등장한 현재까지도 HTTP/1.1은 가장 널리 사용되는 버전이 되었습니다.
