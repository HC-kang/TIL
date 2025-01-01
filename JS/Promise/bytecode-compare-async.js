// async/await 버전
async function withAsyncAwait() {
  const addOne = (x) => {
    console.log('addOne called');
    return x + 1;
  };

  const multiplyTwo = (x) => {
    console.log('multiplyTwo called');
    return x * 2;
  };

  let result = await addOne(1);
  result = await multiplyTwo(result);
  return result;
}

// 실행
withAsyncAwait().then(result => {
  console.log('final result:', result);
});
// node --print-bytecode bytecode-compare-async.js > withAsyncAwait.txt