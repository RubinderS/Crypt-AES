import * as path from 'path';
import * as fs from 'fs';
import {aes, mkdirIfNotExist} from 'utils';
import {CLIArgsType} from '../types';
import {getCryptConfig, getFilesList, extension, isDir} from './CommandUtils';

function decryptCmd(cliArgs: CLIArgsType[]): void {
  const {decrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  cryptConfig.srcPath = path.normalize(cryptConfig.srcPath + path.sep).replace(/\\*$/g, '');
  const filesList = getFilesList(cryptConfig.srcPath).filter((filePath) => {
    return path.extname(filePath) === extension;
  });
  console.log(`Total files to be decrypted: ${filesList.length}\n`);

  filesList.forEach((filePath, index) => {
    const extRegex = new RegExp(`${extension}$`, 'g');
    let destFilePath = '';

    if (cryptConfig.destPath) {
      cryptConfig.destPath = path.normalize(cryptConfig.destPath + path.sep).replace(/\\*$/g, '');
      if (isDir(cryptConfig.srcPath)) {
        destFilePath = path
          .join(cryptConfig.destPath, filePath.replace(cryptConfig.srcPath, ''))
          .replace(extRegex, '');
      } else {
        destFilePath = path.join(
          cryptConfig.destPath,
          path.basename(filePath).replace(extRegex, ''),
        );
      }
    } else {
      destFilePath = filePath.replace(extRegex, '');
    }

    mkdirIfNotExist(path.dirname(destFilePath));

    decrypt(filePath, destFilePath, cryptConfig.pswrd, (decryptedFilePath: string) => {
      console.log(`file ${index + 1} - ${path.basename(decryptedFilePath)} decrypted successfuly`);
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

export {decryptCmd};
