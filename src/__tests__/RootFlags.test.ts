import {env, cliPath, cmd} from './TestCommons';
import {version, help, noArguments} from '../ProcessMainOptions';

describe('Root Flags', () => {
  test('No flags', () => {
    const output = cmd(`${env} ${cliPath}`);
    expect(output).toBe(noArguments());
  });

  test('Version - short command', () => {
    const output = cmd(`${env} ${cliPath} -v`);
    expect(output).toBe(version());
  });

  test('Version - long command', () => {
    const output = cmd(`${env} ${cliPath} --version`);
    expect(output).toBe(version());
  });

  test('Help - short command', () => {
    const output = cmd(`${env} ${cliPath} -h`);
    expect(output).toBe(help());
  });

  test('Help - long command', () => {
    const output = cmd(`${env} ${cliPath} --help`);
    expect(output).toBe(help());
  });
});
