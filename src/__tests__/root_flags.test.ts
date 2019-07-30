import {env, cliPath, cmd} from './commons';
import {getVersion, getHelp} from '../root_flags';

describe('Root Flags', () => {
  test('No flags', () => {
    const output = cmd(`${env} ${cliPath}`);
    expect(output).toBe(getHelp());
  });

  test('Version - short command', () => {
    const output = cmd(`${env} ${cliPath} -v`);
    expect(output).toBe(getVersion());
  });

  test('Version - long command', () => {
    const output = cmd(`${env} ${cliPath} --version`);
    expect(output).toBe(getVersion());
  });

  test('Help - short command', () => {
    const output = cmd(`${env} ${cliPath} -h`);
    expect(output).toBe(getHelp());
  });

  test('Help - long command', () => {
    const output = cmd(`${env} ${cliPath} --help`);
    expect(output).toBe(getHelp());
  });
});
