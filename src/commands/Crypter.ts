#!/usr/bin/env node

/**
 * encrypt
 * -s <filename or dirname>
 * -p <password>
 * -d(optional delete the files after finish)
 * -noext(optional don't add enc extension and keep the original file name)
 * -out (optional ) <output directory>
 *
 * decrypt
 * -s <filename or dirname>
 * -p <password>
 * -d(optional delete the files after finish)
 * -noext(optional check for any file instead of just the -noext files)
 * -out
 *
 */

// import aes from '../../crypto/AES';
// const encrypt = aes().encrypt;

// interface ICLIOptionsType {
//   src: string;
//   dest: string;
//   pswrd: string;
//   delSrc: boolean;
//   needExt: boolean;
// }

/**
 * Encrypts the contents of a folder and saves the encrypted files to another location
 * @param {string} pswrd password
 * @param {string} srcFolder path to src folder whose contents need to be encrypted
 * @param {string} destFolder path to dest folder where the encrypted files needs to be saved
 * @param {boolean} isDelSrc delete the contents of src folder after encryption
 */
// function encrypt(srcFolder, destFolder, pswrd, isDelSrc) {
//   srcFolder = path.normalize(srcFolder + path.sep);
//   destFolder = path.normalize(destFolder + path.sep);

//   fileScanner(srcFolder, true, (srcFilePath, isDirectory) => {
//     if (!isDirectory) {
//       const destFilePath = destFolder + srcFilePath.replace(srcFolder, '');
//       mkdirIfNotExist(path.dirname(destFilePath));

//       encrypt(srcFilePath, destFilePath, pswrd, (destSafeFilePath) => {
//         console.log(`Encrypted: ${destSafeFilePath}`);
//         if (isDelSrc) {
//           fs.unlinkSync(srcFilePath);
//           let srcFileDirName = path.dirname(srcFilePath);
//           srcFileDirName = path.normalize(srcFileDirName + path.sep);
//           // trace back to source folder and delete any empty parent dirs
//           while (srcFileDirName !== srcFolder) {
//             if (fs.readdirSync(srcFileDirName).length === 0) {
//               fs.rmdirSync(srcFileDirName);
//             }
//             srcFileDirName = path.dirname(srcFileDirName);
//             srcFileDirName = path.normalize(srcFileDirName + path.sep);
//           }
//         }
//       });
//     } else {
//       if (isDelSrc) {
//         if (fs.readdirSync(srcFilePath).length === 0) {
//           fs.rmdirSync(srcFilePath);
//         }
//       }
//     }
//   });
// }

function getOptionsFromCLI(): void {
  return {
    src: '.',
    dest: '.',
    pswrd: 'mypass',
    delSrc: false,
    needExt: true,
  };
}

// function main() {
//   const options = getOptionsFromCLI();
//   Object.freeze(options);
//   encrypt(options);

// }

// module.exports = safe;

export {getOptionsFromCLI};
