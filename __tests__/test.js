const util = require('util');
const {deleteDirWithFiles} = require('utils');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const {version, help, noArgs} = require('../build/ProcessMainOptions');
const testDir = 'testDir';

async function cmd(command) {
  const {stdout, stderr} = await exec(command);
  if (stderr) {
    throw 'Error: ' + stderr;
  }
  return stdout;
}

function setup() {
  fs.mkdirSync(`testDir`);
  fs.mkdirSync(`${testDir}/dir1`);
  fs.mkdirSync(`${testDir}/dir1/dir1SubDir1`);
  fs.mkdirSync(`${testDir}/emptyDir`);
  fs.writeFileSync(
    `${testDir}/dir1/dir1.txt`,
    `The quick brown fox jumps over the lazy dog`,
    `utf-8`,
  );
  fs.writeFileSync(
    `${testDir}/dir1/dir1SubDir1/dir1SubDir1.txt`,
    `The quick brown fox jumps over the lazy dog`,
    `utf-8`,
  );
  fs.writeFileSync(`${testDir}/root.txt`, `The quick brown fox jumps over the lazy dog`, `utf-8`);
}

describe('No Args', () => {
  test('No Args', async () => {
    const output = await cmd('node build/Cli.js');
    expect(output).toBe(noArgs());
  });
});

describe('Main Options', () => {
  test('Version - Short Command', async () => {
    const output = await cmd('node build/Cli.js -v');
    expect(output).toBe(version());
  });
  test('Version - Long Command', async () => {
    const output = await cmd('node build/Cli.js --version');
    expect(output).toBe(version());
  });
  test('Help - Short Command', async () => {
    const output = await cmd('node build/Cli.js -h');
    expect(output).toBe(help());
  });
  test('Help - Long Command', async () => {
    const output = await cmd('node build/Cli.js --help');
    expect(output).toBe(help());
  });
});

describe('Encrypt Command', () => {
  deleteDirWithFiles(testDir);
  setup();
  deleteDirWithFiles(testDir);
});
