import { readdir, writeFile } from 'fs';
import { join } from 'path';

function listNestedFiles(dir, cb) {
  const dirSets = new Set();

  const rootDirObj = {};

  const next = (nextDir, nextObj, nextCb) => {
    dirSets.add(nextDir);

    readdir(nextDir, { withFileTypes: true }, (err, files) => {
      if (err) return nextCb(err);
      let fullPath;

      files
        .filter((file) => file.isDirectory())
        .map((file) => file.name)
        .forEach((file) => {
          nextObj[file] = {};
          fullPath = join(nextDir, file);
          next(fullPath, nextObj[file], (err) => {
            if (err) return cb(err);
          });
        });

      nextCb(null, fullPath);

      dirSets.delete(nextDir);
      if (dirSets.size === 0) {
        writeFile('dir.json', JSON.stringify(rootDirObj, null, 2), (err) => {
          if (err) return cb(err);
          return cb(null, 'Done');
        });
      }
    });
  };

  next(dir, rootDirObj, (err) => {
    if (err) return cb(err);
  });
}

const rootDir = `../../`;
listNestedFiles(rootDir, (err, files) => {
  if (err) {
    return console.log(err);
  }
  console.log(files);
});
