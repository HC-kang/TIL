const { v4: uuidv4 } = require('uuid');
const { performance } = require('perf_hooks');

// --expose-gc 플래그와 함께 Node.js를 실행해야 합니다.
// 예: node --expose-gc script.js
if (global.gc) {
    global.gc();
} else {
    console.warn('No GC hook! Start your program with `node --expose-gc`.');
}

const arr = Array.from({ length: 1_000_000 }, () => uuidv4());

const tests = [
    {
        label: 'For loop',
        func: () => {
            let cnt = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].startsWith('ab')) {
                    cnt++;
                }
            }
            return cnt;
        }
    },
    {
        label: 'While loop',
        func: () => {
            let cnt = 0;
            let i = 0;
            while (i < arr.length) {
                if (arr[i].startsWith('ab')) {
                    cnt++;
                }
                i++;
            }
            return cnt;
        }
    },
    {
        label: 'For of loop',
        func: () => {
            let cnt = 0;
            for (const item of arr) {
                if (item.startsWith('ab')) {
                    cnt++;
                }
            }
            return cnt;
        }
    },
    {
        label: 'For in loop',
        func: () => {
            let cnt = 0;
            for (const i in arr) {
                if (arr[i].startsWith('ab')) {
                    cnt++;
                }
            }
            return cnt;
        }
    },
    {
        label: 'ForEach loop',
        func: () => {
            let cnt = 0;
            arr.forEach((item) => {
                if (item.startsWith('ab')) {
                    cnt++;
                }
            });
            return cnt;
        }
    },
    {
        label: 'Reduce loop',
        func: () => {
            return arr.reduce((acc, item) => {
                if (item.startsWith('ab')) {
                    acc++;
                }
                return acc;
            }, 0);
        }
    },
    {
        label: 'Map loop',
        func: () => {
            return arr.map((item) => {
                if (item.startsWith('ab')) {
                    return 1;
                }
                return 0;
            }).reduce((acc, item) => acc + item, 0);
        }
    },
    {
        label: 'Filter loop',
        func: () => {
            return arr.filter((item) => item.startsWith('ab')).length;
        }
    }
];

function measurePerformance(loopFunction, label) {
    if (global.gc) {
        global.gc();
    }

    // 워밍업
    loopFunction();
    loopFunction();
    loopFunction();

    if (global.gc) {
        global.gc();
    }

    // 두 번째 실행 (실제 측정)
    const startMem = process.memoryUsage().heapUsed;
    const start = performance.now();
    const count = loopFunction();
    const end = performance.now();
    const endMem = process.memoryUsage().heapUsed;

    console.log(`Count: ${count}`);
    console.log(`${label} Time: ${(end - start).toFixed(3)}ms`);
    console.log(`${label} Memory: ${((endMem - startMem) / 1024 / 1024).toFixed(3)} MB`);
}

// 테스트 순서를 무작위로 섞음
tests.sort(() => Math.random() - 0.5);

// 무작위 순서로 테스트 실행
tests.forEach(test => measurePerformance(test.func, test.label));
