const fs = require('fs');
const path = require('path');

// 특정 디렉토리 경로
const directoryPath = './';

function renameFilesInDirectory(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      return console.error('디렉토리 읽기 오류: ', err);
    }

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        // 하위 디렉토리를 재귀적으로 탐색
        renameFilesInDirectory(fullPath);
      } else if (file.isFile() && file.name.endsWith('.benchmark.js')) {
        const newPath = path.join(dir, file.name.replace('.benchmark.js', '.js'));

        // 파일 이름 변경
        fs.rename(fullPath, newPath, (err) => {
          if (err) {
            return console.error('파일 이름 변경 오류: ', err);
          }
          console.log(`${fullPath} -> ${newPath}로 변경됨`);
        });
      }
    });
  });
}

// 초기 디렉토리에서 시작
renameFilesInDirectory(directoryPath);
