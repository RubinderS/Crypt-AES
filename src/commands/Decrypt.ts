import * as path from 'path';
import * as fs from 'fs';
import {aes, mkdirIfNotExist} from 'utilities';
import {CLIArgsType} from '../types';
import {getCryptConfig, getFilesList, extension, isDir} from './Commons';

function decryptCmd(cliArgs: CLIArgsType[]): void {
  const {decrypt} = aes();
  const cryptConfig = getCryptConfig(cliArgs);
  if (cryptConfig.srcPath === '' || cryptConfig.destPath === '') {
    process.stdout.write('Need to pass source path and password');
    process.stdout.write('See help');
    return;
  }

  const filesList = getFilesList(cryptConfig.srcPath).filter((filePath) => {
    return path.extname(filePath) === extension;
  });

  process.stdout.write(`Total files to be decrypted: ${filesList.length}\n\n`);
  filesList.forEach((filePath, index) => {
    const extRegex = new RegExp(`${extension}$`, 'g');
    let destFilePath = '';

    if (cryptConfig.destPath) {
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
      process.stdout.write(
        `file ${index + 1} - ${path.basename(decryptedFilePath)} decrypted successfuly\n`,
      );
      if (cryptConfig.delSrc) {
        fs.unlink(filePath, (err) => {
          if (err) {
            process.stdout.write(`couldn't delete ${path.basename(filePath)}`);
            return;
          }
          process.stdout.write(`file ${index + 1} - ${path.basename(filePath)} deleted`);
        });
      }
    });
  });
}

export {decryptCmd};
