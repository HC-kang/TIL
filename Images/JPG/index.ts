import sharp from 'sharp';
import { getJpegQuality } from './getJpegQuality';

async function main() {
  console.log('Hello from JPG');
  const image = sharp('../samples/the-cat.jpg');
  const imageBuffer = await image.toBuffer();
  const quality = getJpegQuality(new Uint8Array(imageBuffer));

  // quality 75
  image.jpeg({ quality: 75 }).resize(800, 800).toFile('output/q75.jpg');

  // quality 50
  image.jpeg({ quality: 50 }).resize(800, 800).toFile('output/q50.jpg');

  // quality 25
  image.jpeg({ quality: 25 }).resize(800, 800).toFile('output/q25.jpg');

  console.log(quality);
  console.log('=== done ===');
}

main();
