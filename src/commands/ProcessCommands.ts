import {CLIArgsType} from '../types';
import {encryptCmd} from './Encrypt';
import {decryptCmd} from './Decrypt';

function processCommands(cliArgs: CLIArgsType[]): void {
  switch (cliArgs[0].option) {
    case 'enc':
    case 'encrypt':
      encryptCmd(cliArgs);
      break;
    case 'dec':
    case 'decrypt':
      decryptCmd(cliArgs);
      break;
    default:
      throw `${cliArgs[0].option} is not a valid command`;
  }
}

export {processCommands};
