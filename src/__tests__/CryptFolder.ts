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
  checkAll,
} from './TestCommons';
import {deleteAll} from 'utils';
import * as fs from 'fs';
import * as path from 'path';
import {extension as ext} from '../commands/CommandUtils';

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

  test('No flags - short commands', async () => {
    await cmd(`${env} ${cliPath} enc -s ${dirs.rootDir} -p ${pswrd}`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(false);
    });

    rootFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(true);
    });

    await cmd(`${env} ${cliPath} dec -s ${dirs.rootDir} -p ${pswrd}`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.readFileSync(file, encoding)).toBe(data);
    });

    rootFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(false);
    });
  });

  test('Keep flag - long commands', async () => {
    await cmd(`${env} ${cliPath} encrypt --source ${dirs.rootDir} --password ${pswrd} --keep`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(true);
      deleteAll(file);
    });

    rootFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(true);
    });

    await cmd(`${env} ${cliPath} decrypt --source ${dirs.rootDir} --password ${pswrd} --keep`);
    rootFiles.forEach((file) => {
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.readFileSync(file, encoding)).toBe(data);
    });

    rootFiles.forEach((file) => {
      expect(fs.existsSync(file + ext)).toBe(true);
    });
  });

  test('Out flag - short commands', async () => {
    const extRegex = new RegExp(`${ext}$`, 'g');
    const pathRegex = new RegExp(`${dirs.rootDir}`, 'g');
    const encryptCmnd = `${env} ${cliPath} enc -s ${dirs.fileRootDir} -p ${pswrd} -o ${dirs.encDir}`;

    await cmd(encryptCmnd);
    expect(fs.existsSync(dirs.rootDir)).toBe(true);

    expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
    expect(fs.existsSync(dirs.fileDir1)).toBe(false);
    expect(fs.existsSync(dirs.fileSubDir1)).toBe(false);
    expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(false);

    expect(fs.existsSync(dirs.fileRootDir.replace(pathRegex, dirs.encDir) + ext)).toBe(true);
    expect(fs.existsSync(dirs.fileDir1.replace(pathRegex, dirs.encDir) + ext)).toBe(true);
    expect(fs.existsSync(dirs.fileSubDir1.replace(pathRegex, dirs.encDir) + ext)).toBe(true);
    expect(fs.existsSync(dirs.fileBlankRootDir.replace(pathRegex, dirs.encDir) + ext)).toBe(true);

    const decryptCmnd = `${env} ${cliPath} dec -s ${dirs.encDir} -p ${pswrd} -o ${dirs.decDir}`;
    await cmd(decryptCmnd);
    expect(fs.existsSync(dirs.rootDir)).toBe(true);

    expect(fs.existsSync(dirs.fileRootDir.replace(pathRegex, dirs.encDir) + ext)).toBe(false);
    expect(fs.existsSync(dirs.fileDir1.replace(pathRegex, dirs.encDir) + ext)).toBe(false);
    expect(fs.existsSync(dirs.fileSubDir1.replace(pathRegex, dirs.encDir) + ext)).toBe(false);
    expect(fs.existsSync(dirs.fileBlankRootDir.replace(pathRegex, dirs.encDir) + ext)).toBe(false);

    expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
    expect(fs.existsSync(dirs.fileDir1)).toBe(true);
    expect(fs.existsSync(dirs.fileSubDir1)).toBe(true);
    expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(true);

    expect(fs.readFileSync(dirs.fileRootDir, encoding)).toBe(data);
    expect(fs.readFileSync(dirs.fileDir1, encoding)).toBe(data);
    expect(fs.readFileSync(dirs.fileSubDir1, encoding)).toBe(data);
    expect(fs.readFileSync(dirs.fileBlankRootDir, encoding)).toBe('');
  });

  test('Out and keep flag - mix commands', async () => {
    const extRegex = new RegExp(`${ext}$`, 'g');
    const encryptedFile = path.join(dirs.encDir, path.basename(dirs.fileRootDir) + ext);
    const decryptedFile = path.join(dirs.decDir, path.basename(dirs.fileRootDir));
    const encryptCmnd = `${env} ${cliPath} encrypt
    --source ${dirs.fileRootDir}
    -p ${pswrd}
    --output ${dirs.encDir}
    -k`.replace(/(\n|\r)/g, ' ');
    await cmd(encryptCmnd);
    expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
    expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
    expect(fs.existsSync(encryptedFile)).toBe(true);

    const decryptCmnd = `${env} ${cliPath} decrypt
    -s ${encryptedFile}
    --password ${pswrd}
    -o ${dirs.decDir}
    --keep`.replace(/(\n|\r)/g, ' ');
    await cmd(decryptCmnd);
    expect(fs.existsSync(encryptedFile.replace(extRegex, ''))).toBe(false);
    expect(fs.existsSync(encryptedFile)).toBe(true);
    expect(fs.existsSync(decryptedFile)).toBe(true);
    expect(fs.readFileSync(decryptedFile, encoding)).toBe(data);
  });
});
