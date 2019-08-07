import {execSync} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function waitSync(time: number): void {
  const currTime = new Date().getTime();
  while (new Date().getTime() - currTime <= time) {
    //
  }
}

function cmd(command: string): string {
  let out = '';
  try {
    out = String(execSync(command));
  } catch (e) {
    console.log('An error had occurred while processing the command');
  }
  return out;
}

const env = `node`;
const encoding = `utf-8`;
const cliPath = 'build/Cli';
const pswrd = `"P@$WR|)"`;
const data = `The quick brown fox jumps over the lazy dog`;

const dirs = {
  rootDir: `testDir`,
  encDir: `testDir/encrypted`,
  decDir: `testDir/decrypted`,
  emptyDir: `testDir/emptyDir`,
  dir1: `testDir/dir1`,
  subDir1: `testDir/dir1/dir1SubDir1`,

  fileRootDir: `testDir/root.txt`,
  fileBlankRootDir: `testDir/blank.txt`,
  fileSubDir1: `testDir/dir1/dir1SubDir1/dir1SubDir1.txt`,
  fileDir1: `testDir/dir1/dir1.txt`,
};

function setupFileTests(): void {
  fs.mkdirSync(dirs.rootDir);
  fs.mkdirSync(dirs.dir1);
  fs.mkdirSync(dirs.subDir1);
  fs.mkdirSync(dirs.emptyDir);
  fs.writeFileSync(dirs.fileRootDir, data, encoding);
  fs.writeFileSync(dirs.fileBlankRootDir, '', encoding);
  fs.writeFileSync(dirs.fileDir1, data, encoding);
  fs.writeFileSync(dirs.fileSubDir1, data, encoding);
}

function setupFolderTests(): void {
  fs.mkdirSync(dirs.rootDir);
  fs.mkdirSync(dirs.dir1);
  fs.mkdirSync(dirs.subDir1);
  fs.mkdirSync(dirs.emptyDir);
  fs.writeFileSync(dirs.fileRootDir, data, encoding);
  fs.writeFileSync(dirs.fileDir1, data, encoding);
  fs.writeFileSync(dirs.fileSubDir1, data, encoding);
}

const rootFiles = [
  `testDir/dir1/dir1SubDir1/dir1SubDir1.txt`,
  `testDir/root.txt`,
  `testDir/dir1/dir1.txt`,
];

const encFiles = [
  `testDir/${path.basename(dirs.encDir)}/dir1/dir1SubDir1/dir1SubDir1.txt`,
  `testDir/${path.basename(dirs.encDir)}/root.txt`,
  `testDir/${path.basename(dirs.encDir)}/dir1/dir1.txt`,
];

const decFiles = [
  `testDir/${path.basename(dirs.decDir)}/dir1/dir1SubDir1/dir1SubDir1.txt`,
  `testDir/${path.basename(dirs.decDir)}/root.txt`,
  `testDir/${path.basename(dirs.decDir)}/dir1/dir1.txt`,
];

export {
  waitSync,
  cmd,
  env,
  encoding,
  cliPath,
  pswrd,
  data,
  dirs,
  setupFileTests,
  setupFolderTests,
  rootFiles,
  encFiles,
  decFiles,
};
