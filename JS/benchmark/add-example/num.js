function measureExecutionTime(fn, arg1, arg2, iterations) {
  console.time('Execution Time');
  for (let i = 0; i < iterations; i++) {
      fn(arg1, arg2);
  }
  console.timeEnd('Execution Time');
}

function add(a, b) {
  return a + b;
}

measureExecutionTime(add, 1, 2, 1e6);  // 숫자 타입 인자
measureExecutionTime(add, '1', 2, 1e6);  // 숫자 타입 인자
measureExecutionTime(add, 'foo', 'bar', 1e6);  // 문자열 타입 인자, deoptimization 발생 가능