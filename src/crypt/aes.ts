import * as fs from 'fs';
import * as zlib from 'zlib';
import {createHash, randomBytes, createCipheriv, createDecipheriv} from 'crypto';
import * as path from 'path';
import {Transform} from 'stream';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function aes() {
  class AppendInitVect extends Transform {
    private initVect: any;
    private appended: any;

    public constructor(initVect: any, opts?: any) {
      super(opts);
      this.initVect = initVect;
      this.appended = false;
    }

    public _transform(chunk: any, _encoding: any, cb: () => void): void {
      if (!this.appended) {
        this.push(this.initVect);
        this.appended = true;
      }
      this.push(chunk);
      cb();
    }
  }

  function getCipherKey(pswrd: string): Buffer {
    return createHash('sha256')
      .update(pswrd)
      .digest();
  }
  /**
   * encrypts the src file and copies it to dest
   * @param {string} srcFilePath
   * @param {string} destFilePath
   * @param {string} pswrd
   * @param {function} cbOnFinish
   */
  function encrypt(
    srcFilePath: string,
    destFilePath: string,
    pswrd: string,
    cbOnFinish: (destSafeFilePath: string) => void,
  ): void {
    srcFilePath = path.normalize(srcFilePath);
    destFilePath = path.normalize(destFilePath);
    const initVect = randomBytes(16);

    const CIPHER_KEY = getCipherKey(pswrd);
    const readStream = fs.createReadStream(srcFilePath);
    const gzip = zlib.createGzip();
    const cipher = createCipheriv('aes256', CIPHER_KEY, initVect);
    const appendInitVect = new AppendInitVect(initVect);
    const writeStream = fs.createWriteStream(destFilePath);
    writeStream.on('finish', () => {
      cbOnFinish(destFilePath);
    });
    readStream
      .pipe(gzip)
      .pipe(cipher)
      .pipe(appendInitVect)
      .pipe(writeStream);
  }

  /**
   * decrypts the src file and copies it to dest
   * @param {string} srcFilePath
   * @param {string} destFilePath
   * @param {string} pswrd
   * @param {function} cbOnFinish
   */
  function decrypt(
    srcFilePath: string,
    destFilePath: string,
    pswrd: string,
    cbOnFinish: (destFilePath: string) => void,
  ): void {
    srcFilePath = path.normalize(srcFilePath);
    destFilePath = path.normalize(destFilePath);
    // First, get the initialization vector from the file.
    const readInitVect = fs.createReadStream(srcFilePath, {start: 0, end: 15});

    let initVect: any;
    readInitVect.on('data', (chunk: any) => {
      initVect = chunk;
    });

    readInitVect.on('close', () => {
      const cipherKey = getCipherKey(pswrd);
      const readStream = fs.createReadStream(srcFilePath, {start: 16});
      const decipher = createDecipheriv('aes256', cipherKey, initVect);
      const unzip = zlib.createUnzip();
      const writeStream = fs.createWriteStream(destFilePath);
      writeStream.on('finish', () => {
        cbOnFinish(destFilePath);
      });
      readStream
        .pipe(decipher)
        .pipe(unzip)
        .pipe(writeStream);
    });
  }

  return {encrypt, decrypt};
}

export {aes};
