import { COLOR } from './constants.mjs';

export const compress = (args) => {
  //TODO: Compress file (using Brotli algorithm, should be done using Streams API)
  process.stdout.write(
    `Command is ${COLOR.yellow}zip:${COLOR.green}compress${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};

export const decompress = (args) => {
  //TODO: Decompress file (using Brotli algorithm, should be done using Streams API)
  process.stdout.write(
    `Command is ${COLOR.yellow}zip:${COLOR.green}decompress${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};
