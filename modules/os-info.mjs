import { COLOR } from './constants.mjs';
import { INVALID_INPUT } from './app-errors-handler.mjs';

import * as os from 'node:os';

export const getOsInfo = (args) => {
  // Operating system info (prints following information in console)
  process.stdout.write(
    `Command is ${COLOR.yellow}os-info:${COLOR.green}os${COLOR.default}\n`
  );

  showInfo(args[0]);
};

const showInfo = (arg) => {
  switch (arg) {
    // Get EOL (default system End-Of-Line) and print it to console
    case '--EOL':
      console.dir(os.EOL);
      break;
    // Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
    case '--cpus':
      const cpus = os.cpus();
      const printableString = `${os.cpus().length} cores of ${
        os.cpus()[0].model
      }`;
      console.log(`${COLOR.yellow}${printableString}${COLOR.default}`);
      break;
    // Get home directory and print it to console
    case '--homedir':
      console.log(`${COLOR.yellow}${os.homedir()}${COLOR.default}`);
      break;
    // Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console
    case '--username':
      console.log(`${COLOR.yellow}${os.hostname()}${COLOR.default}`);
      break;
    // Get CPU architecture for which Node.js binary has compiled and print it to console
    case '--architecture':
      console.log(`${COLOR.yellow}${os.arch()}${COLOR.default}`);
      break;
    default:
      console.log(INVALID_INPUT);
  }
};
