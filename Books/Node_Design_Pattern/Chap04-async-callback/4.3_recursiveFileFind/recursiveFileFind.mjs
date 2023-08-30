import { readdir, readFile, stat } from 'fs';
import { join } from 'path';

function recursiveFind(dir, keyword, cb) {
  readdir(dir, (err, files) => {
    if (err) return cb(err, null);

    let result = [];
    function iterate(index) {
      if (index === files.length) {
        return cb(null, result);
      }

      const fullPath = join(dir, files[index]);

      stat(fullPath, (err, stats) => {
        if (err) return cb(err, null);

        if (stats.isDirectory()) {
          recursiveFind(fullPath, keyword, (err, nestedFiles) => {
            if (err) return cb(err, null);

            result = result.concat(nestedFiles);
            iterate(index + 1);
          })
        } else {
          readFile(fullPath, 'utf-8', (err, data) => {
            if (err) return cb(err, null);

            if (data.indexOf(keyword) > -1) {
              result.push(fullPath);
            }
            iterate(index + 1);
          });
        }
      })
    }
    iterate(0);
  })
}

const rootDir = `../../`;

recursiveFind(rootDir, 'batman', (err, files) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(files);
  }
});