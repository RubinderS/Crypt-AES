import {env, cliPath, cmd, pswrd} from './TestCommons';
import {deleteAll} from 'utils';

describe('Crypt Commands', () => {
  beforeAll(() => {
    deleteAll(dirs.rootDir);
  });

  beforeEach(() => {
    setup();
  });

  afterEach(() => {
    deleteAll(dirs.rootDir);
  });

  describe('File', () => {
    test('No flags - short commands', async () => {
      await cmd(`${env} ${cliPath} enc -s ${dirs.fileRootDir} -p ${pswrd}`);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);

      await cmd(`${env} ${cliPath} dec -s ${dirs.fileRootDir + ext} -p ${pswrd}`);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
      expect(fs.readFileSync(dirs.fileRootDir, encoding)).toBe(data);
    });

    test('Blank file - short commands', async () => {
      await cmd(`${env} ${cliPath} enc -s ${dirs.fileBlankRootDir} -p ${pswrd}`);
      expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(false);
      expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(true);

      await cmd(`${env} ${cliPath} dec -s ${dirs.fileBlankRootDir + ext} -p ${pswrd}`);
      expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(false);
      expect(fs.readFileSync(dirs.fileBlankRootDir, encoding)).toBe('');
    });

    test('Keep flag - short commands', async () => {
      await cmd(`${env} ${cliPath} enc -s ${dirs.fileRootDir} -p ${pswrd} -k`);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);

      deleteAll(dirs.fileRoot);

      await cmd(`${env} ${cliPath} dec -s ${dirs.fileRootDir + ext} -p ${pswrd} -k`);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);
      expect(fs.readFileSync(dirs.fileRootDir, encoding)).toBe(data);
    });

    test('Out flag - long commands', async () => {
      const extRegex = new RegExp(`${ext}$`, 'g');
      const encryptedFile = path.join(dirs.encDir, path.basename(dirs.fileRootDir) + ext);
      const decryptedFile = path.join(dirs.decDir, path.basename(dirs.fileRootDir));
      const encryptCmnd = `${env} ${cliPath} encrypt
    --source ${dirs.fileRootDir}
    --password ${pswrd}
    --output ${dirs.encDir}`.replace(/(\n|\r)/g, ' ');
      await cmd(encryptCmnd);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(true);

      const decryptCmnd = `${env} ${cliPath} decrypt
    --source ${encryptedFile}
    --password ${pswrd}
    --output ${dirs.decDir}`.replace(/(\n|\r)/g, ' ');
      await cmd(decryptCmnd);
      expect(fs.existsSync(encryptedFile.replace(extRegex, ''))).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(false);
      expect(fs.existsSync(decryptedFile)).toBe(true);
      expect(fs.readFileSync(decryptedFile, encoding)).toBe(data);
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
});
