const util = require('util');
const {deleteAll} = require('utils');
const fs = require('fs');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const {version, help, noArgs} = require('../build/ProcessMainOptions');
const {extension} = require('../build/commands/CommandUtils');
const env = `node`;
const cliPath = 'build/Cli';
const pswrd = `"P@$WR|)"`;
const dirs = {
  rootDir: `testDir`,
  dir1: `dir1`,
  subDir1: `dir1SubDir1`,
  emptyDir: `emptyDir`,
  fileDir1: `dir1.txt`,
  fileSubDir1: `dir1SubDir1.txt`,
  fileRoot: `root.txt`,
  outPathEnc: `encrypted`,
  outPathDec: `decrypted`,
  fileBlank: `blank.txt`,
};
const data = `The quick brown fox jumps over the lazy dog`;
const encoding = `utf-8`;

async function cmd(command) {
  const {stdout, stderr} = await exec(command);
  if (stderr) {
    throw 'Error: ' + stderr;
  }
  return stdout;
}

function setup() {
  fs.mkdirSync(path.join(dirs.rootDir));
  fs.mkdirSync(path.join(dirs.rootDir, dirs.dir1));
  fs.mkdirSync(path.join(dirs.rootDir, dirs.dir1, dirs.subDir1));
  fs.mkdirSync(path.join(dirs.rootDir, dirs.emptyDir));
  fs.writeFileSync(path.join(dirs.rootDir, dirs.dir1, dirs.fileDir1), data, encoding);
  fs.writeFileSync(
    path.join(dirs.rootDir, dirs.dir1, dirs.subDir1, dirs.fileSubDir1),
    data,
    encoding,
  );
  fs.writeFileSync(path.join(dirs.rootDir, dirs.fileRoot), data, encoding);
  fs.writeFileSync(path.join(dirs.rootDir, dirs.fileBlank), '', encoding);
}

beforeAll(() => {
  deleteAll(dirs.rootDir);
});

setup();
// describe('No Args', () => {
//   test('No Args', async () => {
//     const output = await cmd(`${env} ${cliPath}`);
//     expect(output).toBe(noArgs());
//   });
// });
//
// describe('Main Options', () => {
//   test('Version - Short Command', async () => {
//     const output = await cmd(`${env} ${cliPath} -v`);
//     expect(output).toBe(version());
//   });

//   test('Version - Long Command', async () => {
//     const output = await cmd(`${env} ${cliPath} --version`);
//     expect(output).toBe(version());
//   });

//   test('Help - Short Command', async () => {
//     const output = await cmd(`${env} ${cliPath} -h`);
//     expect(output).toBe(help());
//   });

//   test('Help - Long Command', async () => {
//     const output = await cmd(`${env} ${cliPath} --help`);
//     expect(output).toBe(help());
//   });
// });

// describe('Crypt Commands', () => {
//   beforeEach(() => {
//     setup();
//   });

//   afterEach(() => {
//     deleteAll(dirs.rootDir);
//   });

//   test('File - no flags - short commands', async () => {
//     await cmd(`${env} ${cliPath} enc -s ${dirs.fileRoot} -p ${pswrd}`);
//     expect(fs.existsSync(`${dirs.fileRoot}`)).toBe(false);
//     expect(fs.existsSync(`${dirs.fileRoot}${extension}`)).toBe(true);

//     await cmd(`${env} ${cliPath} dec -s ${dirs.fileRoot}${extension} -p ${pswrd}`);
//     expect(fs.existsSync(`${dirs.fileRoot}`)).toBe(true);
//     expect(fs.existsSync(`${dirs.fileRoot}${extension}`)).toBe(false);
//     expect(fs.readFileSync(`${dirs.fileRoot}`, encoding)).toBe(data);
//   });

//   test('File - keep flag - short commands', async () => {
//     await cmd(`${env} ${cliPath} enc -s ${dirs.fileRoot} -p ${pswrd} -k`);
//     expect(fs.existsSync(`${dirs.fileRoot}`)).toBe(true);
//     expect(fs.existsSync(`${dirs.fileRoot}${extension}`)).toBe(true);

//     deleteAll(dirs.fileRoot);

//     await cmd(`${env} ${cliPath} dec -s ${dirs.fileRoot}${extension} -p ${pswrd} -k`);
//     expect(fs.existsSync(`${dirs.fileRoot}`)).toBe(true);
//     expect(fs.existsSync(`${dirs.fileRoot}${extension}`)).toBe(true);
//     expect(fs.readFileSync(`${dirs.fileRoot}`, encoding)).toBe(data);
//   });

//   test('File - out flag - long commands', async () => {
//     await cmd(
//       `${env} ${cliPath} encrypt --source ${dirs.fileRoot} --password ${pswrd} --output ${outPathEnc}`,
//     );
//     expect(fs.existsSync(`${dirs.fileRoot}`)).toBe(false);
//     expect(fs.existsSync(`${dirs.fileRoot}${extension}`)).toBe(false);
//     expect(fs.existsSync(`${outPathEnc}/${path.basename(dirs.fileRoot)}${extension}`)).toBe(true);

//     await cmd(
//       `${env} ${cliPath} dec -s ${outPathEnc}/${dirs.fileRoot}${extension} -p ${pswrd} --output ${outPathDec}`,
//     );
//     expect(fs.existsSync(`${outPathEnc}/${dirs.fileRoot}`)).toBe(false);
//     expect(fs.existsSync(`${outPathEnc}/${dirs.fileRoot}${extension}`)).toBe(true);
//     expect(fs.existsSync(`${outPathDec}/${dirs.fileRoot}`)).toBe(true);
//     expect(fs.readFileSync(`${outPathDec}/${dirs.fileRoot}`, encoding)).toBe(data);
//   });
// });
