const { performance } = require('perf_hooks');

function runGC() {
    if (global.gc) {
        global.gc();
    } else {
        console.warn('No GC hook! Start your program with `node --expose-gc index.js`.');
    }
}

function measureExecutionTime(fn, iterations = 1000000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = performance.now();
    return end - start;
}

function testFunction(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

// 테스트할 배열 생성
const testArray = new Array(1000).fill(0).map((_, index) => index);

// 초기 실행 시간 측정
runGC();
const initialTime = measureExecutionTime(() => testFunction(testArray));
console.log(`Initial execution time: ${initialTime.toFixed(2)} ms`);

// 최적화를 유도하기 위해 더 긴 반복 실행
for (let i = 0; i < 5000000; i++) {
    testFunction(testArray);
}

// 최적화된 후 여러 번 실행 시간 측정
const optimizedTimes = [];
for (let i = 0; i < 10; i++) {
    // runGC();  // 각 반복 사이에 GC를 실행
    const optimizedTime = measureExecutionTime(() => testFunction(testArray), 1000000); // 반복 횟수를 고정
    optimizedTimes.push(optimizedTime);
    console.log(`Optimized run ${i + 1}: ${optimizedTime.toFixed(2)} ms`);
}

// 평균 실행 시간 계산
const averageOptimizedTime = optimizedTimes.reduce((a, b) => a + b, 0) / optimizedTimes.length;
console.log(`Average optimized execution time: ${averageOptimizedTime.toFixed(2)} ms`);
