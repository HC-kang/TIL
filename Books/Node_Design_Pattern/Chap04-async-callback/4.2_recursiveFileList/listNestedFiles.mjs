import { readdir, stat } from 'fs';
import { join } from 'path';

function listNestedFiles(dir, cb) {
  readdir(dir, (err, files) => {
    if (err) {
      return cb(err);
    }
    
    files.forEach((file, index) => {
      const fullPath = join(dir, file);
      stat(fullPath, (err, stats) => {
        if (err) {
          return cb(err);
        }
        if (stats.isDirectory()) {
          listNestedFiles(fullPath, cb);
        } else {
          cb(null, fullPath);
        }
      })
    })
  })
}

const rootDir = `../`;

listNestedFiles(rootDir, (err, files) => {
  if (err) {
    return console.log(err);
  }
  console.log(files);
});