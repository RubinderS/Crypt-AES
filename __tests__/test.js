const util = require('util');
const {deleteDirWithFiles} = require('utils');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const {version, help, noArgs} = require('../build/ProcessMainOptions');
const {extension} = require('../build/commands/CommandUtils');
const env = `node`;
const cliPath = 'build/Cli';
const pswrd = `"P@$WR|)"`;
const paths = {
  rootDir: `testDir`,
  dir1: `testDir/dir1`,
  subDir1: `testDir/dir1/dir1SubDir1`,
  emptyDir: `testDir/emptyDir`,
  fileDir1: `testDir/dir1/dir1.txt`,
  fileSubDir1: `testDir/dir1/dir1SubDir1/dir1SubDir1.txt`,
  fileRoot: `testDir/root.txt`,
};

async function cmd(command) {
  const {stdout, stderr} = await exec(command);
  if (stderr) {
    throw 'Error: ' + stderr;
  }
  return stdout;
}

function setup() {
  fs.mkdirSync(paths.rootDir);
  fs.mkdirSync(paths.dir1);
  fs.mkdirSync(paths.subDir1);
  fs.mkdirSync(paths.emptyDir);
  fs.writeFileSync(paths.fileDir1, `The quick brown fox jumps over the lazy dog`, `utf-8`);
  fs.writeFileSync(paths.fileSubDir1, `The quick brown fox jumps over the lazy dog`, `utf-8`);
  fs.writeFileSync(paths.fileRoot, `The quick brown fox jumps over the lazy dog`, `utf-8`);
}

beforeAll(() => {
  deleteDirWithFiles(paths.rootDir);
});

describe('No Args', () => {
  test('No Args', async () => {
    const output = await cmd(`${env} ${cliPath}`);
    expect(output).toBe(noArgs());
  });
});

describe('Main Options', () => {
  test('Version - Short Command', async () => {
    const output = await cmd(`${env} ${cliPath} -v`);
    expect(output).toBe(version());
  });

  test('Version - Long Command', async () => {
    const output = await cmd(`${env} ${cliPath} --version`);
    expect(output).toBe(version());
  });

  test('Help - Short Command', async () => {
    const output = await cmd(`${env} ${cliPath} -h`);
    expect(output).toBe(help());
  });

  test('Help - Long Command', async () => {
    const output = await cmd(`${env} ${cliPath} --help`);
    expect(output).toBe(help());
  });
});

describe('Encrypt Command', () => {
  beforeAll(() => {
    // deleteDirWithFiles(paths.rootDir);
    setup();
  });

  afterAll(() => {
    // deleteDirWithFiles(paths.rootDir);
  });

  test('File - no flags', async () => {
    const output = await cmd(`${env} ${cliPath} enc -s ${paths.fileRoot} -p ${pswrd}`);
    console.log(output);
    expect(fs.existsSync(`${paths.fileRoot}${extension}`)).toBe(true);
    expect(fs.readFileSync(`${paths.fileRoot}${extension}`)).toMatchSnapshot();
  });
});
