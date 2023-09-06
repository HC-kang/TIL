import { Transform } from 'stream';

export class AggregateByCrime extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.crimesMap = new Map();
  }

  leastCrimeOverYears() {
    const sortByCrimesDesc = Object.entries(this.crimesMap).sort(
      (a, b) => a[1] - b[1]
    );
    const smallestCrime = sortByCrimesDesc[0][1];
    return sortByCrimesDesc.filter(([_, value]) => value === smallestCrime);
  }

  _transform(record, enc, cb) {
    const crimeCount = Number(record.value);
    const crimeCategory = record.major_category;
    this.crimesMap[crimeCategory] =
      (this.crimesMap[crimeCategory] || 0) + crimeCount;

    this.push(this.crimesMap);
    cb();
  }

  _flush(cb) {
    this.push(this.leastCrimeOverYears());
    cb();
  }
}