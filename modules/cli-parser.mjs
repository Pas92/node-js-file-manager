import { appEnv } from './app-enviroment.mjs';
import { APP, COLOR } from './constants.mjs';
import * as nav from './navigation.mjs';

export const parseCommand = () => {
  process.stdin.on('data', chooseAction);
  process.on('SIGINT', showFinalPhrase);
};

const chooseAction = (chunk) => {
  const string = chunk.toString().trim();
  const commands = string.split(' ');

  if (string === `${APP.exit}`) {
    showFinalPhrase();
  }

  switch (commands[0]) {
    case 'up':
      nav.goToUpperDirectory();
  }

  process.stdout.write(
    `You are currently in ${COLOR.yellow}${appEnv.currentPath}${COLOR.default}!\n`
  );
};

const showFinalPhrase = () => {
  process.stdout.write(
    `Thank you for using File Manager, ${COLOR.yellow}${appEnv.user}${COLOR.default}, goodbye!\n`
  );
  process.exit();
};
