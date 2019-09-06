import {CLIArgsType, CryptAESConfig} from '../types';
import {fileScannerSync} from '../fs';
import * as fs from 'fs';
import * as path from 'path';

const extension = '.caes';
const CryptFlags = {
  sourceS: '-s',
  sourceL: '--source',
  pswrdS: '-p',
  pswrdL: '--password',
  keepS: '-k',
  keepL: '--keep',
  outputS: '-o',
  outputL: '--output',
};

function isDir(path: string): boolean {
  return fs.statSync(path).isDirectory();
}

function getFilesList(dir: string): string[] {
  const filesList: string[] = [];
  fileScannerSync(dir, true, (filePath: string, isDir: boolean) => {
    if (!isDir) {
      filesList.push(path.resolve(filePath));
    }
  });
  return filesList;
}

function getCryptConfig(cliArgs: CLIArgsType[]): CryptAESConfig {
  const cryptConfig: CryptAESConfig = {
    srcPath: '',
    pswrd: '',
    destPath: null,
    keepSrc: false,
  };

  for (let i = 1; i < cliArgs.length; i++) {
    switch (cliArgs[i].option) {
      case CryptFlags.sourceS:
      case CryptFlags.sourceL:
        cryptConfig.srcPath = path.resolve(cliArgs[i].value);
        break;
      case CryptFlags.pswrdS:
      case CryptFlags.pswrdL:
        cryptConfig.pswrd = cliArgs[i].value;
        break;
      case CryptFlags.outputS:
      case CryptFlags.outputL:
        cryptConfig.destPath = path.resolve(cliArgs[i].value);
        break;
      case CryptFlags.keepS:
      case CryptFlags.keepL:
        cryptConfig.keepSrc = true;
        break;
      default:
        throw `${cliArgs[i].option} is not a valid option`;
    }
  }
  return cryptConfig;
}

export {CryptFlags, getCryptConfig, getFilesList, extension, isDir};
