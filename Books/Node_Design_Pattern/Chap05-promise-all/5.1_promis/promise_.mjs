class Promise_ {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach((callbackObject) => {
          callbackObject.onFulfilled(value);
        });
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.callbacks.forEach((callbackObject) => {
          callbackObject.onRejected(reason);
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== 'function') {
      onRejected = (reason) => {
        throw reason;
      };
    }
    return new Promise_((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            console.log({ result });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const result = onRejected(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'pending') {
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              const result = onFulfilled(value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
          onRejected: (reason) => {
            try {
              const result = onRejected(reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
        });
      }
    });
  }

  static all(promises) {
    return new Promise_((resolve, reject) => {
      const results = [];
      let resolvedCount = 0;

      const handlePromise = (index, result) => {
        result[index] = result;
        resolvedCount++;

        if (resolvedCount === promises.length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        promise.then(
          (result) => handlePromise(index, result),
          (reason) => reject(reason)
        );
      });
    });
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved successfully!');
  }, 1000);
});

promise.then(
  (result) => console.log('Fulfilled: ', result),
  (reason) => console.log('Rejected: ', reason)
);

const promise1 = new Promise_((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise_((resolve) => setTimeout(() => resolve(2), 2000));
const promise3 = new Promise_((resolve) => setTimeout(() => resolve(3), 1500));

Promise_.all([promise1, promise2, promise3]).then(
  (results) => console.log('All promise resolved: ', results),
  (reason) => console.log('Rejected: ', reason)
);
