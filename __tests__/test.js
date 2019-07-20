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
  fs.mkdirSync(paths.rootDir);
  fs.mkdirSync(paths.dir1);
  fs.mkdirSync(paths.subDir1);
  fs.mkdirSync(paths.emptyDir);
  fs.writeFileSync(paths.fileDir1, data, encoding);
  fs.writeFileSync(paths.fileSubDir1, data, encoding);
  fs.writeFileSync(paths.fileRoot, data, encoding);
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

describe('Crypt Commands', () => {
  beforeEach(() => {
    deleteDirWithFiles(paths.rootDir);
    setup();
  });

  afterEach(() => {
    deleteDirWithFiles(paths.rootDir);
  });

  test('File - no flags', async () => {
    await cmd(`${env} ${cliPath} enc -s ${paths.fileRoot} -p ${pswrd}`);
    expect(fs.existsSync(`${paths.fileRoot}`)).toBe(false);
    expect(fs.existsSync(`${paths.fileRoot}${extension}`)).toBe(true);

    await cmd(`${env} ${cliPath} dec -s ${paths.fileRoot}${extension} -p ${pswrd}`);
    expect(fs.existsSync(`${paths.fileRoot}`)).toBe(true);
    expect(fs.existsSync(`${paths.fileRoot}${extension}`)).toBe(false);
    expect(fs.readFileSync(`${paths.fileRoot}`, encoding)).toBe(data);
  });
});
