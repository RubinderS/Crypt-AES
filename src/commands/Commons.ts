import {CLIArgsType, CryptConfigType} from '../types';
import {fileScanner} from 'utilities';
import * as fs from 'fs';
import * as path from 'path';

const extension = '.ncenc';
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
  const dirList: string[] = [];
  fileScanner(dir, true, (filePath: string, isDir: boolean) => {
    if (!isDir) {
      dirList.push(path.resolve(filePath));
    }
  });
  return dirList;
}

function getCryptConfig(cliArgs: CLIArgsType[]): CryptConfigType {
  const cryptConfig: CryptConfigType = {
    srcPath: '',
    pswrd: '',
    destPath: undefined,
    delSrc: true,
  };

  for (let i = 1; i < cliArgs.length; i++) {
    switch (cliArgs[i].option) {
      case CryptFlags.sourceS:
      case CryptFlags.sourceL:
        cryptConfig.srcPath = path.resolve(cliArgs[i].val);
        break;
      case CryptFlags.pswrdS:
      case CryptFlags.pswrdL:
        cryptConfig.pswrd = cliArgs[i].val;
        break;
      case CryptFlags.outputS:
      case CryptFlags.outputL:
        cryptConfig.destPath = path.resolve(cliArgs[i].val);
        break;
      case CryptFlags.keepS:
      case CryptFlags.keepL:
        cryptConfig.delSrc = false;
        break;
      default:
        process.stdout.write('Command Not Supported');
    }
  }
  return cryptConfig;
}

export {CryptFlags, getCryptConfig, getFilesList, extension, isDir};
