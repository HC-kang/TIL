export async function asyncMap(concurrency, iterable, callback) {
  const results = [];
  const queue = [...iterable.entries()];
  const activePromises = new Set();

  const executeTask = async () => {
    while (queue.length > 0) {
      const [index, item] = queue.shift();
      console.log(`Processing item: ${item} at index: ${index}`);
      const promise = callback(item).then((result) => {
        console.log(`Finished processing item: ${item} at index: ${index}`);
        results[index] = result;
        activePromises.delete(promise);
      });
      console.log(`Adding the promise to the active promise array`, promise);
      activePromises.add(promise);

      if (activePromises.size >= concurrency) {
        await Promise.race(activePromises);
      }
    }
  };

  const runners = Array(concurrency).fill(executeTask());
  await Promise.all(runners);
  await Promise.all(activePromises);
  return results;
}

const testIterable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testCallback = async (item) => {
  // const delay = 300;
  const delay = Math.floor(Math.random() * 1000);
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
