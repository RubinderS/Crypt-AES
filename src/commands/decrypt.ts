import * as path from 'path';
import * as fs from 'fs';
import {createDirSync} from '../fs';
import {aes} from '../crypt';
import {CLIArgsType, CryptAESConfig} from '../types';
import {getCryptConfig, getFilesList, extension, isDir} from './commons';

const {decryptFile} = aes();

function decrypt(cryptConfig: CryptAESConfig): void {
  if (cryptConfig.srcPath === '' || cryptConfig.pswrd === '') {
    process.stdout.write('Need to pass source path and password\n');
    process.stdout.write('See help\n\n');
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

    createDirSync(path.dirname(destFilePath));
    decryptFile(filePath, destFilePath, cryptConfig.pswrd, (decryptedFilePath: string) => {
      process.stdout.write(`File ${index + 1} Decrypted - ${path.basename(decryptedFilePath)}\n`);
      if (!cryptConfig.keepSrc) {
        fs.unlink(filePath, (err) => {
          if (err) {
            process.stdout.write(`Couldn't delete ${path.basename(filePath)}\n`);
            return;
          }
          process.stdout.write(`File ${index + 1} Deleted - ${path.basename(filePath)}\n`);
        });
      }
    });
  });
}

function decryptCmd(cliArgs: CLIArgsType[]): void {
  const cryptConfig = getCryptConfig(cliArgs);
  decrypt(cryptConfig);
}

export {decryptCmd, decrypt};
