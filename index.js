function allSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let remaining = promises.length;

    if (remaining === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = { status: "fulfilled", value };
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        },
        (reason) => {
          results[index] = { status: "rejected", reason };
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        }
      );
    });
  });
}

const promise1 = Promise.resolve(1);
const promise2 = Promise.reject("Error");
const promise3 = new Promise((resolve) => setTimeout(resolve, 100, 3));

allSettled([promise1, promise2, promise3]).then((results) => {
  console.log(results);
});
