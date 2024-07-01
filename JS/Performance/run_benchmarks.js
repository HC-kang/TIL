const fs = require('fs').promises;
const path = require('path');

async function runBenchmark(filePath) {
  const func = require(filePath);
  const functionName = path.basename(filePath, '.benchmark.js');
  const iterations = 100;
  const results = [];

  for (let i = 0; i < iterations; i++) {
    const start = process.hrtime.bigint();
    await func();
    const end = process.hrtime.bigint();
    results.push(Number(end - start) / 1e6);
  }

  return {
    name: functionName,
    directory: path.basename(path.dirname(filePath)),
    mean: results.reduce((a, b) => a + b, 0) / iterations,
    min: Math.min(...results),
    max: Math.max(...results)
  };
}

async function findBenchmarkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await findBenchmarkFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.benchmark.js')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const testsDir = path.join(__dirname, 'tests');
  const resultDir = path.join(__dirname, 'results');
  const benchmarkFiles = await findBenchmarkFiles(testsDir);

  for (const file of benchmarkFiles) {
    const result = await runBenchmark(file);

    await fs.appendFile(
      path.join(resultDir, 'benchmark_results.json'),
      JSON.stringify(result) + '\n'
    );

    console.log(`Completed benchmark for ${result.name} in ${result.directory}`);
  }
}

main().catch(console.error);