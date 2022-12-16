import { COLOR } from './constants.mjs';

export const isCommandWithoutArgs = (args) => {
  if (args.length) {
    console.log(
      `${COLOR.red}Invalid input! This command shouldn't have any arguments${COLOR.default}`
    );
    return false;
  }

  return true;
};

export const hasOneArgument = (args) => {
  if (args.length !== 1) {
    console.log(
      `${COLOR.red}Invalid input! This command should have only one argument${COLOR.default}`
    );
    return false;
  }

  return true;
};

export const hasTwoArgument = (args) => {
  if (args.length !== 2) {
    console.log(
      `${COLOR.red}Invalid input! This command should have two argument${COLOR.default}`
    );
    return false;
  }

  return true;
};

export const FILE_NOT_FOUND = `${COLOR.red}Operation failed! The file is not found!${COLOR.default}`;
