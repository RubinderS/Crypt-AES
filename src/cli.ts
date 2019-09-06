#!/usr/bin/env node
import {processRootFlags, getHelp} from './root_flags';
import {processCommands} from './commands';
import {CLIArgsType} from './types';

function isOption(option: string): boolean {
  return option.charAt(0) === '-';
}

function parseCLIArgs(args: string[]): CLIArgsType[] {
  const cliArgs: CLIArgsType[] = [];
  for (let i = 0; i < args.length; i++) {
    const cliArg: CLIArgsType = {
      option: '',
      value: '',
    };

    cliArg.option = args[i];
    if (args[i + 1] && !isOption(args[i + 1])) {
      cliArg.value = args[i + 1];
      i++;
    }

    cliArgs.push(cliArg);
  }

  return cliArgs;
}

function main(): void {
  const cliArgs = parseCLIArgs(process.argv.slice(2));
  if (cliArgs.length !== 0) {
    try {
      isOption(cliArgs[0].option) ? processRootFlags(cliArgs) : processCommands(cliArgs);
    } catch (e) {
      process.stdout.write(`An exception has occurred:\n${e}\n\n`);
    }
  } else {
    process.stdout.write(getHelp());
  }
}

main();
