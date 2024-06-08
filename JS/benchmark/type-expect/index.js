function testFunction(x) {
  if (typeof x === 'number') {
      return x + 1;  // 최적화됨
  } else {
      return null;  // 다른 타입이 들어오면 deoptimization 발생 가능
  }
}

function testFunctionWithObjects(obj) {
  return obj.value;  // obj의 프로퍼티 'value'를 가정
}

function measureExecutionTime(fn, arg1, arg2, iterations) {
  console.time('Execution Time');
  for (let i = 0; i < iterations; i++) {
      if (arg2 !== undefined) {
          fn(arg1, arg2);
      } else {
          fn(arg1);
      }
  }
  console.timeEnd('Execution Time');
}

// string, number의 순서에 따라 실행 시간이 변함.
measureExecutionTime(testFunction, 'string', undefined, 1e6);  // 타입 변경으로 인해 deoptimization 발생 가능
measureExecutionTime(testFunction, 'string', undefined, 1e6);  // 타입 변경으로 인해 deoptimization 발생 가능
measureExecutionTime(testFunction, 42, undefined, 1e6);
measureExecutionTime(testFunction, 42, undefined, 1e6);