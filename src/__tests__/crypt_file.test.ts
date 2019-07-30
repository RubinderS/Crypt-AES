import {env, cliPath, cmd, pswrd, encoding, data, dirs, setupFileTests} from './Commons';
import {deleteAll} from 'utilities';
import * as fs from 'fs';
import * as path from 'path';
import {extension as ext} from '../commands';

describe('Crypt Commands File', () => {
  beforeAll(() => {
    deleteAll(dirs.rootDir);
  });

  beforeEach(() => {
    setupFileTests();
  });

  afterEach(() => {
    deleteAll(dirs.rootDir);
  });

  test('No flags - short commands', () => {
    cmd(`${env} ${cliPath} enc -s ${dirs.fileRootDir} -p ${pswrd}`);
    expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
    expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);

    cmd(`${env} ${cliPath} dec -s ${dirs.fileRootDir + ext} -p ${pswrd}`);
    expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
    expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
    expect(fs.readFileSync(dirs.fileRootDir, encoding)).toBe(data);
  });

  test('Blank file - short commands', () => {
    cmd(`${env} ${cliPath} enc -s ${dirs.fileBlankRootDir} -p ${pswrd}`);
    expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(false);
    expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(true);

    cmd(`${env} ${cliPath} dec -s ${dirs.fileBlankRootDir + ext} -p ${pswrd}`);
    expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(true);
    expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(false);
    expect(fs.readFileSync(dirs.fileBlankRootDir, encoding)).toBe('');
  });

  test('Keep flag - short commands', () => {
    cmd(`${env} ${cliPath} enc -s ${dirs.fileRootDir} -p ${pswrd} -k`);
    expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
    expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);

    deleteAll(dirs.fileRootDir);

    cmd(`${env} ${cliPath} dec -s ${dirs.fileRootDir + ext} -p ${pswrd} -k`);
    expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
    expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);
    expect(fs.readFileSync(dirs.fileRootDir, encoding)).toBe(data);
  });

  test('Out flag - long commands', () => {
    const encryptedFileBase = path.join(dirs.encDir, path.basename(dirs.fileRootDir));
    const decryptedFileBase = path.join(dirs.decDir, path.basename(dirs.fileRootDir));
    const encryptCmnd = `${env} ${cliPath} encrypt
    --source ${dirs.fileRootDir}
    --password ${pswrd}
    --output ${dirs.encDir}`.replace(/(\n|\r)/g, ' ');
    cmd(encryptCmnd);
    expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
    expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);

    expect(fs.existsSync(encryptedFileBase)).toBe(false);
    expect(fs.existsSync(encryptedFileBase + ext)).toBe(true);

    const decryptCmnd = `${env} ${cliPath} decrypt
    --source ${encryptedFileBase + ext}
    --password ${pswrd}
    --output ${dirs.decDir}`.replace(/(\n|\r)/g, ' ');
    cmd(decryptCmnd);
    expect(fs.existsSync(encryptedFileBase)).toBe(false);
    expect(fs.existsSync(encryptedFileBase + ext)).toBe(false);

    expect(fs.existsSync(decryptedFileBase)).toBe(true);
    expect(fs.existsSync(decryptedFileBase + ext)).toBe(false);
    expect(fs.readFileSync(decryptedFileBase, encoding)).toBe(data);
  });

  test('Out and keep flag - mix commands', () => {
    const encryptedFileBase = path.join(dirs.encDir, path.basename(dirs.fileRootDir));
    const decryptedFileBase = path.join(dirs.decDir, path.basename(dirs.fileRootDir));
    const encryptCmnd = `${env} ${cliPath} encrypt
      --source ${dirs.fileRootDir}
      -p ${pswrd}
      --output ${dirs.encDir}
      -k`.replace(/(\n|\r)/g, ' ');
    cmd(encryptCmnd);
    expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
    expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);

    expect(fs.existsSync(encryptedFileBase)).toBe(false);
    expect(fs.existsSync(encryptedFileBase + ext)).toBe(true);

    const decryptCmnd = `${env} ${cliPath} decrypt
      -s ${encryptedFileBase + ext}
      --password ${pswrd}
      -o ${dirs.decDir}
      --keep`.replace(/(\n|\r)/g, ' ');
    cmd(decryptCmnd);
    expect(fs.existsSync(encryptedFileBase)).toBe(false);
    expect(fs.existsSync(encryptedFileBase + ext)).toBe(true);

    expect(fs.existsSync(decryptedFileBase)).toBe(true);
    expect(fs.existsSync(decryptedFileBase + ext)).toBe(false);
    expect(fs.readFileSync(decryptedFileBase, encoding)).toBe(data);
  });
});
