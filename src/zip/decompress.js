import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createUnzip } from 'node:zlib';
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

const decompress = async () => {
  const readStream = createReadStream(pathToArchive);
  const writeStream = createWriteStream(pathToFileToCompress);

  await pipeline(readStream, createUnzip(), writeStream);
  fs.rm(pathToArchive);
};

await decompress();
