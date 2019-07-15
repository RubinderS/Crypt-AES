import {CLIArgsType} from '../types';
import {encrypt} from './Encrypt';
import {decryptCmd} from './Decrypt';

function processCommands(cliArgs: CLIArgsType[]): void {
  switch (cliArgs[0].option) {
    case 'enc':
    case 'encrypt':
      encrypt(cliArgs);
      break;
    case 'dec':
    case 'decrypt':
      decryptCmd(cliArgs);
      break;
  }
}

export {processCommands};
