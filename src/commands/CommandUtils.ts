import {CLIArgsType, CryptConfigType} from '../types';
import {fileScanner} from 'utils';
import * as fs from 'fs';
import * as path from 'path';

const extension = '.ncenc';

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
    delSrc: false,
  };

  for (let i = 1; i < cliArgs.length; i++) {
    switch (cliArgs[i].option) {
      case '-s':
      case '--source':
        cryptConfig.srcPath = path.resolve(cliArgs[i].val);
        break;
      case '-p':
      case '--password':
        cryptConfig.pswrd = cliArgs[i].val;
        break;
      case '-o':
      case '--output':
        cryptConfig.destPath = path.resolve(cliArgs[i].val);
        break;
      case '-d':
      case '--delete':
        cryptConfig.delSrc = true;
        break;
      default:
        console.log('Command Not Supported');
    }
  }
  return cryptConfig;
}

export {getCryptConfig, getFilesList, extension, isDir};
