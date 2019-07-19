const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {version, help} = require('../build/ProcessMainOptions');

describe('Test 1', () => {
  test('Test 1', async () => {
    const {stdout, stderr} = await exec('node build/Cli.js -v');
    if (stderr) {
      throw 'Error: ' + stderr;
    }
    expect(stdout).toBe(version());
  });
});
