const Benchmark = require('benchmark');

const suite = new Benchmark.Suite;

function createArray() {
  return Array.from({ length: 10_000_000 }, (_, i) => i);
}

function forLoop(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 3 === 0) {
      sum += arr[i];
    }
  }
  return sum;
}

function whileLoop(arr) {
  let sum = 0;
  let i = 0;
  while (i < arr.length) {
    if (arr[i] % 3 === 0) {
      sum += arr[i];
    }
    i++;
  }
  return sum;
}

function forOfLoop(arr) {
  let sum = 0;
  for (const item of arr) {
    if (item % 3 === 0) {
      sum += item;
    }
  }
  return sum;
}

function forInLoop(arr) {
  let sum = 0;
  for (const i in arr) {
    if (arr[i] % 3 === 0) {
      sum += arr[i];
    }
  }
  return sum;
}

function forEachLoop(arr) {
  let sum = 0;
  arr.forEach((item) => {
    if (item % 3 === 0) {
      sum += item;
    }
  });
  return sum;
}

function reduceLoop(arr) {
  return arr.reduce((acc, item) => {
    if (item % 3 === 0) {
      return acc + item;
    }
    return acc;
  }, 0);
}

function mapLoop(arr) {
  return arr.map((item) => {
    if (item % 3 === 0) {
      return item;
    }
    return 0;
  }).reduce((acc, item) => acc + item, 0);
}

function filterLoop(arr) {
  return arr.filter((item) => item % 3 === 0).reduce((acc, item) => acc + item, 0);
}

function measurePerformance(fn, iterations = 5) {
  const arr = createArray();
  let totalTime = 0;
  let totalMemory = 0;

  for (let i = 0; i < iterations; i++) {
    if (global.gc) {
      global.gc();
    }
    const startMemory = process.memoryUsage().heapUsed;
    const startTime = process.hrtime.bigint();
    
    fn(arr);
    
    const endTime = process.hrtime.bigint();
    if (global.gc) {
      global.gc();
    }
    const endMemory = process.memoryUsage().heapUsed;
    
    totalTime += Number(endTime - startTime);
    totalMemory += Math.max(0, endMemory - startMemory);
  }

  return {
    time: (totalTime / iterations / 1_000_000).toFixed(3), // 평균 시간 (ms)
    memory: (totalMemory / iterations / 1024 / 1024).toFixed(3) // 평균 메모리 (MB)
  };
}

suite
  .add('For loop', {
    fn: () => {
      const arr = createArray();
      forLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(forLoop);
      console.log(`For loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .add('While loop', {
    fn: () => {
      const arr = createArray();
      whileLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(whileLoop);
      console.log(`While loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .add('For of loop', {
    fn: () => {
      const arr = createArray();
      forOfLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(forOfLoop);
      console.log(`For of loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .add('For in loop', {
    fn: () => {
      const arr = createArray();
      forInLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(forInLoop);
      console.log(`For in loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .add('ForEach loop', {
    fn: () => {
      const arr = createArray();
      forEachLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(forEachLoop);
      console.log(`ForEach loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .add('Reduce loop', {
    fn: () => {
      const arr = createArray();
      reduceLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(reduceLoop);
      console.log(`Reduce loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .add('Map loop', {
    fn: () => {
      const arr = createArray();
      mapLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(mapLoop);
      console.log(`Map loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .add('Filter loop', {
    fn: () => {
      const arr = createArray();
      filterLoop(arr);
    },
    onComplete: () => {
      const result = measurePerformance(filterLoop);
      console.log(`Filter loop - Time: ${result.time} ms, Memory: ${result.memory} MB`);
    }
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });