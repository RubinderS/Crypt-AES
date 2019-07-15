import {ICLIArgsType, IMainOptionsType} from './types';
// import {isOption} from './commands/Utils';

function version(): void {
  console.log('version');
}

function help(): void {
  console.log('help');
}

const mainOptions: IMainOptionsType = {
  '--version': version,
  '-v': version,
  '--help': help,
  '-h': help,
};

function processMainOptions(cliArgs: ICLIArgsType[]): void {
  cliArgs.forEach((cliArg) => {
    if (mainOptions[cliArg.option]) {
      mainOptions[cliArg.option]();
    } else {
      throw 'Command Not Supported';
    }
  });
}

export {processMainOptions};
