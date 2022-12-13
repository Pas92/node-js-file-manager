import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appEnv } from './app-enviroment.mjs';
import { parseCommand } from './cli-parser.mjs';
import { ARGS, COLOR } from './constants.mjs';
import { setUserDefaultPath } from './path-parser.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setUserName = () => {
  const argument = process.argv.filter((arg) =>
    arg.startsWith(`${ARGS.user}`)
  )[0];
  appEnv.user = argument.split('=')[1];
};

export const appInit = () => {
  setUserName();
  setUserDefaultPath();

  process.stdout.write(
    `Welcome to the File Manager, ${COLOR.yellow}${appEnv.user}!${COLOR.default}\n`
  );
  process.stdout.write(
    `You are currently in ${COLOR.yellow}${appEnv.currentPath}!${COLOR.default}\n`
  );

  parseCommand();
};
