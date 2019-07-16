import {CLIArgsType, CryptConfigType} from '../types';
import {fileScanner} from 'utils';
import * as fs from 'fs';

const extension = '.enc';

function isDir(path: string): boolean {
  return fs.statSync(path).isDirectory();
}

function getFilesList(dir: string): string[] {
  const dirList: string[] = [];
  fileScanner(dir, true, (filePath: string, isDir: boolean) => {
    if (!isDir) {
      dirList.push(filePath);
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
    noExt: false,
  };

  for (let i = 1; i < cliArgs.length; i++) {
    switch (cliArgs[i].option) {
      case '-s':
      case '--source':
        cryptConfig.srcPath = cliArgs[i].val;
        break;
      case '-p':
      case '--password':
        cryptConfig.pswrd = cliArgs[i].val;
        break;
      case '-out':
      case '--output':
        cryptConfig.destPath = cliArgs[i].val;
        break;
      case '-d':
      case '--delfiles':
        cryptConfig.delSrc = true;
        break;
      case '-ne':
      case '--noextension':
        cryptConfig.noExt = true;
        break;
      default:
        throw 'Command Not Supported';
    }
  }
  return cryptConfig;
}

export {getCryptConfig, getFilesList, extension, isDir};
