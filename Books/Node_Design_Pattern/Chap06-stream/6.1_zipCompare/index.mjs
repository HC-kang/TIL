/**
 * 6.1 데이터 압축 효율성
 * - 파일을 입력을 취하고, zlib모듈에서 사용 할 수 있는 세 가지 압축 알고리즘을 사용하여 압축
 * - 각 알고리즘의 소요시간과 압축률을 비교한 테이블 생성
 */
import fs from 'fs';
import zlib from 'zlib';
import { pipeline, Transform, PassThrough } from 'stream';
import { promisify } from 'util';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const argv = require('minimist')(process.argv.slice(2));

const pipe = promisify(pipeline);

class CompressionResults {
  constructor(algorithm, inputSize, compressedSize, duration) {
    this.algorithm = algorithm;
    this.inputSize = inputSize;
    this.compressedSize = compressedSize;
    this.duration = duration;
    this.compressionRatio = (compressedSize / inputSize).toFixed(2);
  }
}

class Accumulator extends Transform {
  constructor() {
    super();
    this.totalSize = 0;
  }
  _transform(chunk, encoding, callback) {
    this.totalSize += chunk.length;
    callback();
  }
}

async function compressFile(inputFile, inputStream, algorithm) {
  const compressor = zlib[algorithm]();
  const accumulator = new Accumulator();
  const passThroughStream = new PassThrough();

  inputStream.pipe(passThroughStream);

  const startTime = Date.now();
  await pipe(passThroughStream, compressor, accumulator);
  const endTime = Date.now();
  
  const inputSize = fs.statSync(inputFile).size;
  const compressedSize = accumulator.totalSize;
  const duration = endTime - startTime;
  return new CompressionResults(algorithm, inputSize, compressedSize, duration);
}

async function main() {
  if (argv._.length === 0) {
    console.error('Please provide a file as input.');
    process.exit(1);
  }

  const inputFile = argv._[0];
  try {
    fs.accessSync(inputFile, fs.constants.R_OK);
  } catch (error) {
    console.error(`Error: ${inputFile} is not readable.`);
    process.exit(1);
  }

  try {
    const algorithm = ['createBrotliCompress', 'createDeflate', 'createGzip'];
    const inputStream = fs.createReadStream(inputFile);
    const results = await Promise.all(
      algorithm.map((algorithm) =>
        compressFile(inputFile, inputStream, algorithm)
      )
    );
    console.table(results, [
      'algorithm',
      'inputSize',
      'compressedSize',
      'duration',
      'compressionRatio',
    ]);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
