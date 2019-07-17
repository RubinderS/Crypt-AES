import * as path from 'path';
import * as fs from 'fs';
import {aes, mkdirIfNotExist} from 'utils';
import {CLIArgsType} from '../types';
import {getCryptConfig, getFilesList, extension, isDir} from './CommandUtils';

function encryptCmd(cliArgs: CLIArgsType[]): void {
  const {encrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  if (cryptConfig.srcPath === '' || cryptConfig.destPath === '') {
    console.log('Need to pass source path and password');
    console.log('See help');
    return;
  }

  cryptConfig.srcPath = path.normalize(cryptConfig.srcPath + path.sep).replace(/\\*$/g, '');
  const filesList = getFilesList(cryptConfig.srcPath);
  console.log(`Total files to be encrypted: ${filesList.length}\n`);

  filesList.forEach((filePath, index) => {
    let destFilePath = '';

    if (cryptConfig.destPath) {
      cryptConfig.destPath = path.normalize(cryptConfig.destPath + path.sep).replace(/\\*$/g, '');
      if (isDir(cryptConfig.srcPath)) {
        destFilePath =
          path.join(cryptConfig.destPath, filePath.replace(cryptConfig.srcPath, '')) + extension;
      } else {
        destFilePath = path.join(cryptConfig.destPath, path.basename(filePath)) + extension;
      }
    } else {
      destFilePath = filePath + extension;
    }

    mkdirIfNotExist(path.dirname(destFilePath));

    encrypt(filePath, destFilePath, cryptConfig.pswrd, (encryptedFilePath: string) => {
      console.log(`file ${index + 1} - ${path.basename(encryptedFilePath)} ecrypted`);
      if (cryptConfig.delSrc) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(`couldn't delete ${path.basename(filePath)}`);
            return;
          }
          console.log(`file ${path.basename(filePath)} deleted`);
        });
      }
    });
  });
}

export {encryptCmd};
