import {execSync} from 'child_process';
import {extension} from '../commands/CommandUtils';
import * as fs from 'fs';

function cmd(command: string): string {
  let out = '';
  try {
    out = String(execSync(command));
  } catch (e) {
    console.log('An error had occurred while processing the command');
  }
  return out;
}

function checkAll(config: {paths: string[]; exists: boolean; ext: boolean}): boolean {
  let result = true;
  config.paths.forEach((path) => {
    path += config.ext ? extension : '';
    if (config.exists !== fs.existsSync(path)) {
      result = false;
    }
  });
  return result;
}

const env = `node`;
const cliPath = 'build/Cli';
const pswrd = `"P@$WR|)"`;

const dirs = {
  rootDir: `testDir`,
  encDir: `testDir/encrypted`,
  decDir: `testDir/decrypted`,
  emptyDir: `testDir/emptyDir`,
  dir1: `testDir/dir1`,
  subDir1: `testDir/dir1/dir1SubDir1`,

  fileBlankRootDir: `testDir/blank.txt`,
  fileSubDir1: `testDir/dir1/dir1SubDir1/dir1SubDir1.txt`,
  fileRootDir: `testDir/root.txt`,
  fileDir1: `testDir/dir1/dir1.txt`,
};

const encPaths = [
  `testDir/${dirs.encDir}`,
  `testDir/${dirs.encDir}/encrypted`,
  `testDir/${dirs.encDir}/decrypted`,
  `testDir/${dirs.encDir}/emptyDir`,
  `testDir/${dirs.encDir}/dir1`,
  `testDir/${dirs.encDir}/dir1/dir1SubDir1`,

  `testDir/${dirs.encDir}/blank.txt`,
  `testDir/${dirs.encDir}/dir1/dir1SubDir1/dir1SubDir1.txt`,
  `testDir/${dirs.encDir}/root.txt`,
  `testDir/${dirs.encDir}/dir1/dir1.txt`,
];

const decPaths = [
  `testDir/${dirs.decDir}`,
  `testDir/${dirs.decDir}/encrypted`,
  `testDir/${dirs.decDir}/decrypted`,
  `testDir/${dirs.decDir}/emptyDir`,
  `testDir/${dirs.decDir}/dir1`,
  `testDir/${dirs.decDir}/dir1/dir1SubDir1`,

  `testDir/${dirs.decDir}/blank.txt`,
  `testDir/${dirs.decDir}/dir1/dir1SubDir1/dir1SubDir1.txt`,
  `testDir/${dirs.decDir}/root.txt`,
  `testDir/${dirs.decDir}/dir1/dir1.txt`,
];

export {cmd, checkAll, env, cliPath, pswrd, dirs, encPaths, decPaths};
