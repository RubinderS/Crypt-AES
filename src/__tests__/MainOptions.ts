import {env, cliPath, cmd} from './TestCommons';
import {version, help, noArguments} from '../ProcessMainOptions';

describe('No Arguments', () => {
  test('No Arguments', () => {
    const output = cmd(`${env} ${cliPath}`);
    expect(output).toBe(noArguments());
  });
});

describe('Main Options', () => {
  test('Version - Short Command', () => {
    const output = cmd(`${env} ${cliPath} -v`);
    expect(output).toBe(version());
  });

  test('Version - Long Command', () => {
    const output = cmd(`${env} ${cliPath} --version`);
    expect(output).toBe(version());
  });

  test('Help - Short Command', () => {
    const output = cmd(`${env} ${cliPath} -h`);
    expect(output).toBe(help());
  });

  test('Help - Long Command', () => {
    const output = cmd(`${env} ${cliPath} --help`);
    expect(output).toBe(help());
  });
});
