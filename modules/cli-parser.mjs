import { appEnv } from './app-enviroment.mjs';
import { APP, COLOR } from './constants.mjs';
import * as nav from './navigation.mjs';
import * as fileActions from './file-actions.mjs';

export const parseCommand = () => {
  process.stdin.on('data', chooseAction);
  process.on('SIGINT', showFinalPhrase);
};

const chooseAction = (chunk) => {
  const string = chunk.toString().trim();
  const arrFromString = string.split(' ');
  const command = arrFromString[0];
  const commandArguments = arrFromString.slice(1);

  if (string === `${APP.exit}`) {
    showFinalPhrase();
  }

  switch (command) {
    case 'up':
      nav.goToUpperDirectory(commandArguments);
      break;
    case 'cd':
      nav.goToDedicatedDirectory(commandArguments);
      break;
    case 'ls':
      nav.showFolderContent(commandArguments);
      break;
    case 'cat':
      fileActions.printFile(commandArguments);
      break;
    case 'add':
      fileActions.createEmptyFile(commandArguments);
      break;
    case 'rn':
      fileActions.renameFile(commandArguments);
      break;
    case 'cp':
      fileActions.copyFile(commandArguments);
      break;
    case 'mv':
      fileActions.moveFile(commandArguments);
      break;
    case 'rm':
      fileActions.deleteFile(commandArguments);
      break;
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
