import { COLOR } from './constants.mjs';

export const calculateHash = (args) => {
  //TODO: Calculate hash for file and print it into console
  process.stdout.write(
    `Command is ${COLOR.yellow}hash:${COLOR.green}hash${COLOR.default}\n`
  );

  console.log(`Arguments: `, args);
};
