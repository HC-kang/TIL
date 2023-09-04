export async function asyncMap(concurrency, iterable, callback) {
  const results = [];
  const queue = [...iterable.entries()];
  const worker = () => {
    new Promise(async (resolve) => {
      while (queue.length > 0) {
        const [index, item] = queue.shift();
        const result = await callback(item);
        results[index] = result;
      }
      resolve();
    });
  };
  const workers = Array.from({ length: concurrency }, worker);
  await Promise.all(workers);
  return results;
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
};

main();
