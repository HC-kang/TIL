import { Transform } from 'stream';

export class AggregateByYear extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.crimeOverYears = new Map();
  }

  _transform(record, enc, cb) {
    const year = record.year;
    const crimeCount = Number(record.value);
    this.crimeOverYears[year] = (this.crimeOverYears[year] || 0) + crimeCount;
    this.push(record);
    cb();
  }

  _flush(cb) {
    let crimeChanges = 0;
    const years = Object.keys(this.crimeOverYears).sort();
    for (let i = 1; i < years.length; i++) {
      crimeChanges +=
        this.crimeOverYears[years[i]] - this.crimeOverYears[years[i - 1]];
    }
    const crimeFlow = crimeChanges > 0 ? "up" : "down";
    this.push([this.crimeOverYears, crimeFlow]);
    cb();
  }
}
