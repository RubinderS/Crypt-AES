import * as path from 'path';
import * as fs from 'fs';
import {aes, createDir} from 'utilities';
import {CLIArgsType} from '../types';
import {getCryptConfig, getFilesList, extension, isDir} from './Commons';

function encryptCmd(cliArgs: CLIArgsType[]): void {
  const {encrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  if (cryptConfig.srcPath === '' || cryptConfig.destPath === '') {
    process.stdout.write('Need to pass source path and password\n');
    process.stdout.write('See help\n');
    return;
  }

  const filesList = getFilesList(cryptConfig.srcPath).filter((filePath) => {
    return path.extname(filePath) !== extension;
  });
  
  process.stdout.write(`Total files to be encrypted: ${filesList.length}\n\n`);
  filesList.forEach((filePath, index) => {
    let destFilePath = '';
    if (cryptConfig.destPath) {
      if (isDir(cryptConfig.srcPath)) {
        destFilePath =
          path.join(cryptConfig.destPath, filePath.replace(cryptConfig.srcPath, '')) + extension;
      } else {
        destFilePath = path.join(cryptConfig.destPath, path.basename(filePath)) + extension;
      }
    } else {
      destFilePath = filePath + extension;
    }

    createDir(path.dirname(destFilePath));
    encrypt(filePath, destFilePath, cryptConfig.pswrd, (encryptedFilePath: string) => {
      process.stdout.write(`file ${index + 1} - ${path.basename(encryptedFilePath)} ecrypted\n`);
      if (cryptConfig.delSrc) {
        fs.unlink(filePath, (err) => {
          if (err) {
            process.stdout.write(`couldn't delete ${path.basename(filePath)}\n`);
            return;
          }
          process.stdout.write(`file ${index + 1} - ${path.basename(filePath)} deleted\n`);
        });
      }
    });
  });
}

export {encryptCmd};
