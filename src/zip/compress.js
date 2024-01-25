import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToFileToCompress = path.resolve(
  __dirname,
  'files',
  'fileToCompress.txt'
);
const pathToArchive = path.resolve(__dirname, 'files', 'archive.gz');

const compress = async () => {
  const readStream = createReadStream(pathToFileToCompress);
  const writeStream = createWriteStream(pathToArchive);

  await pipeline(readStream, createGzip(), writeStream);
  fs.rm(pathToFileToCompress);
};

await compress();
