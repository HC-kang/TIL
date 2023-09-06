/**
 * 6.2 스트림 데이터 처리
 * - csv형식의 데이터(https://nodejsdp.link/london-crime)를 읽어서 분석하는 스크립트 작성 예제
 * - 요구사항
 *  - 범죄 건수가 수년에 걸쳐 증가했거나 감소했는지?
 *  - 런던에서 가장 위험한 지역은 어디인지?
 *  - 지역별로 가장 흔한 범죄는 무엇인지?
 *  - 가장 흔한 범죄는 무엇인지?
 */

import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { PassThrough } from 'stream';
import { AggregateByArea } from './aggregateByArea.mjs';
import { AggregateByCrime } from './aggregateByCrime.mjs';
import { AggregateByCrimeAndArea } from './aggregateByCrimeAndArea.mjs';
import { AggregateByYear } from './aggregateByYear.mjs';
const csvParser = parse({ columns: true });

const inputStream = createReadStream('./london_crime_by_lsoa.csv').pipe(
  csvParser
);

function createForks(n) {
  const forks = [];
  for (let i = 0; i < n; i++) {
    const fork = new PassThrough({ objectMode: true });
    inputStream.pipe(fork);
    forks.push(fork);
  }
  return forks;
}

const [fork1, fork2, fork3, fork4] = createForks(4);

async function crimeFlow() {
  return new Promise((resolve, reject) => {
    let lastChunk;
    console.log('fork1')
    fork1
      .pipe(new AggregateByYear())
      .on("data", (data) => {
        lastChunk = data;
      })
      .on("end", () => {
        console.log('end');
        resolve(lastChunk[1]);
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function dangerousArea() {
  return new Promise((resolve, reject) => {
    let lastChunk;
    console.log('fork2')
    fork2
      .pipe(new AggregateByArea())
      .on("data", (data) => {
        lastChunk = data;
      })
      .on("end", () => {
        console.log('end');
        resolve(lastChunk);
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function mostCommonCrimePerArea() {
  return new Promise((resolve, reject) => {
    let lastChunk;
    console.log('fork3')
    fork3
      .pipe(new AggregateByCrimeAndArea())
      .on("data", (data) => {
        lastChunk = data;
      })
      .on("end", () => {
        console.log('end');
        resolve(lastChunk);
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function leastCommonCrime() {
  return new Promise((resolve, reject) => {
    let lastChunk;
    console.log('fork4')
    fork4
      .pipe(new AggregateByCrime())
      .on("data", (data) => {
        lastChunk = data;
      })
      .on("end", () => {
        console.log('end');
        resolve(lastChunk);
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      });
  });
}

console.log(' - London crime data analysis');

console.log(' - Did the number of crimes increase or decrease over the years?');
console.log(await crimeFlow());

console.log(' - Which area has the most crimes?');
console.log(await dangerousArea());

console.log(' - Which crime is most common in each area?');
console.log(await mostCommonCrimePerArea());

console.log(' - Which is the least common crime?');
console.log(await leastCommonCrime());

console.log(' - End of script');
