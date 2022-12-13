import { appEnv } from './app-enviroment.mjs';
import { APP } from './constants.mjs';

export const parseCommand = () => {
  process.stdin.on('data', chooseAction);
  process.on('SIGINT', showFinalPhrase);
};

const chooseAction = (chunk) => {
  const string = chunk.toString().trim();

  if (string === `${APP.exit}`) {
    showFinalPhrase();
  }

  process.stdout.write(
    `You are currently in \x1b[33m${appEnv.currentPath}!\x1b[0m\n`
  );
};

const showFinalPhrase = () => {
  process.stdout.write(
    `Thank you for using File Manager, \x1b[33m${appEnv.user}\x1b[0m, goodbye!\n`
  );
  process.exit();
};
