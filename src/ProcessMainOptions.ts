import {CLIArgsType} from './types';

function version(): string {
  return 'version';
}

function help(): string {
  return 'help';
}

function noArgs(): string {
  return help();
}

function processMainOptions(cliArgs: CLIArgsType[]): void {
  cliArgs.forEach((cliArg) => {
    switch (cliArg.option) {
      case '-v':
      case '--version':
        process.stdout.write(version());
        break;
      case '-h':
      case '--help':
        process.stdout.write(help());
        break;
      default:
        process.stdout.write('Command Not Supported');
    }
  });
}

function processNoArgs(): void {
  process.stdout.write(noArgs());
}

export {processMainOptions, processNoArgs, version, help, noArgs};
