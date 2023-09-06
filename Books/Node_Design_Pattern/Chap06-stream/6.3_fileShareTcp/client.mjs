import { createCipheriv, randomBytes, scryptSync } from 'crypto';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { connect } from 'net';

const SERVER_IP = 'localhost';

const key = Buffer.from(process.argv[2], 'hex');

const EOF_MARKER = Buffer.from([0xff, 0xff, 0xff, 0xff]);

export async function compressAndEncryptFile(source) {
  const destination = `${source}.gz.enc`;

  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-192-cbc', key, iv);

  await new Promise((resolve, reject) => {
    createReadStream(source)
      .pipe(createGzip())
      .pipe(cipher)
      .pipe(createWriteStream(destination))
      .on('finish', () => {
        console.log(`File "${source}" compressed and encrypted successfully.`);
        resolve();
      })
      .on('error', (err) => {
        console.error('Error occurred:', err.message);
        reject();
      });
  });
  return { iv };
}

const files = ['file-1.txt', 'file-2.txt', 'file-3.txt'];

async function send(file) {
  const { iv } = await compressAndEncryptFile(file);
  const fileStream = createReadStream(`${file}.gz.enc`);

  // convert filename string to Buffer
  const filenameBuffer = Buffer.from(file, 'utf-8');

  // create new Buffer and allocate 4 bytes = 32 bits
  const filenameLengthBuffer = Buffer.alloc(4);

  // write in `filenameLengthBuffer` this buffer as a 32 bit unsigned integer the length of `filenameBuffer` at offset 0
  filenameLengthBuffer.writeUInt32BE(filenameBuffer.length, 0);

  const headerBuffer = Buffer.alloc(1 + 16 + 16 + 4 + filenameBuffer.length);
  headerBuffer.writeUInt8(1, 0); // Channel ID
  iv.copy(headerBuffer, 1);
  filenameLengthBuffer.copy(headerBuffer, 17);
  filenameBuffer.copy(headerBuffer, 21);

  // write the header packet to the server
  Socket.write(headerButter);

  // Send the data packets as they become available
  await new Promise((resolve, reject) => {
    fileStream
      .on('readable', () => {
        let chunk;
        while ((chunk = this.read()) !== null) {
          try {
            const outBuff = Buffer.alloc(4 + chunk.length);
            outBuff.writeUInt32BE(chunk.length, 0);
            chunk.copy(outBuff, 4);
            Socket.write(outBuff);
          } catch (err) {
            console.error('Error occurred: ', err.message);
          }
        }
      })
      .on('end', () => {
        console.log(`File "${file}" sent.`);
        setTimeout(() => {
          socket.write(EOF_MARKER);
          resolve();
        }, 100);
      })
      .on('error', (err) => {
        console.error('Error occurred: ', err.message);
        reject(err);
      });
  });
}

const socket = connect(3000, SERVER_IP, async () => {
  for (const file of files) await send(file);
  socket.on('error', (err) => {
    console.error('Error occurred: ', err.message);
  });
  socket.on('end', () => console.log('socket.ends'));
});
