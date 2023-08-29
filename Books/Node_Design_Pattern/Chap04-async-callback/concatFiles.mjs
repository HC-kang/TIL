import { appendFile, readFile } from 'fs';

function concatFiles(dest, cb, ...files) {
  function iterateSync(index) {
    if (index === files.length) {
      return cb();
    }

    readFile(files[index], 'utf-8', (err, data) => {
      if (err) {
        throw new Error(err);
      }
      appendFile(dest, `\n${data}`, (err) => {
        if (err) {
          console.log('Error writing to file: ', err);
        } else {
          console.log('Content written to file successfully');
          iterateSync(index + 1);
        }
      });
    });
  }
  iterateSync(0);
}

concatFiles(
  'dest.txt',
  () => console.log('Done'),
  'file1.txt',
  'file2.txt',
  'file3.txt'
);
