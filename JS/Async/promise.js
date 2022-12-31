console.log("hi, this is promise.js");

// State: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
const promise = new Promise((resolve, reject) => {
  console.log("doing something...");
  setTimeout(() => {
    resolve("test");
    reject(new Error("no network"));
  }, 2000);
});

// 2. Consumer: then, catch, finally
promise
  .then((value) => {
    console.log(value);
    console.log("success");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("🐔"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
    // setTimeout(() => resolve(`${hen} => 🥚`), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

// getHen()
// .then(hen => getEgg(hen))
// .then(egg => cook(egg))
// .then(meal => console.log(meal));
getHen() //
  .then(getEgg)
  .catch((error) => {
    return "🍞";
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
