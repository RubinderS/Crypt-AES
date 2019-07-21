import {env, cliPath, cmd} from './TestCommons';
import {version, help, noArguments} from '../ProcessMainOptions';

describe('No Arguments', () => {
  test('No Arguments', () => {
    const output = cmd(`${env} ${cliPath}`);
    expect(output).toBe(noArguments());
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
