const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const NUM_OF_RUN = 30; // 원하는 실행 횟수
const TEST_NAME = '00_performance_of_loops.js'; // 실행할 파일명
const RESULT_DIR = path.join(__dirname, 'results');

if (!fs.existsSync(RESULT_DIR)) {
  fs.mkdirSync(RESULT_DIR);
}

const outputFile = path.join(RESULT_DIR, `${TEST_NAME}.txt`);

function runTest(iteration) {
  return new Promise((resolve, reject) => {
    exec(`node --expose-gc ${TEST_NAME}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Stderr: ${stderr}`);
        return;
      }

      const result = `--- ${iteration}회차 ---\n${stdout}`;
      fs.appendFileSync(outputFile, result);
      resolve();
    });
  });

}

async function runTests() {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }

  for (let i = 1; i <= NUM_OF_RUN; i++) {
    try {
      await runTest(i);
      console.log(`Run ${i} complete`);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(`All ${NUM_OF_RUN} runs complete. Results saved to ${outputFile}`);
}

runTests();
