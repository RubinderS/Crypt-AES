import {env, cliPath} from './TestUtils';
import {noArgs} from '../ProcessMainOptions';

describe('No Args', () => {
  test('No Args', async () => {
    const output = await cmd(`${env} ${cliPath}`);
    expect(output).toBe(noArgs());
  });
});
