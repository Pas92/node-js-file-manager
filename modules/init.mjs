import { appEnv } from './app-enviroment.mjs';
import { parseCommand } from './cli-parser.mjs';
import { ARGS, COLOR } from './constants.mjs';
import { setUserDefaultPath } from './path-parser.mjs';

const setUserName = () => {
  const argument = process.argv.filter((arg) =>
    arg.startsWith(`${ARGS.user}`)
  )[0];

  if (!argument) {
    console.log(
      `${COLOR.red}Invalid input! Enter the username with argument ${COLOR.magenta}${ARGS.user}=<username>${COLOR.default}`
    );
    process.exit();
  } else {
    appEnv.user = argument.split('=')[1];
  }
};

export const appInit = async () => {
  setUserName();
  setUserDefaultPath();

  process.stdout.write(
    `Welcome to the File Manager, ${COLOR.yellow}${appEnv.user}${COLOR.default}!\n`
  );
  process.stdout.write(
    `You are currently in ${COLOR.yellow}${appEnv.currentPath}${COLOR.default}\n`
  );

  await parseCommand();
};
