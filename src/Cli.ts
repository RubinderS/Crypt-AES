// import {aes} from 'utils';
import {processMainOptions} from './ProcessMainOptions';
import {processCommands} from './commands';
import {CLIArgsType} from './types';
import {isOption} from './CliUtils';

function getOptionsFromCLI(): CLIArgsType[] {
  const cliArgs: CLIArgsType[] = [];

  for (let i = 2; i < process.argv.length; i++) {
    const cliArg: CLIArgsType = {
      option: '',
      val: '',
    };
    cliArg.option = process.argv[i];
    if (process.argv[i + 1] && !isOption(process.argv[i + 1])) {
      cliArg.val = process.argv[i + 1];
      i++;
    }
    cliArgs.push(cliArg);
  }

  return cliArgs;
}

function main(): void {
  const cliArgs = getOptionsFromCLI();
  if (cliArgs.length !== 0) {
    isOption(cliArgs[0].option) ? processMainOptions(cliArgs) : processCommands(cliArgs);
  }
}

main();
