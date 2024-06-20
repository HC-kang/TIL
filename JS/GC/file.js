const fs = require('fs');
const path = require('path');

// 파일 오픈 수를 추적하기 위한 변수
let openFileCount = 0;

// 메모리 사용량을 사람이 읽기 쉬운 단위로 변환하는 함수
function formatMemoryUsage(memoryUsage) {
  return {
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
    arrayBuffers: `${(memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)} MB`,
  };
}

// 메모리 누수를 재현하기 위해 파일을 반복적으로 열기 위한 함수
function openFilesWithoutClosing() {
  const filePath = path.join(__dirname, 'sample.txt');
  for (let i = 0; i < 1000; i++) {
    fs.open(filePath, 'r', (err, fd) => {
      if (err) {
        if (err.code === 'EMFILE') {
          console.error(`Error: ${err.message}`);
          console.error(`Open file count at error: ${openFileCount}`);
          process.exit(1);
        } else {
          console.error(`Failed to open file: ${err}`);
        }
      } else {
        openFileCount++;
        // 파일 핸들을 닫지 않음
        // fs.close(fd, (err) => {
        //   if (err) console.error(`Failed to close file: ${err}`);
        // });
      }
    });
  }
}

// 메모리 사용량을 모니터링하기 위한 함수
function monitorMemory() {
  const memoryUsage = process.memoryUsage();
  const formattedMemoryUsage = formatMemoryUsage(memoryUsage);
  console.log(`Memory Usage: ${JSON.stringify(formattedMemoryUsage)}`);
  console.log(`Open File Count: ${openFileCount}`);
}

// 주기적으로 메모리 사용량을 모니터링하고 파일을 여는 작업 수행
setInterval(() => {
  monitorMemory();
  openFilesWithoutClosing();
}, 1000);