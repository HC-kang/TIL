import { readdir, readFile, stat } from 'fs';
import { relative, resolve } from 'path';
import { nextTick } from 'process';
import { TaskQueue } from './taskQueue.mjs';
import { fsOptions } from './helpers.mjs';

const __dirname = resolve();

const filesWithKeyword = [];

function checkFileForKeyword(path, keyword, done) {
  readFile(path, fsOptions, (err, data) => {
    if (err) return done(err);

    const fileIncludesKeyword = data.includes(keyword);

    if (fileIncludesKeyword) filesWithKeyword.push(relative(__dirname, path));

    done();
  })
}

function handlePath(path, keyword, queue, done) {
  readFile(path, fsOptions, (err, data) => {
    if (err) return done(err);

    const fileIncludesKeyword = data.includes(keyword);

    if (fileIncludesKeyword) filesWithKeyword.push(relative(__dirname, path));

    done();
  })
}

function scanDir(dir, keyword, queue, doneWithDir) {
  if (dir.includes('node_modules')) return nextTick(() => doneWithDir());

  readdir(dir, fsOptions, (err, paths) => {
    if (err) return doneWithDir(err);

    paths.forEach(path => {
      queue.pushTask(doneWithPath => {
        const fullPath = resolve(dir, path);
        handlePath(fullPath, keyword, queue, doneWithPath);
      })
    })

    return doneWithDir();
  })
}

function recursiveFind(dir, keyword, queue) {
  queue.pushTask(done => {
    scanDir(dir, keyword, queue, done);
  });
}

const taskQueue = new TaskQueue(5);

taskQueue.on('error', console.error);
taskQueue.on('empty', () => {
  console.log(filesWithKeyword.join(',\n'));
  console.log('DONE');
})

recursiveFind(__dirname, 'batman', taskQueue);

function recursiveFindCallbackHell(dir, keyword, queue) {
  queue.pushTask(done => {
    if (dir.includes('node_modules')) return nextTick(() => done());

    readdir(dir, fsOptions, (err, paths) => {
      if (err) return done(err);

      paths.forEach(path => {
        queue.pushTask(doneWithPath => {
          const fullPath = resolve(dir, path);
          stat(fullPath, (err, stats) => {
            if (err) return doneWithPath(err);

            const isDir = stats.isDirectory();

            if (!isDir) {
              return readFile(fullPath, fsOptions, (err, data) => {
                if (err) return doneWithPath(err);

                const fileIncludesKeyword = data.includes(keyword);

                if (fileIncludesKeyword) filesWithKeyword.push(relative(__dirname, fullPath));

                doneWithPath();
              });
            }

            recursiveFind(fullPath, keyword, queue);
            done();
          })
        })
      })

      return done();
    })
  })
}

const taskQueueCallbackHell = new TaskQueue(5);

taskQueueCallbackHell.on('error', console.error);
taskQueueCallbackHell.on('empty', () => {
  console.log(filesWithKeyword.join(',\n'));
  console.log('DONE');
})

recursiveFindCallbackHell(__dirname, 'batman', taskQueueCallbackHell);