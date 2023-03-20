const delay = (ms) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve('hi');
    }, ms)
  );
};

const main = () => {
  console.log(`main start`);
  const result = delay(1000);
  result
    .then(console.log)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log(`main end`);
    });
  console.log('hihi');
};

const main2 = async () => {
  console.log(`main start`);

  const result = await delay(1000);
  console.log(result);
  console.log(`main end`);
};

main();
// main2();
