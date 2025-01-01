// 순수 콜백 버전
function withCallback(callback) {
  const addOne = (x, cb) => {
      console.log('addOne called');
      cb(x + 1);
  };

  const multiplyTwo = (x, cb) => {
      console.log('multiplyTwo called');
      cb(x * 2);
  };

  addOne(1, result1 => {
      multiplyTwo(result1, result2 => {
          callback(result2);
      });
  });
}

// 실행
withCallback(result => console.log('final result:', result));
// node --print-bytecode bytecode-compare-callback.js > withCallback.txt
