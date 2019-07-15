import {CLIArgsType} from '../types';
import {encrypt} from './Encrypt';

function processCommands(cliArgs: CLIArgsType[]): void {
  switch (cliArgs[0].option) {
    case 'enc':
    case 'encrypt':
      encrypt(cliArgs);
      break;
    case 'dec':
    case 'decrypt':
      break;
  }
}

export {processCommands};
