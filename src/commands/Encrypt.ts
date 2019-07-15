import * as path from 'path';
import {aes, mkdirIfNotExist, deleteDirWithFiles} from 'utils';
import {CLIArgsType} from '../types';
import {getCryptConfig, getFilesList, extension} from './CommandUtils';

function encryptCmd(cliArgs: CLIArgsType[]): void {
  const {encrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  cryptConfig.srcPath = path.normalize(cryptConfig.srcPath + path.sep);
  const filesList = getFilesList(cryptConfig.srcPath);
  const filesEncryptedList: string[] = [];

  filesList.forEach((filePath, index) => {
    let destFilePath = '';

    if (cryptConfig.destPath) {
      cryptConfig.destPath = path.normalize(cryptConfig.destPath + path.sep);
      destFilePath =
        path.join(cryptConfig.destPath, filePath.replace(cryptConfig.srcPath, '')) + extension;
    } else {
      destFilePath = filePath + extension;
    }

    mkdirIfNotExist(path.dirname(destFilePath));

    encrypt(filePath, destFilePath, cryptConfig.pswrd, (encryptedFilePath: string) => {
      console.log(`File ${index} - ${encryptedFilePath} ecrypted successfuly`);
      filesEncryptedList.push(filePath);
      if (cryptConfig.delSrc && filesEncryptedList.length === filesList.length) {
        try {
          deleteDirWithFiles(cryptConfig.srcPath);
        } catch (e) {
          console.log(`Couldn't delete ${cryptConfig.srcPath}`);
        }
      }
    });
  });
}

export {encryptCmd};
