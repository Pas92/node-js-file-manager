import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appEnv } from './modules/app-enviroment.mjs';
import { appInit } from './modules/init.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

appInit();
