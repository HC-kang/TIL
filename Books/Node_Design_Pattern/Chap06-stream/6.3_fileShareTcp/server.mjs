import { createDecipheriv, randomBytes } from 'crypto';
import { createWriteStream } from 'fs';
import { createServer, Socket } from 'net';
import { pipeline, Readable } from 'stream';
import { createGunzip } from 'zlib';
import { join, basename } from 'path';

const EOF_MARKER = Buffer.from([0xff, 0xff, 0xff, 0xff]); // 4 bytes of 0xFF

const secret = randomBytes(24);
console.log(`Generated secret: ${secret.toString('hex')}`);

function demultiplexChannel(source) {
  let filename = null;
  let chunkSize = null;
  let chunkData = null;
  let iv = null;
  let id = null;

  const destinations = {};

  source
    .on('readable', () => {
      let chunk;
      while ((chunk = source.read()) !== null) { // when source is readable
        if (chunk.equals(EOF_MARKER)) {     // if chunk is EOF(End Of File) marker,
          filename = null;                  // close the file and reset the variables
          chunkSize = null;                 // for the next file
          continue;                         // and continue to the next chunk
        }
        if (!filename) {                 // if filename is not set,
          const header = chunk;          // how can I assume that the chunk is header?
          id = header.slice(0, 1);
          iv = header.slice(1, 17);
          const filenameLength = header.slice(17, 21).readUInt32BE(0); // and why is it filenameLength?
          filename = join(
            'resources',
            `server-${basename(
              header.slice(21, 21 + filenameLength).toString()
            )}`
          );
          destinations[id] = createWriteStream(filename);
        } else if (chunkSize === null) { // if chunkSize is not set,
          chunkSize = chunk.slice(0, 4).readUInt32BE(0); // how can I assume that the chunk's size is 4?
          chunkData = chunk.slice(4);
          if (chunkSize > chunkData.length) {
            console.error(
              `chunkSize (${chunkSize}) is larger than the chunk length (${chunk.length})`
            );
            return;
          }
          const decipher = createDecipheriv('aes-192-cbc', secret, iv);
          Readable.from(chunkData)
            .pipe(decipher)
            .pipe(createGunzip())
            .pipe(destinations[id]);
        }
      }
    })
    .on('end', () => {
      for (const [_, destination] of Object.entries(destinations)) {
        destination.end();
      }
    })
    .on('error', (err) => {
      console.error('Error occurred:', err.message);
    });
}

const server = createServer((socket) => {
  demultiplexChannel(socket);
});

server.listen(3000, () => console.log('Server started'));
