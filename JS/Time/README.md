# JavaScript 시간 처리의 구세주: Temporal, Date의 비교

`JS`를 주 언어로 쓰시는 분들은 항상 느끼셨을텐데요, `JS`에서 시간을 다루는 작업은 정말 머리가 아프죠.

```js
// 현재 시간에서 9시간 빼기
const now = new Date()
const before9Hours = new Date(now.setHours(now.getHours() - 9))
```

이런 간단한 작업에도 벌써 `get`, `set` 메서드를 모두 써야 하는데, 지나치게 장황하고 번거롭기 그지없습니다.

그중에서도 예약 시스템이나 스케줄러/배치 작업을 할 때 시간 처리는 특히나 피할 수 없는 과제~~(고통)~~인데요.  
이런 작업을 하면서 정말 `JS`의 내장 `Date` ~~(구데기)~~객체는 정말 많은 사람들의 이를 갈게 만들었죠.

분명 수학적으로 막 어려운 문제는 아닌데, 시간대와 워킹타임 등이 같이 들어가면 정말 묘하게 너무 헷갈립니다.  
이런 문제를 해결하기 위해 새로(어언 4년 전..?) 도입된 `Temporal`이라는 API가 이제 정말 코앞으로 다가오고 있어서, 이를 소개해드리려고 합니다.

조만간 실제로 브라우저에서도 사용할 수 있게 될 예정이니, 곧 `Node.js`에서도 사용할 수 있게 될 것으로 기대해볼만 합니다.

우선 이 글에서는 폴리필(`@js-temporal/polyfill`)을 사용해서 예제를 작성해보겠습니다.

## 들어가기 전에

본격적인 `Temporal` 소개 전에, 먼저 `JS`의 `Date` 객체가 어떻게 동작하는지 알아보고, 무엇이 문제점인지 살펴보겠습니다.

`Date` 객체는 초기 `JS` 개발 중 `Java`의 `Date` 객체를 모방해서 만들어졌는데요, 재미있게도 `Java`는 1997년에 이 구현의 대부분을 `deprecated` 시키고 새로운 패키지를 만들었지만 `JS`는 아직까지도 30년 전 객체를 사용하고 있습니다.

### Date 객체가 어떻길래?

`Date`는 정말 많은 문제를 가지고 있는데요, 대표적인 문제들을 코드로 살펴보겠습니다.

```js
// 1. 월만 0부터 시작합니다
const newYear = new Date('2025-01-01') // 2025년 1월 1일
const date = newYear.getDate()         // 1 (1일이므로 1이 반환됨)
const month = newYear.getMonth()       // 0 (1월인데 0이 반환됨)

// 2. 변경 가능한(mutable) 객체입니다
const today = new Date('2025-01-01')
const tomorrow = today
tomorrow.setDate(today.getDate() + 1)  // today도 같이 변경됨

// 3. 시간대 처리가 매우 제한적이고, 문자열만 반환합니다
const now = new Date('2025-01-01')      // 2025-01-01T00:00:00.000Z
// 한국 시간으로 표시하고 싶다면?
now.toLocaleString(                     // 2025-01-01 오전 09:00:00
    'ko-KR', { timeZone: 'Asia/Seoul' } // 문자열만 반환
)

// 4. 날짜 파싱이 일관되지 않습니다
new Date('01/02/2025') // en-US (미국): 2025년 1월 2일
new Date('01/02/2025') // en-GB (영국): 2025년 2월 1일

// 5. 월 단위 계산이 복잡합니다
const date = new Date('2025-01-31');
// 1월 31일(말일)의 한달 뒤는 2월 28일일까요?
const nextMonth = date.setMonth(date.getMonth() + 1);
console.log(nextMonth); // 1740960000000. 애초에 이것부터 뭔가 잘못된 것 같다..
console.log(            // 2025. 3. 3. 오전 9:00:00
    new Date(nextMonth).toLocaleString()
);
```

### 기존에 사용하던 해결법: moment.js, dayjs, date-fns

이런 문제들 때문에 대부분의 개발자들은 외부 라이브러리를 사용해왔습니다.

```js
// moment.js - 강력하지만 무거움. 개발 중단(Deprecated)됨
import moment from 'moment'
import 'moment-timezone'

moment.tz('2025-01-01', 'Asia/Seoul')
  .add(1, 'day')
  .format('YYYY-MM-DD')

// dayjs - 가볍지만 이런저런 플러그인이 필요함. 여전히 뮤터블함
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// date-fns - 함수를 개별적으로 사용 가능하고 불변성 보장. 사용법이 다소 복잡함
import { addDays, format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
```

## Temporal 이란?

`Temporal`은 현대적인 시간 처리를 위해 새롭게 설계된 `JS` 내장 API입니다.  
기존 `Date`의 문제점을 모두 해결하면서도, 더 직관적이고 안전한 방식으로 시간을 다룰 수 있게 해줍니다.  
아직 정식 표준은 아니지만, 이미 폴리필도 존재하고, 브라우저에 반영된다면 더 이상 외부 라이브러리를 사용하지 않아도 될 것 같습니다.

### 주요 기능

1. **월의 시작이 0이 아니라 1부터 시작**
```js
const newYear = Temporal.PlainDate.from('2025-01-01');
console.log(newYear.month); // 1
console.log(newYear.day);   // 1
```

2. **불변(immutable) 객체**
```js
const now = Temporal.PlainDate.from('2025-01-01');
const tomorrow = now.add({ days: 1 });  // now는 변경되지 않음
```

3. **명확한 시간대 지원 및 객체 반환**
```js
// 서울 시간
const seoulTime = Temporal.Now.zonedDateTimeISO('Asia/Seoul')
// 뉴욕 시간으로 변환
const nyTime = seoulTime.withTimeZone('America/New_York')
console.log(nyTime.toLocaleString()) // 여전히 객체를 반환하며 체이닝으로 후속 작업 가능
```

4. **일관된 날짜 파싱**
```js
// ISO 8601 형식만을 허용
const date = Temporal.PlainDate.from('2025-01-01')
// 필요시 객체형태로 명시적으로 기입
const date = Temporal.PlainDate.from({
    year: 2025,
    month: 1,
    day: 1
})
```

5. **직관적인 날짜 계산**
```js
const date = Temporal.PlainDate.from('2025-01-31');
const nextMonth = date.add({ months: 1 });
console.log(nextMonth.toString()); // 2025-02-28

// 기간 계산도 직관적(1.31 ~ 2.28까지는 28일이다)
const duration = date.until(nextMonth)
console.log(duration.days)  // 28
```

### 실전 사용 예시

실제로 자주 마주치는 상황들에서 `Temporal`을 어떻게 활용할 수 있을지도 간단하게 살펴보겠습니다.

**1. 배치 작업 스케줄링**
```js
function getNextBatchTime(current) {
  // 매일 새벽 4시에 실행
  return current.withTimeZone('Asia/Seoul')
    .with({
      hour: 4,
      minute: 0,
      second: 0,
      millisecond: 0
    })
    // 새벽 4시 이후라면 다음날 4시로 설정
    .add({ days: current.hour >= 4 ? 1 : 0 })
}

const now = Temporal.Now.zonedDateTimeISO()
const nextBatch = getNextBatchTime(now)
```

**2. 예약 시스템**
```js
function createTimeSlots(date, timezone) {
  const slots = []
  let current = Temporal.ZonedDateTime
    .from(`${date}T09:00:00[${timezone}]`)  // 오전 9시부터
  
  // 30분 단위로 17시까지
  while (current.hour < 17) {
    slots.push(current)
    current = current.add({ minutes: 30 })
  }
  
  return slots
}
// 결과
// 2025-01-31T09:00:00+09:00[Asia/Seoul]
// 2025-01-31T09:30:00+09:00[Asia/Seoul]
// ...
// 2025-01-31T16:30:00+09:00[Asia/Seoul]
```

**3. 결제 환불 기간 계산**
```js
function isRefundable(purchaseDate) {
  const purchase = Temporal.Instant.from(purchaseDate)
  const now = Temporal.Now.instant()
  
  const duration = purchase.until(now)
  return duration.total('hours') <= 24  // 24시간 이내
}

// 24시간 이내라면 true
console.log(isRefundable('2025-01-31T09:00:00+09:00[Asia/Seoul]'))
// 24시간 초과라면 false
console.log(isRefundable('2025-01-30T08:00:00+09:00[Asia/Seoul]'))
```

## Date vs Temporal

### 주요 차이점

| 특징 | Date | Temporal |
|------|------|----------|
| 가변성 | Mutable | **Immutable** |
| 시간대 | 제한적 | 완벽 지원 |
| 계산 | 복잡함 | 직관적 |
| 타입 | 단일 타입 | 상황별 타입 제공 |

## 마무리

`Temporal`은 아직 실험적인 기능이지만, 이미 폴리필(`@js-temporal/polyfill`)이 존재하고 Firefox Nightly에서는 벌써 실험적으로 사용해볼 수 있다고 합니다. 

특히 아래와 같은 상황에서는 도입을 적극적으로 검토해볼만 하지 않을까 싶습니다.

- 정확한 시간 계산이 필요한 결제/예약 시스템
- 여러 시간대를 다루는 글로벌 서비스
- 복잡한 배치 작업이나 스케줄링이 필요한 시스템

일단 브라우저에 들어간다면 추후 API도 확정될 것이니, 이제는 `Date`의 한계에서 벗어나 `Temporal`과 함께 더 안전하고 직관적인 시간 처리를 할 수 있기를 기대해보겠습니다.

## 참고

- [JavaScript Temporal is coming](https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/)
- [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)
