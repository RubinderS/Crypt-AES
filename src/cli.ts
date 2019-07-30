#!/usr/bin/env node

/**
 * ███╗   ██╗ ██████╗ ██████╗ ███████╗     ██████╗██████╗ ██╗   ██╗██████╗ ████████╗
 * ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝
 * ██╔██╗ ██║██║   ██║██║  ██║█████╗█████╗██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║
 * ██║╚██╗██║██║   ██║██║  ██║██╔══╝╚════╝██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║
 * ██║ ╚████║╚██████╔╝██████╔╝███████╗    ╚██████╗██║  ██║   ██║   ██║        ██║
 * ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝
 *
 *
 */

import {processRootFlags, getHelp} from './root_flags';
import {processCommands} from './commands';
import {CLIArgsType} from './types';

function isOption(option: string): boolean {
  return option.charAt(0) === '-';
}

function getCLIArgs(args: string[]): CLIArgsType[] {
  const cliArgs: CLIArgsType[] = [];
  for (let i = 2; i < args.length; i++) {
    const cliArg: CLIArgsType = {
      option: '',
      val: '',
    };
    cliArg.option = args[i];
    if (args[i + 1] && !isOption(args[i + 1])) {
      cliArg.val = args[i + 1];
      i++;
    }
    cliArgs.push(cliArg);
  }

  return cliArgs;
}

function main(): void {
  const cliArgs = getCLIArgs(process.argv);
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
