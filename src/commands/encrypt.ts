import * as path from 'path';
import * as fs from 'fs';
import {createDirSync} from '../fs';
import {aes} from '../crypt';
import {CLIArgsType, NodeCryptConfig} from '../types';
import {getCryptConfig, getFilesList, extension, isDir} from './commons';

const {encryptFile} = aes();

function ncEncrypt(cryptConfig: NodeCryptConfig): void {
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

    createDirSync(path.dirname(destFilePath));
    encryptFile(filePath, destFilePath, cryptConfig.pswrd, (encryptedFilePath: string) => {
      process.stdout.write(`file ${index + 1} - ${path.basename(encryptedFilePath)} ecrypted\n`);
      if (!cryptConfig.keepSrc) {
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

function encryptCmd(cliArgs: CLIArgsType[]): void {
  const cryptConfig = getCryptConfig(cliArgs);
  ncEncrypt(cryptConfig);
}

export {encryptCmd, ncEncrypt};
