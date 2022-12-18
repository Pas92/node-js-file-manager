import { COLOR } from './constants.mjs';
import { appEnv } from './app-enviroment.mjs';
import { hasOneArgument } from './app-errors-handler.mjs';
import path from 'node:path';
import { createReadStream } from 'node:fs';

import { createHash } from 'node:crypto';
import { isExistingPath } from './path-parser.mjs';
import { pipeline } from 'node:stream/promises';
import { CustomStdout } from './utils.mjs';

export const calculateHash = async (args) => {
  // Calculate hash for file and print it into console

  if (hasOneArgument(args)) {
    if (await isExistingPath(args[0])) {
      const pathToFile = path.isAbsolute(args[0])
        ? args[0]
        : path.resolve(appEnv.currentPath, args[0]);
      const hash = createHash('sha256').setEncoding('hex');
      const input = createReadStream(pathToFile);
      const output = new CustomStdout();
      process.stdout.write(
        `The has of file ${COLOR.cyan}${path.normalize(pathToFile)}${
          COLOR.default
        } is ${COLOR.magenta}`
      );
      await pipeline(input, hash, output);
      process.stdout.write(`${COLOR.default}\n`);
    }
  }
};
