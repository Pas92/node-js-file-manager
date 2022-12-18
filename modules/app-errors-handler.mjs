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

export const INVALID_INPUT = `${COLOR.red}Invalid input!${COLOR.default}`;
export const INVALID_INPUT_PATH = `${COLOR.red}Invalid input! Path is not exist${COLOR.default}`;
export const OPERATION_FAILED = `${COLOR.red}Operation failed!${COLOR.default}`;
export const FILE_IS_NOT_EXIST = `${COLOR.red}File is not exist!${COLOR.default}`;
export const FILE_NOT_FOUND = `${COLOR.red}Operation failed! The file is not found!${COLOR.default}`;
export const FILE_IS_ALREADY_EXIST = `${COLOR.red}Operation failed! The file is already exist!${COLOR.default}`;
