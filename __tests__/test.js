const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {version, help, noArgs} = require('../build/ProcessMainOptions');

async function cmd(command) {
  const {stdout, stderr} = await exec(command);
  if (stderr) {
    throw 'Error: ' + stderr;
  }
  return stdout;
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
