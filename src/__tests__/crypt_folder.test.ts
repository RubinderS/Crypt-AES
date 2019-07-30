import {
  env,
  cliPath,
  cmd,
  pswrd,
  encoding,
  data,
  dirs,
  setupFolderTests,
  encFiles,
  decFiles,
  rootFiles,
} from './commons';
import {deleteAll} from '../fs';
import * as fs from 'fs';
import {extension as ext} from '../commands';

describe('Crypt Commands Folder', () => {
  beforeAll(() => {
    deleteAll(dirs.rootDir);
  });

  beforeEach(() => {
    setupFolderTests();
  });

  afterEach(() => {
    deleteAll(dirs.rootDir);
  });

  test('No flags - short commands', () => {
    cmd(`${env} ${cliPath} enc -s ${dirs.rootDir} -p ${pswrd}`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(false);
      expect(fs.existsSync(file + ext)).toBe(true);
    });

    cmd(`${env} ${cliPath} dec -s ${dirs.rootDir} -p ${pswrd}`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(false);
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.readFileSync(file, encoding)).toBe(data);
    });
  });

  test('Keep flag - long commands', () => {
    cmd(`${env} ${cliPath} encrypt --source ${dirs.rootDir} --password ${pswrd} --keep`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.existsSync(file + ext)).toBe(true);
      deleteAll(file);
    });

    cmd(`${env} ${cliPath} decrypt --source ${dirs.rootDir} --password ${pswrd} --keep`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(true);
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.readFileSync(file, encoding)).toBe(data);
    });
  });

  test('Out flag - short commands', () => {
    const encryptCmnd = `${env} ${cliPath} enc -s ${dirs.rootDir} -p ${pswrd} -o ${dirs.encDir}`;

    cmd(encryptCmnd);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(false);
      expect(fs.existsSync(file + ext)).toBe(false);
    });

    encFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(false);
      expect(fs.existsSync(file + ext)).toBe(true);
    });

    const decryptCmnd = `${env} ${cliPath} dec -s ${dirs.encDir} -p ${pswrd} -o ${dirs.decDir}`;
    cmd(decryptCmnd);
    encFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(false);
      expect(fs.existsSync(file + ext)).toBe(false);
    });

    decFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(false);
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.readFileSync(file, encoding)).toBe(data);
    });
  });

  test('Out and keep flag - mix commands', () => {
    const encryptCmnd = `${env} ${cliPath} encrypt
    --source ${dirs.rootDir}
    -p ${pswrd}
    --output ${dirs.encDir}
    -k`.replace(/(\n|\r)/g, ' ');
    cmd(encryptCmnd);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.existsSync(file + ext)).toBe(false);
    });

    encFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(false);
      expect(fs.existsSync(file + ext)).toBe(true);
    });
    const decryptCmnd = `${env} ${cliPath} decrypt
    -s ${dirs.encDir}
    --password ${pswrd}
    -o ${dirs.decDir}
    --keep`.replace(/(\n|\r)/g, ' ');
    cmd(decryptCmnd);
    encFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(false);
      expect(fs.existsSync(file + ext)).toBe(true);
    });

    decFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(false);
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.readFileSync(file, encoding)).toBe(data);
    });
  });
});
