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

function measureExecutionTime(fn, arg, iterations) {
  console.time('Execution Time');
  for (let i = 0; i < iterations; i++) {
      fn(arg);
  }
  console.timeEnd('Execution Time');
}

// Test 1: 타입 변경에 의한 deoptimization
console.log('Test 1: 타입 변경에 의한 deoptimization');
measureExecutionTime(testFunction, 42, 1e6);
measureExecutionTime(testFunction, 'string', 1e6);  // 타입 변경으로 인해 deoptimization 발생 가능

// Test 2: 객체의 프로퍼티 변경에 의한 deoptimization
console.log('Test 2: 객체의 프로퍼티 변경에 의한 deoptimization');
let obj = { value: 42 };
measureExecutionTime(testFunctionWithObjects, obj, 1e6);
obj.newProp = 'new';  // 객체 모양 변경
measureExecutionTime(testFunctionWithObjects, obj, 1e6);  // 객체 모양 변경으로 인해 deoptimization 발생 가능

// Test 3: 다양한 타입의 인자 사용에 의한 deoptimization
console.log('Test 3: 다양한 타입의 인자 사용에 의한 deoptimization');
function add(a, b) {
  return a + b;
}
measureExecutionTime(add, 1, 2, 1e6);  // 숫자 타입 인자
measureExecutionTime(add, 'foo', 'bar', 1e6);  // 문자열 타입 인자, deoptimization 발생 가능

// Test 4: 잘못된 맵으로 인한 deoptimization
console.log('Test 4: 잘못된 맵으로 인한 deoptimization');
function accessProperty(o) {
  return o.a;  // o의 프로퍼티 'a'를 가정
}
let point = { x: 10, y: 20, a: 5 };
measureExecutionTime(accessProperty, point, 1e6);
delete point.y;  // 객체 맵 변경
measureExecutionTime(accessProperty, point, 1e6);  // 맵 변경으로 인해 deoptimization 발생 가능
