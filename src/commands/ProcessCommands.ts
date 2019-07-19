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
      process.stdout.write('Command Not Supported');
  }
}

export {processCommands};
