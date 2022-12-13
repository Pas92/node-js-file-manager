import { COLOR } from './constants.mjs';

export const printFile = (args) => {
  //TODO: Read file and print it's content in console (should be done using Readable stream)
  process.stdout.write(
    `Command is ${COLOR.yellow}file-actions:${COLOR.green}cat${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const createEmptyFile = (args) => {
  //TODO: Create empty file in current working directory
  process.stdout.write(
    `Command is ${COLOR.yellow}file-actions:${COLOR.green}add${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const renameFile = (args) => {
  //TODO: Rename file (content should remain unchanged)
  process.stdout.write(
    `Command is ${COLOR.yellow}file-actions:${COLOR.green}rn${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const copyFile = (args) => {
  //TODO: Copy file (should be done using Readable and Writable streams)
  process.stdout.write(
    `Command is ${COLOR.yellow}file-actions:${COLOR.green}cp${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const moveFile = (args) => {
  //TODO: Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams)
  process.stdout.write(
    `Command is ${COLOR.yellow}file-actions:${COLOR.green}mv${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const deleteFile = (args) => {
  //TODO: Delete file
  process.stdout.write(
    `Command is ${COLOR.yellow}file-actions:${COLOR.green}rm${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};
