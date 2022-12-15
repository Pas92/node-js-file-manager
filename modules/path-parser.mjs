import { appEnv } from './app-enviroment.mjs';
import * as fs from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { COLOR } from './constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    console.log(`${COLOR.red}Invalid input! Path isn't exist${COLOR.default}`);
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
