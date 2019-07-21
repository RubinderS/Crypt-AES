import {execSync} from 'child_process';

const env = `node`;
const cliPath = 'build/Cli';
const pswrd = `"P@$WR|)"`;

function cmd(command: string): string {
  let out = '';
  try {
    out = String(execSync(command));
  } catch (e) {
    console.log('An error had occurred while processing the command');
  }
  return out;
}

export {env, cliPath, pswrd, cmd};
