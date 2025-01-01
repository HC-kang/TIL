# JavaScript 비동기 처리의 진화: 콜백 지옥에서 async/await까지

JavaScript로 개발을 시작하면서 가장 흥미로웠던 부분 중 하나는 비동기 처리 방식의 발전 과정이었습니다. async/await를 사용하면서 "왜 이런 문법이 필요했을까?"라는 의문이 들었고, 이를 이해하기 위해 JavaScript의 비동기 처리 방식의 역사를 찾아보게 되었습니다.

## 콜백 함수 시대 - 비동기의 시작

JavaScript의 비동기 처리는 콜백 함수로부터 시작되었습니다. Node.js의 초기 문서들을 보면 다음과 같은 패턴을 흔히 발견할 수 있었죠.

```javascript
// 사용자 정보를 조회하고, 해당 사용자의 주문 내역을 가져오는 API
app.get('/api/users/:userId/orders', function(req, res) {
    const userId = req.params.userId;
    
    // 먼저 사용자 존재 여부 확인
    db.query('SELECT * FROM users WHERE id = ?', [userId], function(err, user) {
        if (err) {
            console.error('사용자 조회 실패:', err);
            return res.status(500).json({ error: '서버 에러' });
        }
        
        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
        }
        
        // 사용자의 주문 내역 조회
        db.query('SELECT * FROM orders WHERE user_id = ?', [userId], function(err, orders) {
            if (err) {
                console.error('주문 내역 조회 실패:', err);
                return res.status(500).json({ error: '서버 에러' });
            }
            
            // 각 주문의 상세 상품 정보 조회
            let completed = 0;
            const orderDetails = [];
            
            orders.forEach(function(order) {
                db.query(
                    'SELECT * FROM order_items WHERE order_id = ?',
                    [order.id],
                    function(err, items) {
                        if (err) {
                            console.error('주문 상세 조회 실패:', err);
                            return res.status(500).json({ error: '서버 에러' });
                        }
                        
                        orderDetails.push({
                            ...order,
                            items: items
                        });
                        
                        completed++;
                        // 모든 주문의 상세 정보 조회가 완료되면 응답
                        if (completed === orders.length) {
                            res.json({
                                user: user,
                                orders: orderDetails
                            });
                        }
                    }
                );
            });
        });
    });
});
```

이런 코드를 작성하면서 든 생각이 "이게 맞나?" 였습니다. 뭔가 이상했죠.

### 콜백의 문제점

위 코드를 보면 가장 먼저 눈에 띄는 것이 오른쪽으로 계속 들어가는 들여쓰기입니다. 비동기 작업이 순차적으로 필요할 때마다 코드의 깊이가 깊어져서 가독성이 떨어지죠. 이런 현상 때문에 흔히 '콜백 지옥'이라고 부릅니다.

하지만 콜백의 진짜 문제는 코드의 모양이 아닙니다. 더 심각한 문제들이 있죠.

1. **에러 처리의 분산과 불완전성**  
   콜백 패턴의 가장 큰 문제는 에러 처리가 통합될 수 없다는 점입니다. 동기 코드에서는 try-catch로 한 번에 여러 단계의 에러를 처리할 수 있지만, 콜백에서는 각 단계마다 에러 처리를 개별적으로 해야 합니다. 이는 단순히 코드의 중복이 아니라, 에러 처리 로직의 일관성을 해치고 누락될 가능성을 높입니다.

   ```javascript
   // 동기 코드의 에러 처리
   try {
       const data = readFileSync('config.json');
       const config = JSON.parse(data);
       const result = processConfig(config);
   } catch (err) {
       // 모든 에러가 여기서 처리됨
       handleError(err);
   }

   // 콜백의 에러 처리
   readFile('config.json', (err, data) => {
       if (err) {
           return handleError(err); // 파일 읽기 에러
       }
       try {
           const config = JSON.parse(data);
       } catch (err) {
           return handleError(err); // 파싱 에러
       }
       processConfig(config, (err, result) => {
           if (err) {
               return handleError(err); // 처리 에러
           }
       });
   });
   ```

2. **제어 흐름의 비선형성**  
   콜백은 비동기 작업의 결과를 또 다른 함수에 위임하는 방식입니다. 이는 프로그램의 제어 흐름이 직관적이지 않고 예측하기 어렵게 만듭니다. 특히 조건문이나 반복문과 함께 사용할 때 이 문제가 더욱 심각해집니다.

   ```javascript
   // 콜백으로 조건부 비동기 처리를 구현하면...
   getData(function(a) {
       if (a.needsMoreData) {
           getMoreData(function(b) {
               if (b.needsEvenMoreData) {
                   getEvenMoreData(function(c) {
                       // 실제 처리 로직
                   });
               }
           });
       }
   });
   ```

3. **비동기 작업의 합성 불가능**  
   콜백은 비동기 작업의 결과를 값으로 다룰 수 없어서, 여러 비동기 작업을 조합하거나 재사용하기가 매우 어렵습니다. 동기 코드에서는 함수의 반환값을 변수에 저장하고 다른 함수의 입력으로 사용할 수 있지만, 콜백에서는 이런 자연스러운 합성이 불가능합니다.

   ```javascript
   // 동기 코드에서의 함수 합성
   const result1 = fn1(data);
   const result2 = fn2(result1);
   const result3 = fn3(result2);

   // 콜백에서는 이런 합성이 불가능하고 중첩될 수밖에 없음
   fn1(data, (err, result1) => {
       fn2(result1, (err, result2) => {
           fn3(result2, (err, result3) => {
               // 실제 처리 로직
           });
       });
   });
   ```

이러한 본질적인 한계들로 인해 콜백만으로는 복잡한 비동기 로직을 안전하고 유지보수 가능한 방식으로 작성하기가 매우 어려웠습니다.

## Promise의 등장 - 비동기의 혁신

이런 문제를 해결하기 위해 Promise가 등장했습니다. Promise는 비동기 작업의 결과를 약속하는 객체입니다. "지금은 결과가 없지만, 나중에 반드시 결과를 줄게"라는 약속이죠.

```javascript
fs.promises.readFile('config.json')
    .then(data => JSON.parse(data))
    .then(config => db.connect(config.dbUrl))
    .then(client => client.query('SELECT * FROM users'))
    .then(result => {
        console.log('결과:', result);
    })
    .catch(err => {
        console.error('에러 발생:', err);
    });
```

갑자기 코드가 깔끔해졌죠? Promise의 가장 큰 장점은 바로 이런 체이닝이 가능하다는 점입니다.

### Promise의 특별한 점

1. **에러 처리의 통합**  
   모든 에러는 catch 블록으로 모입니다. 마치 동기 코드의 try-catch처럼 작동하죠. 더 이상 매 콜백마다 err를 체크할 필요가 없습니다.

2. **메서드 체이닝**  
   then을 이용해 비동기 작업을 순차적으로 이어갈 수 있습니다. 들여쓰기 깊이가 일정하게 유지되죠.

3. **병렬 처리의 용이성**  
   Promise.all을 사용하면 여러 비동기 작업을 동시에 처리할 수 있습니다.
   ```javascript
   Promise.all([
       fetch('https://api.example.com/users'),
       fetch('https://api.example.com/products'),
       fetch('https://api.example.com/orders')
   ]).then(([users, products, orders]) => {
       // 모든 데이터가 준비되면 실행
   });
   ```

## async/await - 동기 코드처럼 작성하기

Promise는 콜백에 비해 큰 발전이었지만, 여전히 아쉬운 점이 있었습니다. 특히 then 체인이 길어지면 코드가 복잡해지고, 조건문이나 반복문을 사용할 때는 여전히 불편했죠.

이런 문제를 해결하기 위해 등장한 것이 async/await입니다.

```javascript
async function getUsers() {
    try {
        const data = await fs.promises.readFile('config.json');
        const config = JSON.parse(data);
        const client = await db.connect(config.dbUrl);
        const result = await client.query('SELECT * FROM users');
        console.log('결과:', result);
    } catch (err) {
        console.error('에러 발생:', err);
    }
}
```

이제 비동기 코드가 마치 동기 코드처럼 보입니다! 실행 흐름도 위에서 아래로 명확하게 파악할 수 있죠.

### async/await의 장점

1. **가독성**  
   코드가 마치 동기 코드처럼 읽힙니다. 실행 순서를 직관적으로 이해할 수 있죠.

2. **더 나은 에러 처리**  
   try-catch를 직접 사용할 수 있어 에러 처리가 더욱 직관적입니다.

3. **디버깅 용이성**  
   async/await는 디버깅 경험을 획기적으로 개선했습니다. 같은 로직을 콜백, Promise, async/await로 각각 구현했을 때의 디버깅 경험을 비교해보겠습니다:

   ```javascript
   // 콜백 방식
   function getUserData(userId, callback) {
       getUser(userId, (err, user) => {
           if (err) {
               callback(err);
               return;
           }
           getFriends(user, (err, friends) => {
               if (err) {
                   callback(err);
                   return;
               }
               getPosts(friends, callback);
           });
       });
   }
   
   // Promise 방식
   function getUserData(userId) {
       return getUser(userId)
           .then(user => getFriends(user))
           .then(friends => getPosts(friends));
   }
   
   // async/await 방식
   async function getUserData(userId) {
       const user = await getUser(userId);
       const friends = await getFriends(user);
       return await getPosts(friends);
   }
   ```

   콜백 방식에서는 중첩된 콜백 내부에 breakpoint를 설정하면, 실행 컨텍스트가 여러 겹 중첩되어 있어 현재 상태를 파악하기가 어렵습니다. 콜 스택을 보면 익명 함수들이 겹겹이 쌓여있어 어느 단계에서 문제가 발생했는지 파악하기도 힘들죠.

   Promise 방식은 이보다는 낫지만, .then() 체인 중간에 breakpoint를 설정하면 해당 시점의 변수 상태를 조회하기가 까다롭습니다. 특히 Promise 체인 중간에 분기가 있는 경우, 디버거로 단계별 실행을 하면서 조건에 따른 흐름을 추적하기가 어렵습니다.

   반면 async/await는 마치 동기 코드를 디버깅하는 것처럼 자연스럽게 breakpoint를 설정하고 단계별 실행을 할 수 있습니다. 예를 들어:
   ```javascript
   async function getUserData(userId) {
       // 각 단계별로 breakpoint를 설정하고
       const user = await getUser(userId);
       // user 객체의 상태를 확인한 후
       const friends = await getFriends(user);
       // friends 배열의 내용을 검사하고
       const posts = await getPosts(friends);
       // 최종 결과를 확인할 수 있습니다
       return posts;
   }
   ```

   각 await 문 사이에서 현재 스코프의 모든 변수 상태를 명확하게 확인할 수 있고, Step Over(F10)를 사용하면 비동기 작업이 완료될 때까지 자동으로 대기했다가 다음 라인으로 진행됩니다. 이는 동기 코드를 디버깅할 때와 동일한 경험을 제공합니다.

4. **조건문과 반복문 활용**  
   ```javascript
   async function processUsers() {
       const users = await getUsers();
       
       for (const user of users) {
           if (user.isActive) {
               await sendEmail(user);
           }
       }
   }
   ```

## Promise와 async/await의 내부 동작 차이

겉으로 보기에는 단순히 문법적 차이로 보일 수 있지만, Promise와 async/await는 바이트 코드 레벨에서 완전히 다른 방식으로 동작합니다. 같은 작업을 수행하는 두 코드를 비교해보겠습니다:

```javascript
// Promise 체이닝 방식
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => fetch(`/api/orders/${user.id}`))
        .then(response => response.json());
}

// async/await 방식
async function fetchUserData(userId) {
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();
    const orderResponse = await fetch(`/api/orders/${user.id}`);
    return await orderResponse.json();
}
```

### Promise와 then의 내부 동작

Promise를 사용한 첫 번째 방식은 결국 콜백의 다른 형태입니다. then 메서드는 내부적으로 콜백을 등록하는 방식으로 동작하며, 이벤트 루프의 태스크 큐를 통해 처리됩니다. 바이트 코드 레벨에서 보면 이는 여전히 콜백 패턴으로 변환됩니다.

### async/await의 내부 동작

반면 async/await는 완전히 다른 접근 방식을 사용합니다. 자바스크립트 엔진은 async 함수를 상태 기계(state machine)로 변환하고, 각 await 지점에서 실제로 함수의 실행을 중단(suspend)했다가 재개(resume)합니다.

이는 마치 제너레이터(generator)와 비슷한 방식으로, 함수의 실행 컨텍스트가 보존되면서 중간에 중단되었다가 다시 시작될 수 있습니다. 각 await 키워드를 만날 때마다 현재의 상태가 저장되고, Promise가 완료되면 저장된 상태부터 실행이 재개됩니다.

이러한 차이는 몇 가지 중요한 의미를 가집니다:

1. **실행 컨텍스트 관리**
   - Promise chain: 각 then 블록마다 새로운 콜백 컨텍스트가 생성됨
   - async/await: 하나의 실행 컨텍스트 내에서 상태만 변경됨

2. **에러 스택 추적**
   - Promise chain: 각 then이 별도의 콜백으로 처리되어 스택 트레이스가 then 체인을 명확하게 보여주지 못함
   - async/await: 하나의 실행 컨텍스트 안에서 처리되어 에러 발생 위치와 호출 스택을 더 정확하게 추적 가능

   ```javascript
   // Promise 체인으로 구현한 경우
   function fetchData() {
       return Promise.resolve()
           .then(() => {
               // 여기서 에러 발생
               throw new Error('Something went wrong');
           })
           .then(() => {
               console.log('This will not run');
           });
   }

   // async/await로 구현한 경우
   async function fetchDataAsync() {
       await Promise.resolve();
       // 여기서 에러 발생
       throw new Error('Something went wrong');
       console.log('This will not run');
   }

   // 각각의 스택 트레이스
   // Promise 체인의 경우:
   Error: Something went wrong
       at <anonymous>:2:11  // then 콜백 내부
       at Promise.then.then // Promise 내부 구현

   // async/await의 경우:
   Error: Something went wrong
       at fetchDataAsync (<anonymous>:3:11)
       at async function (<anonymous>:1:1)
   ```

3. **디버깅 경험**
   - Promise chain: 콜백 사이의 중간 상태를 확인하기 어려움
   - async/await: 각 await 지점에서 정확한 상태 확인 가능

이러한 내부 동작의 차이를 이해하면, 단순히 "보기 좋은 코드"를 넘어서 왜 async/await가 더 나은 선택이 될 수 있는지를 이해할 수 있습니다.

## 각 방식의 활용

하지만 async/await가 항상 최선은 아닙니다. 각 방식에는 각자의 장단점이 있죠.

- **콜백**: 간단한 이벤트 핸들링에 여전히 유용합니다.
    ```javascript
    button.addEventListener('click', () => {
        console.log('클릭!');
    });
    ```

- **Promise**: 여러 비동기 작업을 병렬로 처리할 때 유용합니다.
    ```javascript
    const results = await Promise.all([
        fetch('/api/users'),
        fetch('/api/products')
    ]);
    ```

- **async/await**: 복잡한 비동기 로직을 처리할 때 가장 적합합니다.
    ```javascript
    async function processOrder() {
        const user = await getUser();
        const cart = await getCart(user.id);
        const order = await createOrder(cart);
        await sendConfirmation(order);
    }
    ```

## 마치며

JavaScript의 비동기 처리 방식은 콜백에서 시작해서 Promise를 거쳐 async/await까지 발전해왔습니다. 각 단계마다 이전 방식의 문제점을 해결하면서 더 나은 개발 경험을 제공하게 되었죠.

지금도 세 가지 방식을 모두 사용하고 있지만, 특히 async/await는 비동기 코드를 동기 코드처럼 작성할 수 있게 해주어 개발자의 생산성을 크게 향상시켰습니다. 앞으로도 JavaScript의 비동기 처리 방식은 계속 발전해 나갈 것이고, 우리는 그 변화에 주목하고 적절히 활용할 필요가 있습니다.