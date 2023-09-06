import { Transform } from 'stream';

export class AggregateByCrimeAndArea extends Transform {
  constructor(options = { objectMode: true }) {
    super(options);
    this.crimeMap = new Map();
  }

  _transform(record, enc, cb) {
    const crimeArea = record.borough;
    const crimeCategory = record.major_category;
    const crimeCount = Number(record.value);
    if (!this.crimeMap[crimeArea]) {
      this.crimeMap[crimeArea] = {};
      this.crimeMap[crimeArea][crimeCategory] = crimeCount;
    } else {
      this.crimeMap[crimeArea][crimeCategory] =
        (this.crimeMap[crimeArea][crimeCategory] || 0) + crimeCount;
    }
    this.push(this.crimeMap);
    cb();
  }

  maxCrimePerArea() {
    const maxCrimeMap = Object.entries(this.crimeMap).reduce(
      (acc, [area, crimes]) => {
        const maxCrime = Object.entries(crimes).reduce(
          (max, [crime, count]) => {
            if (count > max.count) {
              return {
                crime,
                count,
              };
            } else {
              return max;
            }
          },
          {
            crime: null,
            count: -Infinity,
          }
        );
        acc[area] = { [maxCrime.crime]: maxCrime.count };
        return acc;
      },
      {}
    );
    return maxCrimeMap;
  }

  _flush(cb) {
    this.push(this.maxCrimePerArea());
    cb();
  }
}
