import {CLIArgsType, MainCommandsType} from './types';

const mainCommands: MainCommandsType = {
  encrypt: () => {},
};

function processCommands(cliArgs: CLIArgsType[]): void {
  switch (cliArgs[0].option) {
    case 'enc':
    case 'encrypt':
      break;
    case 'dec':
    case 'decrypt':
      break;
  }
}

export {processCommands};
