import {CLIArgsType} from '../types';
import {getVersion} from './Version';
import {getHelp} from './Help';
import {RootFlags} from './Commons';

function processRootFlags(cliArgs: CLIArgsType[]): void {
  cliArgs.forEach((cliArg) => {
    switch (cliArg.option) {
      case RootFlags.versionS:
      case RootFlags.versionL:
        process.stdout.write(getVersion());
        break;
      case RootFlags.helpS:
      case RootFlags.helpL:
        process.stdout.write(getHelp());
        break;
      default:
        throw `${cliArg.option} is not a valid option`;
    }
  });
}

export {processRootFlags};
