import * as path from 'path';
import * as fs from 'fs';
import {aes, mkdirIfNotExist} from 'utils';
import {CLIArgsType} from '../types';
import {getCryptConfig, getFilesList, extension, isDir} from './CommandUtils';

function encryptCmd(cliArgs: CLIArgsType[]): void {
  const {encrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  if (cryptConfig.srcPath === '' || cryptConfig.destPath === '') {
    process.stdout.write('Need to pass source path and password');
    process.stdout.write('See help');
    return;
  }

  cryptConfig.srcPath = path.normalize(cryptConfig.srcPath + path.sep).replace(/\\*$/g, '');
  const filesList = getFilesList(cryptConfig.srcPath).filter((filePath) => {
    return path.extname(filePath) !== extension;
  });
  process.stdout.write(`Total files to be encrypted: ${filesList.length}\n`);

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
      process.stdout.write(`file ${index + 1} - ${path.basename(encryptedFilePath)} ecrypted`);
      if (cryptConfig.delSrc) {
        fs.unlink(filePath, (err) => {
          if (err) {
            process.stdout.write(`couldn't delete ${path.basename(filePath)}`);
            return;
          }
          process.stdout.write(`file ${path.basename(filePath)} deleted`);
        });
      }
    });
  });
}

export {encryptCmd};
