import { readFile, writeFile } from 'fs';

function concatFiles(dest, cb, ...files) {
  let content = '';
  let index = 0;

  iterate();

  function iterate() {
    if (index === files.length) {
      writeFile(dest, content, (err) => {
        if (err) {
          return cb(err);
        }
      });
      return cb(null, content);
    }
    readFile(files[index], 'utf-8', (err, data) => {
      if (err) {
        return cb(err);
      }
      content += `\n${data}`;
      index++;
      iterate();
    });
  }
}

concatFiles(
  'dest.txt',
  (err) => {
    if (err) {
      console.log('Error writing to file: ', err);
    } else {
      console.log('Content written to file successfully');
    }
  },
  'file1.txt',
  'file2.txt',
  'file3.txt'
);
