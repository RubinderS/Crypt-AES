// import {aes} from 'utils';
import {processMainOptions} from './MainOptions';
import {CLIArgsType} from './types';
import {isOption} from './commands/Utils';

// const {encrypt, decrypt} = aes();

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

  // const cliOptions: ICLIOptionsType = {
  //   srcPath: '.',
  //   destPath: '.',
  //   pswrd: 'mypass',
  //   delSrc: false,
  //   needExt: true,
  // };
  // return cliOptions;
}

function main(): void {
  const cliArgs = getOptionsFromCLI();
  if (cliArgs.length !== 0) {
    isOption(cliArgs[0].option)
      ? processMainOptions(cliArgs)
      : processCommands(cliArgs);
  }
}

main();
