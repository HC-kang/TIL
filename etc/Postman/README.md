---
title: Postman
date: 2024-04-31
tags: [Postman, API, 테스트, 환경변수, 자동화]
alias: [Postman]
---

# Postman

## bearer token 자동화

1. 매 API에 pre-request script 적용
  1. 장점
    1. 로그인이 필요없다.
    2. 간단하다.
  2. 단점
    1. API 응답시간이 길어진다.
    2. 정확한 API 응답시간 측정이 불가능해진다.
  3. 예시

    ```javascript
    // Pre-request Script
    const tokenUrl = 'http://{로그인 URL}}';
    const clientId = '0000';
    const clientSecret = '0000';

    const getTokenRequest = {
      method: 'POST',
      url: tokenUrl,
      body: {
          mode: 'formdata',
          formdata: [
              { key: 'email', value: clientId },
              { key: 'password', value: clientSecret }
          ]
      }
    };

    pm.sendRequest(getTokenRequest, (err, response) => {
      const jsonResponse = response.json();
      const newAccessToken = jsonResponse.access_token;

      pm.variables.set('token', newAccessToken);
    });
    ```

2. 로그인 API 작동시 환경변수 최신화
  1. 장점
    1. 다른 API 작동 시간에 영향이 없다.
  2. 단점
    1. 로그인을 세션이 죽을 때 마다 매번 새로 해줄 필요가 있다.
  3. 예시

    ```javascript
    // login API's test script
    var data = JSON.parse(responseBody);
    pm.environment.set("token", data.access_token);
    ```

## post json body에 주석처리하기

- pre-request script

  ```javascript
  console.log('Running pre-request script...');

  // 주석 제거
  const stripComments = jsonBody => {
      return jsonBody.replace(/"(?:\\.|[^"\\])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
  };

  // 트레이싱 컴마 제거
  const stripTrailingCommas = jsonBody => {
      return jsonBody.replace(/,\s*([\]}])/g, '$1');
  };

  const preprocessJsonBody = jsonBody => {
      let processedJson = jsonBody;
      try {
          processedJson = stripComments(processedJson);
          processedJson = stripTrailingCommas(processedJson);
      } catch (error) {
          console.error('Error during JSON preprocessing:', error);
      }
      return processedJson;
  };

  let jsonBody = pm.request.body.raw;

  jsonBody = preprocessJsonBody(jsonBody);

  pm.request.body.raw = jsonBody;

  console.log('Processed JSON:', jsonBody);
  console.log('Pre-request script is executed!');
  ```

  - pre-request script에 위 코드 추가.
  - 컬렉션 단위로도 적용 가능
