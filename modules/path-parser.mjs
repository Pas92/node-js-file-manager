import { appEnv } from './app-enviroment.mjs';
import * as fs from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setUserDefaultPath = () => {
  appEnv.currentPath = homedir();
};
