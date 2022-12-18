import { appEnv } from './app-enviroment.mjs';
import { homedir } from 'node:os';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { INVALID_INPUT_PATH } from './app-errors-handler.mjs';

export const setUserDefaultPath = () => {
  appEnv.currentPath = homedir();
};

export const getAbsolutePath = async (incomingPath) => {
  try {
    if (await isExistingPath(incomingPath)) {
      if (path.isAbsolute(incomingPath)) {
        return incomingPath;
      }

      const pathParts = path.parse(incomingPath);
      if (pathParts.root) {
        return path.normalize(`${pathParts.root}/`);
      }
      return path.resolve(appEnv.currentPath, incomingPath);
    }
    throw new Error();
  } catch (error) {
    console.log(INVALID_INPUT_PATH);
  }
};

export const isExistingPath = async (pathForChecking) => {
  try {
    if (path.isAbsolute(pathForChecking)) {
      await fs.access(pathForChecking);
      return true;
    }
    await fs.access(path.resolve(appEnv.currentPath, pathForChecking));
    return true;
  } catch (error) {
    return false;
  }
};
