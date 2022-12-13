import { COLOR } from './constants.mjs';

export const goToUpperDirectory = (args) => {
  //TODO: Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
  process.stdout.write(
    `Command is ${COLOR.yellow}navigation:${COLOR.green}up${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const goToDedicatedDirectory = (args) => {
  //TODO: Go to dedicated folder from current directory (path_to_directory can be relative or absolute)

  process.stdout.write(
    `Command is ${COLOR.yellow}navigation:${COLOR.green}cd${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const showFolderContent = (args) => {
  // TODO: Print in console list of all files and folders in current directory. List should contain
  // - list should contain files and folder names (for files - with extension)
  // - folders and files are sorted in alphabetical order ascending, but list of folders goes first
  // - type of directory content should be marked explicitly (e.g. as a corresponding column value)
  process.stdout.write(
    `Command is ${COLOR.yellow}navigation:${COLOR.green}ls${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};
