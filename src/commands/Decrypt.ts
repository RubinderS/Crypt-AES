import * as path from 'path';
import {aes, mkdirIfNotExist, deleteDirWithFiles} from 'utils';
import {CLIArgsType} from '../types';
import {getCryptConfig, getFilesList, extension} from './CommandUtils';

function decryptCmd(cliArgs: CLIArgsType[]): void {
  const {decrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  cryptConfig.srcPath = path.normalize(cryptConfig.srcPath + path.sep).replace(/\\*$/g, '');
  const filesList = getFilesList(cryptConfig.srcPath);

  filesList.forEach((filePath, index) => {
    if (path.extname(filePath) === extension) {
      const extRegex = new RegExp(`${extension}$`, 'g');
      let destFilePath = '';

      if (cryptConfig.destPath) {
        cryptConfig.destPath = path.normalize(cryptConfig.destPath + path.sep).replace(/\\*$/g, '');
        destFilePath = path
          .join(cryptConfig.destPath, filePath.replace(cryptConfig.srcPath, ''))
          .replace(extRegex, '');
      } else {
        destFilePath = filePath.replace(extRegex, '');
      }

      mkdirIfNotExist(path.dirname(destFilePath));

      decrypt(filePath, destFilePath, cryptConfig.pswrd, (decryptedFilePath: string) => {
        console.log(`File ${index+1} - ${decryptedFilePath} decrypted successfuly`);
        if (cryptConfig.delSrc) {
          try {
            deleteDirWithFiles(decryptedFilePath);
          } catch (e) {
            console.log(`Couldn't delete file ${path.basename(decryptedFilePath)}`);
          }
        }
      });
    }
  });
}

export {decryptCmd};
