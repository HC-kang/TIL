# 쏙쏙 들어오는 함수형 코딩(원제: Grokking Simplicity) 독서 정리

- 참고 URL
  - [Code downloads](https://www.manning.col/downloads/2263)
  - [Book's website](https://grokkingsimplicity.com/)

## CHAPTER 1 쏙쏙 들어오는 함수형 코딩에 오신 것을 환영합니다(p1)

- 주요 내용
  - 함수형 사고란?
  - 다른 함수형 프로그래밍 도서와의 차이점
  - 함수형 프로그래머가 코드를 바라보는 방법
  - 일급 추상

### 함수형 프로그래밍이란?
  
- 사전적 정의
  - 수학 함수를 사용하고, 부수효과(side effect)를 피하는 것이 특징인 프로그래밍
  - 부수효과 없이 순수함수(pure function)를 사용하는 프로그래밍
  - 부수효과
    - 함수가 리턴값 이외에 하는 모든 일
    - 다른 시선으로 보면, 프로그램을 사용하는 목적이 될 수도 있음.
  - 순수함수
    - 인자에만 의존하고 부수효과가 없는 함수
- 실제
  - 부수효과와 순수하지 않은 함수도 사용
  - 다만 부수효과를 잘 관리해서 적소에 사용하는 것이 목표
  - 코드를 액션, 계산, 그리고 데이터로 구분해서 사용함.
    - 액션: 호출한 시간, 횟수 등에 따라 결과가 달라질 수 있는 코드
    - 계산: 호출 시간, 횟수 등 다른 조건에 관계없이 항상 같은 결과를 내는 코드
    - 데이터: 이벤트에 대해 기록한 사실. 실행하지 않아도 결과를 알 수 있음.

### 함수형 프로그래머는 부를 때 조심해야 하는 코드를 구분한다

- 액션
  - 호출하는 시점에 의존함.
  - 매 호출마다 해당 시점의 상태에 따라 결과가 달라질 수 있음.
  - 따라서 호출 시 유의해야 함.
- 계산
  - 호출하는 시점과 무관함.
  - 매 호출마다 항상 같은 결과를 내기 때문에 호출 시 유의할 필요가 없음.
  - 따라서 큰 우려 없이 언제든 호출해서 사용해도 무방함

### 함수형 프로그래머는 실행하는 코드와 그렇지 않은 코드를 구분한다

- 계산: 실행하기 전까지는 결과를 알 수 없음.
- 데이터
  - 실행하지 않아도 결과를 알 수 있음.
  - 이벤트에 대한 사실을 기록한 것.

### 함수형 프로그래머는 코드를 세 가지로 분류한다

- 액션: 실행 시점이나 횟수 등에 의존하는 코드
- 계산
  - 입력값으로 출력값을 만드는 것.
  - 테스트가 쉽고, 언제든 안전하게 호출 할 수 있음
- 데이터
  - 이벤트에 대한 사실을 기록한 것.
  - 실행하지 않아도 결과를 알 수 있음.

### 코드를 구분해서 얻을 수 있는 장점

- 실행 시점이나 횟수에 의존하는 코드(액션)을 없앨수록, 코드는 읽고 이해하기 쉬워짐.
- 따라서 심각한 버그를 사전에 발견하고 줄일 수 있음.
- 또한, 이러한 액션을 격리시키면 테스트하기 쉬워짐.

### 함수형 사고란?

- 코드를 액션, 계산, 데이터로 구분해서 생각하는 것.
- 일급 추상의 개념을 사용하는 것.
  - 일급 추상: 함수를 인자로 받거나, 함수를 리턴하는 것.

## CHAPTER 2 현실에서의 함수형 사고(p17)

### 토니 피자를 예시로 한 함수형 사고 예제

- 파트1
  - 액션과 계산, 데이터
  - 계층형 설계의 원칙
- 파트2
  - 일급 추상
  - 일급 함수
  - 분산시스템
  - 타임라인 다이어그램의 사용

## CHAPTER 3 액션과 계산, 데이터의 차이를 알기(p31)

- 주요 내용
  - 액션과 계산, 데이터의 차이
  - 실제 사례에서 액션과 계산, 데이터를 구분해 보기
  - 액션이 전체 코드로 전파되는 원리 이해하기
  - 이미 존재하는 코드에서 액션을 찾아내는 방법

### 액션과 계산, 데이터

- 문제에 대해 생각할 때
  - 액션과 계산, 데이터로 구분해서 생각해 보기
  - 주의해야 할 부분(액션)을 사전에 파악할 수 있음.
- 코딩할 때
  - 액션에서 최대한 계산을 분리해내기
  - 계산에서는 최대한 데이터를 분리해내기
- 코드를 읽을 때
  - 액션을 찾아내기: 주의해야 할 부분
  - 액션과 계산, 데이터를 분리하는 리팩토링이 가능한지 생각해 보기

### 액션과 계산, 데이터는 어디에나 적용 할 수 있다

- 실제 사례에 적용 해 보기
  - 장보기 과정
    - 함수형 사고를 적용하지 않은 경우 -> 모두 액션으로 뭉뚱그려짐
      1. 냉장고를 확인한다 - 액션: 냉장고 확인 시점에 따라 내용물이 다름
      2. 운전해서 상점으로 이동한다 - 액션: 매 운전마다 연료의 잔량이 줄어듦
      3. 필요한 것을 구매한다 - 액션: 구매 시점에 따라 구매할 수 있는 물품이 달라짐
      4. 운전해서 집으로 돌아간다 - 액션: 이미 집에있다면 운전해서 집으로 돌아 갈 수 없으니 시점이 중요함.

    - 함수형 사고를 적용: 액션과 계산, 데이터를 구분해서 생각해 보기
      1. 냉장고 확인: 액션
      2. 냉장고의 현재 재고: 데이터
      3. 필요한 재고: 데이터
      4. 구매해야 할 재고 산출(필요한 재고 - 냉장고의 현재 재고): 계산
      5. 구매해야 할 재고: 데이터
      6. 목록에 있는 상품 구매하기: 액션
      7. 운전해서 집으로 돌아오기: 액션

### 장보기 과정에서 배운 것

1. 액션과 계산, 데이터는 어디든 적용 할 수 있음
2. 액션 안에는 계산과 데이터, 또다른 액션이 숨어있음
   1. 위 장보기 예제처럼, 액션 안에는 계산과 데이터가 숨어있음
3. 계산은 더 작은 계산과 데이터로 나누고 연결 할 수 있음
4. 데이터는 데이터로만 조합 할 수 있음(?)
   1. 데이터는 주변에 영향을 미치지 않고 이질적이므로, 데이터를 먼저 찾아내는 것이 좋음.
5. 계산은 때로 '머릿속에서 자동으로' 일어남
   1. 따라서 이러한 계산을 찾아내기 어려움.
   2. 결정과 계획은 계산이 될 가능성이 높다는 점을 기억하기

### 쿠폰 보내는 과정을 그려보기

1. 구독자 목록 - 데이터
2. DB에서 구독자를 가져오기 - 액션
3. 쿠폰 목록 - 데이터
4. DB에서 쿠폰 목록 가져오기 - 액션
5. 이메일 목록 - 데이터
6. 보내야 할 이메일 목록 만들기 - 계산
7. 이메일 전송하기 - 액션

- 위처럼 이메일 목록을 먼저 만드는 것이 테스트하기 좋음. 계산으로 구분되어있기에 언제든 테스트 해 볼 수 있기 때문임.

- 이 과정에서 이메일 목록을 만드는 계산을 좀 더 세분화 할 수 있음
  - 쿠폰의 등급 구분하기
    1. 쿠폰 목록 - 데이터
    2. Good 등급 쿠폰 선택하기 - 계산
    3. Good 등급 쿠폰 목록 - 데이터
    4. Best 등급 쿠폰 선택하기 - 계산
    5. Best 등급 쿠폰 목록 - 데이터
  - 구독자의 쿠폰 등급 구분하기
    1. 구독자 목록 - 데이터
    2. 구독자별 쿠폰 등급 구분하기 - 계산
    3. 구독자별 쿠폰 등급 목록 - 데이터

- 결과적으로 아래과 같은 과정을 거쳐, 이메일 목록을 만들 수 있음
  1. 구독자 목록 - 데이터
  2. Good 등급 쿠폰 목록 - 데이터
  3. Best 등급 쿠폰 목록 - 데이터
  4. 구독자별 쿠폰 등급 결정하기 - 계산
  5. 구독자별 쿠폰 등급 목록 - 데이터
  6. 구독자 쿠폰 등급에 따라 쿠폰을 첨부한 이메일 목록 만들기 - 계산
  7. 이메일 목록 - 데이터

- 코드

  ```ts
  type Subscriber = {
    email: string
    rec_count: number,
  }
  const subscriber = {
    email: 'sample@email.com',
    rec_count: 16,
  }

  const rank1 = 'best';
  const rank2 = 'good';

  // 계산. 이 함수는 명확하고, 테스트하기 쉬움.
  function subCouponRank(subscriber) {
    if (subscriber.rec_count > 10) {
      return 'best';
    } else {
      return 'good';
    }
  }

  type Coupon = {
    code: string,
    rank: 'best' | 'good' | 'bad',
  }
  const coupon = {
    code: '10PERCENT',
    rank: 'bad',
  }

  // 계산.
  function selectCouponsByRank(coupons, rank) {
    const ret = [];
    for (let c = 0; c < coupons.length; c++) {
      let coupon = coupons[c];
      if (coupon.rank === rank) {
        ret.push(coupon);
      }
      return ret;
    }
  }

  type Message = {
    from: string,
    to: string,
    subject: string,
    body: string,
  }
  const message = {
    from: 'newsletter@coupondog.co',
    to: 'sample@email.com',
    subject: 'Your weekly coupons inside',
    body: 'Here are your coupons for this week...',
  }

  // 계산. 구독자가 받을 이메일을 계획하는 함수
  function emailForSubscriber(subscriber, goods, bests) {
    const rank = subCouponRank(subscriber);
    if (rank === 'best')
      return {
        from: 'newsletter@coupondog.co',
        to: subscriber.email,
        subject: 'Your weekly coupons inside',
        body: 'Here are the best coupons: ' + bests.join(', '),
      };
    else
      return {
        from: 'newsletter@coupondog.co',
        to: subscriber.email,
        subject: 'Your weekly coupons inside',
        body: 'Here are the good coupons: ' + goods.join(', '),
      };
  }

  // 계산, 단순히 위쪽 계산 함수를 반복 호출하는 함수
  function emailForSubscribers(subscribers, goods, bests) {
    const emails = [];
    for (let s = 0; s < subscribers.length; s++) {
      const subscriber = subscribers[s];
      emails.push(emailForSubscriber(subscriber, goods, bests));
    }
    return emails;
  }

  // 액션. 실행 시점과 횟수에 의존하는 emailSystem.send 함수를 내부적으로 호출하고있음.
  function sendIssue() {
    const coupons = fetchCouponsFromDB();
    const goodCoupons = selectCouponsByRank(coupons, 'good');
    const bestCoupons = selectCouponsByRank(coupons, 'best');
    const subscribers = fetchSubscribersFromDB();
    const emails = emailForSubscribers(subscribers, goodCoupons, bestCoupons);
    for (let e = 0; e < emails.length; e++) {
      const email = emails[e];
      emailSystem.send(email);
    }
  }
  ```

## CHAPTER 4 액션에서 계산 빼내기(p61)

## CHAPTER 5 더 좋은 액션 만들기(p87)

## CHAPTER 6 변경 가능한 데이터 구조를 가진 언어에서 불변성 유지하기(p109)

## CHAPTER 7 신뢰할 수 없는 코드를 쓰면서 불변성 지키기(p147)

## CHAPTER 8 계층형 설계 I(p167)

## CHAPTER 9 계층형 설계 II(p201)

## CHAPTER 10 일급 함수 I(p233)

## CHAPTER 11 일급 함수 II(p267)

## CHAPTER 12 함수형 반복(p289)

## CHAPTER 13 함수형 도구 체이닝(p317)

## CHAPTER 14 중첩된 데이터에 함수형 도구 사용하기(p355)

## CHAPTER 15 타임라인 격리하기(p391)

## CHAPTER 16 타임라인 사이에 자원 공유하기(p441)

## CHAPTER 17 타임라인 조율하기(p471)

## CHAPTER 18 반응형 아키텍처와 어니언 아키텍처(p509)

## CHAPTER 19 함수형 프로그래밍 여행에 앞서(p541)
