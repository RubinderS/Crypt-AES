import {aes, fileScanner, mkdirIfNotExist} from 'utils';
import {CryptConfigType, CLIArgsType} from '../types';
import * as path from 'path';

function getCryptConfig(cliArgs: CLIArgsType[]): CryptConfigType {
  const cryptConfig: CryptConfigType = {
    srcPath: '',
    pswrd: '',
    destPath: '',
    delSrc: false,
    noExt: false,
  };

  for (let i = 0; i < cliArgs.length; i++) {
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

function encrypt(cliArgs: CLIArgsType[]) {
  const {encrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  fileScanner(cryptConfig.srcPath, true, (srcFilePath: string, isDir: boolean) => {
    if (!isDir) {
      let destFilePath = '';
      if (cryptConfig.destPath) {
        destFilePath = path.join(cryptConfig.destPath, srcFilePath.replace(cryptConfig.srcPath, ''));
        if (!cryptConfig.noExt) {
          destFilePath += '.enc';
        }
        mkdirIfNotExist(path.dirname(destFilePath));
      } else {
        destFilePath = srcFilePath + '.enc';
      }
      encrypt(srcFilePath, destFilePath, cryptConfig.pswrd, (destPath: string) => {
        console.log(`file ${destPath} has been ecrypted successfuly`);
      });
    }
  });
}

function processCommands(cliArgs: CLIArgsType[]): void {
  switch (cliArgs[0].option) {
    case 'enc':
    case 'encrypt':
      encrypt(cliArgs);
      break;
    case 'dec':
    case 'decrypt':
      break;
  }
}

export {processCommands};
