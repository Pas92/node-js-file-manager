import { COLOR } from './constants.mjs';
import { appEnv } from './app-enviroment.mjs';
import * as errHandler from './app-errors-handler.mjs';
import { isExistingPath } from './path-parser.mjs';
import { CustomStdout } from './utils.mjs';

import { createReadStream, createWriteStream } from 'node:fs';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

class ColorifyTransform extends Transform {
  _transform(chunk, _enc, cb) {
    try {
      cb(null, `${COLOR.cyan}${chunk.toString()}${COLOR.default}`);
    } catch (error) {
      console.log(`${COLOR.red}Operation failed!${COLOR.default}`);
    }
  }
}

export const printFile = async (args) => {
  // Read file and print it's content in console (should be done using Readable stream)

  let rs;
  if (errHandler.hasOneArgument(args)) {
    try {
      const pathToFile = path.join(appEnv.currentPath, args[0]);
      if (await isExistingPath(pathToFile)) {
        rs = createReadStream(pathToFile);
      } else {
        throw new Error('File is not exist!');
      }
    } catch (error) {
      console.log(
        `${errHandler.INVALID_INPUT} ${errHandler.FILE_IS_NOT_EXIST}`
      );
      return;
    }

    try {
      const ts = new ColorifyTransform();
      const ws = new CustomStdout();
      await pipeline(rs, ts, ws);
      process.stdout.write('\n');
      return;
    } catch (error) {
      console.log(errHandler.OPERATION_FAILED);
      return;
    }
  }
};

export const createEmptyFile = async (args) => {
  // Create empty file in current working directory

  if (errHandler.hasOneArgument(args)) {
    try {
      const pathToFile = path.join(appEnv.currentPath, args[0]);
      await (await fs.open(pathToFile, 'wx')).close();
      console.log(
        `The file ${COLOR.blue}${args[0]}${COLOR.default} has been created in the folder ${COLOR.yellow}${appEnv.currentPath}${COLOR.default}`
      );
    } catch (error) {
      console.log(errHandler.FILE_IS_ALREADY_EXIST);
    }
  }
};

export const renameFile = async (args) => {
  // Rename file (content should remain unchanged)

  if (errHandler.hasTwoArgument(args)) {
    if (await isExistingPath(args[0])) {
      try {
        const pathToFile = path.isAbsolute(args[0])
          ? args[0]
          : path.resolve(appEnv.currentPath, args[0]);

        if (!(await fs.stat(pathToFile)).isFile()) {
          throw new Error(errHandler.FILE_NOT_FOUND);
        }

        const workingDir = path.parse(pathToFile).dir;
        const newPathToFile = path.join(workingDir, args[1]);
        await (await fs.open(newPathToFile, 'wx')).close();
        await fs.unlink(newPathToFile);
        await fs.rename(path.join(pathToFile), newPathToFile);

        console.log(`The file has been renamed!`);
      } catch (error) {
        if (error.message === errHandler.FILE_NOT_FOUND) {
          console.log(errHandler.FILE_NOT_FOUND);
        } else {
          console.log(errHandler.OPERATION_FAILED);
        }
      }
      return;
    }

    console.log(errHandler.FILE_NOT_FOUND);
  }
};

export const copyFile = async (args, isShowMessage = true) => {
  // Copy file (should be done using Readable and Writable streams)

  if (errHandler.hasTwoArgument(args)) {
    if (await isExistingPath(args[0])) {
      try {
        const pathToFile = path.isAbsolute(args[0])
          ? args[0]
          : path.resolve(appEnv.currentPath, args[0]);

        const newPath = path.isAbsolute(args[0])
          ? args[0]
          : path.resolve(appEnv.currentPath, args[1]);

        if (!(await fs.stat(pathToFile)).isFile()) {
          throw new Error(errHandler.FILE_NOT_FOUND);
        }

        if (!(await isExistingPath(newPath))) {
          await fs.mkdir(newPath);
        }
        const filename = path.parse(pathToFile).base;
        const pathToNewFile = path.join(newPath, filename);

        await (await fs.open(pathToNewFile, 'wx')).close();
        await fs.unlink(pathToNewFile);

        const rs = createReadStream(pathToFile);
        const ws = createWriteStream(pathToNewFile);
        const ac = new AbortController();
        const signal = ac.signal;

        await pipeline(rs, ws, { signal });

        if (isShowMessage) {
          console.log(`The file has been copied!`);
        }

        return pathToFile;
      } catch (error) {
        if (error.message === errHandler.FILE_NOT_FOUND) {
          console.log(errHandler.FILE_NOT_FOUND);
        } else {
          console.log(errHandler.OPERATION_FAILED);
        }
      }
      return;
    }

    console.log(errHandler.FILE_NOT_FOUND);
  }
};

export const moveFile = async (args) => {
  // Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams)
  const pathForDeleting = await copyFile(args, false);
  if (pathForDeleting) {
    try {
      await fs.unlink(pathForDeleting);
    } catch (error) {
      console.log(errHandler.OPERATION_FAILED);
    }
  }
};

export const deleteFile = async (args) => {
  // Delete file

  if (errHandler.hasOneArgument(args)) {
    if (await isExistingPath(args[0])) {
      try {
        const pathToFile = path.isAbsolute(args[0])
          ? args[0]
          : path.join(appEnv.currentPath, args[0]);
        await fs.unlink(pathToFile);
        console.log(
          `The file ${COLOR.blue}${args[0]}${COLOR.default} has been deleted!`
        );
      } catch (error) {
        console.log(errHandler.OPERATION_FAILED);
      }
      return;
    }

    console.log(errHandler.FILE_NOT_FOUND);
  }
};
