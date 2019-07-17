import {CLIArgsType} from './types';
// import {isOption} from './commands/Utils';

function version(): void {
  console.log('version');
}

function help(): void {
  console.log('help');
}

function processMainOptions(cliArgs: CLIArgsType[]): void {
  cliArgs.forEach((cliArg) => {
    switch (cliArg.option) {
      case '-v':
      case '--version':
        version();
        break;
      case '-h':
      case '--help':
        help();
        break;
      default:
        console.log('Command Not Supported');
    }
  });
}

export {processMainOptions};
