// 비동기 작업을 시뮬레이션하는 유틸리티 함수들
// 1. 콜백 방식으로 유틸리티 함수들 수정
const fetchUserCallback = (id, callback) => {
  setTimeout(() => {
    callback(null, { id, name: `User${id}`, isPremium: id % 2 === 0 });
  }, 1000);
};

const fetchOrdersCallback = (userId, callback) => {
  setTimeout(() => {
    callback(null, [
      { id: 1, userId, product: 'A' },
      { id: 2, userId, product: 'B' }
    ]);
  }, 1000);
};

const calculateDiscountCallback = (user, orders, callback) => {
  setTimeout(() => {
    const discount = user.isPremium ? 20 : 10;
    callback(null, orders.map(order => ({
      ...order,
      discount: `${discount}%`
    })));
  }, 1000);
};

const fetchUser = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: `User${id}`, isPremium: id % 2 === 0 });
    }, 1000);
  });
};

const fetchOrders = (userId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, userId, product: 'A' },
        { id: 2, userId, product: 'B' }
      ]);
    }, 1000);
  });
};

const calculateDiscount = (user, orders) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const discount = user.isPremium ? 20 : 10;
      resolve(orders.map(order => ({
        ...order,
        discount: `${discount}%`
      })));
    }, 1000);
  });
};

// 1. 콜백 방식
function processOrdersCallback(userId) {
  console.log('콜백 방식 시작');

  fetchUserCallback(userId, (err, user) => {
    if (err) {
      console.error('사용자 조회 실패:', err);
      return;
    }

    // 여기에 breakpoint 설정
    console.log('사용자 조회됨:', user);

    fetchOrdersCallback(user.id, (err, orders) => {
      if (err) {
        console.error('주문 조회 실패:', err);
        return;
      }

      // 여기에 breakpoint 설정
      console.log('주문 조회됨:', orders);

      if (user.isPremium) {
        calculateDiscountCallback(user, orders, (err, discountedOrders) => {
          if (err) {
            console.error('할인 계산 실패:', err);
            return;
          }

          // 여기에 breakpoint 설정
          console.log('할인 적용됨:', discountedOrders);
        });
      } else {
        console.log('일반 사용자의 주문:', orders);
      }
    });
  });
}

// 2. Promise 방식
function processOrdersPromise(userId) {
  console.log('Promise 방식 시작');

  return fetchUser(userId)
    .then(user => {
      // 여기에 breakpoint 설정
      console.log('사용자 조회됨:', user);

      return fetchOrders(user.id)
        .then(orders => ({ user, orders }));
    })
    .then(({ user, orders }) => {
      // 여기에 breakpoint 설정
      console.log('주문 조회됨:', orders);

      if (user.isPremium) {
        return calculateDiscount(user, orders);
      }
      return orders;
    })
    .then(finalOrders => {
      // 여기에 breakpoint 설정
      console.log('최종 주문:', finalOrders);
    })
    .catch(err => {
      console.error('처리 실패:', err);
    });
}

// 3. Async/Await 방식
async function processOrdersAsync(userId) {
  try {
    console.log('Async/Await 방식 시작');

    // 여기에 breakpoint 설정
    const user = await fetchUser(userId);
    console.log('사용자 조회됨:', user);

    // 여기에 breakpoint 설정
    const orders = await fetchOrders(user.id);
    console.log('주문 조회됨:', orders);

    // 여기에 breakpoint 설정
    let finalOrders = orders;
    if (user.isPremium) {
      finalOrders = await calculateDiscount(user, orders);
    }
    console.log('최종 주문:', finalOrders);

    return finalOrders;
  } catch (err) {
    console.error('처리 실패:', err);
  }
}

// 테스트
console.log('테스트 시작');

// 각 방식 테스트 (브레이크포인트를 설정하고 한 번에 하나씩 주석을 해제하여 테스트)
// processOrdersCallback(1);  // 일반 사용자
processOrdersCallback(2);  // 프리미엄 사용자

// processOrdersPromise(1);   // 일반 사용자
// processOrdersPromise(2);   // 프리미엄 사용자

// processOrdersAsync(1);     // 일반 사용자
// processOrdersAsync(2);     // 프리미엄 사용자
