// Promise 방식
function withPromise() {
  return Promise.resolve(1)
    .then(function addOne(x) { 
      console.log('addOne called');
      return x + 1; 
    })
    .then(function multiplyTwo(x) { 
      console.log('multiplyTwo called');
      return x * 2; 
    });
}


// 실행
withPromise().then(function logResult(x) { 
  console.log('final result:', x); 
});
// node --print-bytecode bytecode-compare-promise.js > withPromise.txt
