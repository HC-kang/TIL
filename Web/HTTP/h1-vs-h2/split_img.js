import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

// 이미지 파일 경로
const imagePath = './iu1.png';

// 출력 디렉토리
const outputDir = 'img';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

sharp(imagePath)
  .resize(512, 512)
  .toBuffer()
  .then(data => {
    sharp(data)
      .metadata()
      .then(metadata => {
        const width = metadata.width;
        const height = metadata.height;
        const pieceWidth = 16;
        const pieceHeight = 16;

        let counter = 0;

        for (let y = 0; y < height; y += pieceHeight) {
          for (let x = 0; x < width; x += pieceWidth) {
            sharp(data)
              .extract({ left: x, top: y, width: pieceWidth, height: pieceHeight })
              .toFile(path.join(outputDir, `tile-${counter}.png`), (err, info) => {
                if (err) {
                  console.error(`Error saving tile-${counter}.png:`, err);
                }
              });
            counter++;
          }
        }

        console.log('이미지 조각들이 저장되었습니다.');
      })
      .catch(err => {
        console.error('메타데이터를 가져오는 중 오류 발생:', err);
      });
  })
  .catch(err => {
    console.error('이미지를 처리하는 중 오류 발생:', err);
  });
