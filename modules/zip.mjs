import { appEnv } from './app-enviroment.mjs';
import {
  FILE_IS_ALREADY_EXIST,
  hasTwoArgument,
  INVALID_INPUT_PATH,
  OPERATION_FAILED,
} from './app-errors-handler.mjs';
import { isExistingPath } from './path-parser.mjs';

import * as path from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

export const compress = async (args) => {
  // Compress file (using Brotli algorithm, should be done using Streams API)
  if (hasTwoArgument(args)) {
    if (await isExistingPath(args[0])) {
      try {
        const pathToSource = path.isAbsolute(args[0])
          ? args[0]
          : path.resolve(appEnv.currentPath, args[0]);

        const pathToDestination = path.isAbsolute(args[1])
          ? args[1]
          : path.resolve(appEnv.currentPath, args[1]);

        const brotli = createBrotliCompress();
        const source = createReadStream(pathToSource);

        const destination = createWriteStream(pathToDestination, {
          flags: 'wx',
        });

        await pipeline(source, brotli, destination);
        console.log(`The file has been compressed!`);

        return;
      } catch (error) {
        if (error.code === 'EEXIST') {
          console.log(FILE_IS_ALREADY_EXIST);
        } else {
          console.log(OPERATION_FAILED);
        }
        return;
      }
    }

    console.log(INVALID_INPUT_PATH);
  }
};

export const decompress = async (args) => {
  // Decompress file (using Brotli algorithm, should be done using Streams API)

  if (hasTwoArgument(args)) {
    if (await isExistingPath(args[0])) {
      try {
        const pathToSource = path.isAbsolute(args[0])
          ? args[0]
          : path.resolve(appEnv.currentPath, args[0]);

        const pathToDestination = path.isAbsolute(args[1])
          ? args[1]
          : path.resolve(appEnv.currentPath, args[1]);

        const brotli = createBrotliDecompress();
        const source = createReadStream(pathToSource);

        const destination = createWriteStream(pathToDestination, {
          flags: 'wx',
        });

        await pipeline(source, brotli, destination);
        console.log(`The file has been decompressed!`);

        return;
      } catch (error) {
        if (error.code === 'EEXIST') {
          console.log(FILE_IS_ALREADY_EXIST);
        } else {
          console.log(OPERATION_FAILED);
        }
        return;
      }
    }

    console.log(INVALID_INPUT_PATH);
  }
};
