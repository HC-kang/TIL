import { EventEmitter } from 'events';
import { readFile } from 'fs';
import { nextTick } from 'process';

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    // 1.
    nextTick(() => this.emit('nextTick_start'));
    
    // 2.
    Promise.resolve().then(() => {
      console.log("promise emit", this.emit('promise_start', this.files));
    });

    // 3.
    new Promise((resolve, reject) => {
      resolve();
    }).then(() => console.log("new promise emit", this.emit('new_promise_start', this.files)));

    for (const file of this.files) {
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }

        this.emit('filtered', file);

        const match = content.match(this.regex);
        if (match) {
          match.forEach((elem) => this.emit('found', file, elem));
        } else {
          this.emit('not_found', file);
        }
      });
    }
    return this;
  }
}

const findRegexInstance = new FindRegex(/hello \w+/);
findRegexInstance
  .addFile('./fileA.txt')
  .addFile('./fileB.json')
  .find()
  .on('nextTick_start', () => console.log('find regex nextTick started'))
  .on('promise_start', (files) => console.log('find regex promise started', files))
  .on('new_promise_start', (files) => console.log('find regex new promise started', files))
  .on('found', (file, match) => console.log(`Matched ${match} in file ${file}`))
  .on('not_found', (file) => console.log(`Not found in file ${file}`))
  .on('error', (err) => console.log(`Error emitted ${err.message}`));