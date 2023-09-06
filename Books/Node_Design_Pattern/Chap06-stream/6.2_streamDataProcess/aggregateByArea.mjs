import { Transform } from 'stream';

export class AggregateByArea extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.crimeByArea = new Map();
  }
  
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  _transform(record, enc, cb) {
    const crimeCount = Number(record.value);
    const crimeArea = record.borough;
    if (
      this.isEmpty(this.crimeByArea) ||
      crimeCount > this.crimeByArea.crimeCount
    ) {
      this.crimeByArea = { crimeArea, crimeCount };
    }
    this.push(this.crimeByArea);
    cb();
  }

  _flush(cb) {
    cb();
  }
}