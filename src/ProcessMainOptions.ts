import {CLIArgsType} from './types';
// import {isOption} from './commands/Utils';

function version(): string {
  return 'version';
}

function help(): string {
  return 'help';
}

function processMainOptions(cliArgs: CLIArgsType[]): void {
  cliArgs.forEach((cliArg) => {
    switch (cliArg.option) {
      case '-v':
      case '--version':
        console.log(version());
        break;
      case '-h':
      case '--help':
        console.log(help());
        break;
      default:
        console.log('Command Not Supported');
    }
  });
}

export {processMainOptions, version, help};
