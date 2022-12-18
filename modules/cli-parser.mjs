import { appEnv } from './app-enviroment.mjs';
import { APP, COLOR } from './constants.mjs';
import * as nav from './navigation.mjs';
import * as fileActions from './file-actions.mjs';
import * as osInfo from './os-info.mjs';
import * as hashCalculator from './hash-calc.mjs';
import * as zipActions from './zip.mjs';

export const parseCommand = async () => {
  process.stdin.on('data', await chooseAction);
  process.on('SIGINT', showFinalPhrase);
};

const chooseAction = async (chunk) => {
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
      await nav.goToDedicatedDirectory(commandArguments);
      break;
    case 'ls':
      nav.showFolderContent(commandArguments);
      break;
    case 'cat':
      await fileActions.printFile(commandArguments);
      break;
    case 'add':
      await fileActions.createEmptyFile(commandArguments);
      break;
    case 'rn':
      await fileActions.renameFile(commandArguments);
      break;
    case 'cp':
      await fileActions.copyFile(commandArguments);
      break;
    case 'mv':
      await fileActions.moveFile(commandArguments);
      break;
    case 'rm':
      await fileActions.deleteFile(commandArguments);
      break;
    case 'os':
      osInfo.getOsInfo(commandArguments);
      break;
    case 'hash':
      await hashCalculator.calculateHash(commandArguments);
      break;
    case 'compress':
      await zipActions.compress(commandArguments);
      break;
    case 'decompress':
      await zipActions.decompress(commandArguments);
      break;
    default:
      console.log(`${COLOR.red}Invalid input${COLOR.default}`);
  }

  console.log(
    `You are currently in ${COLOR.yellow}${appEnv.currentPath}${COLOR.default}!`
  );
};

const showFinalPhrase = () => {
  console.log(
    `Thank you for using File Manager, ${COLOR.yellow}${appEnv.user}${COLOR.default}, goodbye!\n`
  );
  process.exit();
};
