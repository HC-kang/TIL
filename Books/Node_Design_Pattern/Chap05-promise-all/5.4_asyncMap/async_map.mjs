async function* taskGenerator(iterable, callback) {
  for (const item of iterable) {
    yield callback(item);
  }
}

export async function asyncMap(concurrency, iterable, callback) {
  const results = [];
  let activeTasks = 0;
  const tasks = taskGenerator(iterable, callback);

  const executeTask = async (index) => {
    for await (const result of tasks) {
      results[index] = result;
      index += concurrency;
      activeTasks--;
    }
  };

  const runners = [];
  for (let i = 0; i < concurrency; i++) {
    if (activeTasks < iterable.length) {
      activeTasks++;
      runners.push(executeTask(i));
    }
  }

  await Promise.all(runners);
}

const testIterable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const testCallback = async (item) => {
  const delay = 300;
  // const delay = Math.floor(Math.random() * 1000);
  await new Promise((resolve) => setTimeout(resolve, delay));
  console.log(`Task ${item} completed in ${delay}ms`);
  return item * 2;
};

const main = async () => {
  const start = Date.now();
  const results = await asyncMap(3, testIterable, testCallback);
  const end = Date.now();
  console.log(`Time: ${end - start}ms`);
  console.log(results);
}

main();