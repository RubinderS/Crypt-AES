import * as fs from 'fs';
import * as path from 'path';

function fileScannerSync(
  dirPath: string,
  recursive: boolean,
  callback: (fullPath: string, isDirectory: boolean) => void,
): void {
  if (!fs.statSync(dirPath).isDirectory()) {
    callback(dirPath, false);
    return;
  }

  const dirList: string[] = fs.readdirSync(dirPath);

  dirList.forEach((item): void => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      if (recursive) {
        fileScannerSync(fullPath, recursive, callback);
      }
      callback(fullPath, true);
    } else {
      callback(fullPath, false);
    }
  });
}

function deleteSync(path: string): void {
  if (fs.existsSync(path)) {
    fileScannerSync(path, true, (srcFilePath, isDirectory): void => {
      if (!isDirectory) {
        fs.unlinkSync(srcFilePath);
      } else {
        if (fs.readdirSync(srcFilePath).length === 0) {
          fs.rmdirSync(srcFilePath);
        }
      }
    });
    /** if it was a file it would have already been deleted by now,
     * but for directories delete them now
     */
    if (fs.existsSync(path) && fs.readdirSync(path).length === 0) {
      fs.rmdirSync(path);
    }
  }
}

function createDirSync(destPath: string): void {
  destPath = path.normalize(destPath + path.sep);

  const dirs = destPath.split(path.sep);

  dirs.forEach((dir): void => {
    const regexAfterDir = new RegExp(`${dir}.*`);
    const middleDir = path.join(destPath.replace(regexAfterDir, ''), dir);

    if (!fs.existsSync(middleDir)) {
      fs.mkdirSync(middleDir);
    }
  });
}

export {deleteSync, fileScannerSync, createDirSync};
