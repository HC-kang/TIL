export const fsOptions = { encoding: 'utf-8' };

export function sequentiallyExecute(
  collection,
  iteratorCallback,
  finalCallback,
  successMessage = 'Operation successful'
) {
  function iterate(index) {
    if (index === collection.length) return finalCallback(null, successMessage);

    iteratorCallback(collection[index], (err) => {
      if (err) return finalCallback(err);
      iterate(index + 1);
    });
  }

  iterate(0);
}

export function finished(err, successMessage = 'Operation complete!') {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(successMessage);
}
