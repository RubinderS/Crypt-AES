const util = require('util');
const {deleteAll} = require('utils');
const fs = require('fs');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const {version, help, noArgs} = require('../build/ProcessMainOptions');
const {extension: ext} = require('../build/commands/CommandUtils');
const env = `node`;
const cliPath = 'build/Cli';
const pswrd = `"P@$WR|)"`;
const dirs = {
  rootDir: `testDir`,
  fileBlankRootDir: `testDir/blank.txt`,
  fileRootDir: `testDir/root.txt`,
  outPathEncDir: `testDir/encrypted`,
  outPathDecDir: `testDir/decrypted`,
  emptyDir: `testDir/emptyDir`,
  dir1: `testDir/dir1`,
  fileDir1: `testDir/dir1/dir1.txt`,
  subDir1: `testDir/dir1/dir1SubDir1`,
  fileSubDir1: `testDir/dir1/dir1SubDir1/dir1SubDir1.txt`,
};
const data = `The quick brown fox jumps over the lazy dog`;
const encoding = `utf-8`;

async function cmd(command) {
  const {stdout, stderr} = await exec(command);
  if (stderr) {
    throw 'Error: ' + stderr;
  }
  return stdout;
}

function setup() {
  fs.mkdirSync(dirs.rootDir);
  fs.mkdirSync(dirs.dir1);
  fs.mkdirSync(dirs.subDir1);
  fs.mkdirSync(dirs.emptyDir);
  fs.writeFileSync(dirs.fileRootDir, data, encoding);
  fs.writeFileSync(dirs.fileBlankRootDir, '', encoding);
  fs.writeFileSync(dirs.fileDir1, data, encoding);
  fs.writeFileSync(dirs.fileSubDir1, data, encoding);
}

describe('No Args', () => {
  test('No Args', async () => {
    const output = await cmd(`${env} ${cliPath}`);
    expect(output).toBe(noArgs());
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
      const encryptedFile = path.join(dirs.outPathEncDir, path.basename(dirs.fileRootDir) + ext);
      const decryptedFile = path.join(dirs.outPathDecDir, path.basename(dirs.fileRootDir));
      const encryptCmnd = `${env} ${cliPath} encrypt
    --source ${dirs.fileRootDir}
    --password ${pswrd}
    --output ${dirs.outPathEncDir}`.replace(/(\n|\r)/g, ' ');
      await cmd(encryptCmnd);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(true);

      const decryptCmnd = `${env} ${cliPath} decrypt
    --source ${encryptedFile}
    --password ${pswrd}
    --output ${dirs.outPathDecDir}`.replace(/(\n|\r)/g, ' ');
      await cmd(decryptCmnd);
      expect(fs.existsSync(encryptedFile.replace(extRegex, ''))).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(false);
      expect(fs.existsSync(decryptedFile)).toBe(true);
      expect(fs.readFileSync(decryptedFile, encoding)).toBe(data);
    });

    test('Out and keep flag - mix commands', async () => {
      const extRegex = new RegExp(`${ext}$`, 'g');
      const encryptedFile = path.join(dirs.outPathEncDir, path.basename(dirs.fileRootDir) + ext);
      const decryptedFile = path.join(dirs.outPathDecDir, path.basename(dirs.fileRootDir));
      const encryptCmnd = `${env} ${cliPath} encrypt
      --source ${dirs.fileRootDir}
      -p ${pswrd}
      --output ${dirs.outPathEncDir}
      -k`.replace(/(\n|\r)/g, ' ');
      await cmd(encryptCmnd);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(true);

      const decryptCmnd = `${env} ${cliPath} decrypt
      -s ${encryptedFile}
      --password ${pswrd}
      -o ${dirs.outPathDecDir}
      --keep`.replace(/(\n|\r)/g, ' ');
      await cmd(decryptCmnd);
      expect(fs.existsSync(encryptedFile.replace(extRegex, ''))).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(true);
      expect(fs.existsSync(decryptedFile)).toBe(true);
      expect(fs.readFileSync(decryptedFile, encoding)).toBe(data);
    });
  });

  describe('Folder', () => {
    test('No flags - short commands', async () => {
      await cmd(`${env} ${cliPath} enc -s ${dirs.rootDir} -p ${pswrd}`);
      expect(fs.existsSync(dirs.rootDir)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
      expect(fs.existsSync(dirs.fileDir1)).toBe(false);
      expect(fs.existsSync(dirs.fileSubDir1)).toBe(false);
      expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(false);

      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileDir1 + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileSubDir1 + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(true);

      await cmd(`${env} ${cliPath} dec -s ${dirs.rootDir} -p ${pswrd}`);
      expect(fs.existsSync(dirs.rootDir)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
      expect(fs.existsSync(dirs.fileDir1 + ext)).toBe(false);
      expect(fs.existsSync(dirs.fileSubDir1 + ext)).toBe(false);
      expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(false);

      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileDir1)).toBe(true);
      expect(fs.existsSync(dirs.fileSubDir1)).toBe(true);
      expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(true);

      expect(fs.readFileSync(dirs.fileRootDir, encoding)).toBe(data);
      expect(fs.readFileSync(dirs.fileDir1, encoding)).toBe(data);
      expect(fs.readFileSync(dirs.fileSubDir1, encoding)).toBe(data);
      expect(fs.readFileSync(dirs.fileBlankRootDir, encoding)).toBe('');
    });

    test('Keep flag - long commands', async () => {
      await cmd(`${env} ${cliPath} encrypt --source ${dirs.rootDir} --password ${pswrd} --keep`);
      expect(fs.existsSync(dirs.rootDir)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileDir1)).toBe(true);
      expect(fs.existsSync(dirs.fileSubDir1)).toBe(true);
      expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileDir1 + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileSubDir1 + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(true);

      deleteAll(dirs.fileRootDir);
      deleteAll(dirs.fileDir1);
      deleteAll(dirs.fileSubDir1);
      deleteAll(dirs.fileBlankRootDir);

      await cmd(`${env} ${cliPath} decrypt --source ${dirs.rootDir} --password ${pswrd} --keep`);
      expect(fs.existsSync(dirs.rootDir)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileDir1 + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileSubDir1 + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileBlankRootDir + ext)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileDir1)).toBe(true);
      expect(fs.existsSync(dirs.fileSubDir1)).toBe(true);
      expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(true);

      expect(fs.readFileSync(dirs.fileRootDir, encoding)).toBe(data);
      expect(fs.readFileSync(dirs.fileDir1, encoding)).toBe(data);
      expect(fs.readFileSync(dirs.fileSubDir1, encoding)).toBe(data);
      expect(fs.readFileSync(dirs.fileBlankRootDir, encoding)).toBe('');
    });

    test('Out flag - short commands', async () => {
      const extRegex = new RegExp(`${ext}$`, 'g');
      const pathRegex = new RegExp(`${dirs.rootDir}`, 'g');
      const encryptCmnd = `${env} ${cliPath} enc -s ${dirs.fileRootDir} -p ${pswrd} -o ${dirs.outPathEncDir}`;

      await cmd(encryptCmnd);
      expect(fs.existsSync(dirs.rootDir)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir)).toBe(false);
      expect(fs.existsSync(dirs.fileDir1)).toBe(false);
      expect(fs.existsSync(dirs.fileSubDir1)).toBe(false);
      expect(fs.existsSync(dirs.fileBlankRootDir)).toBe(false);

      expect(fs.existsSync(dirs.fileRootDir.replace(pathRegex, dirs.outPathEncDir) + ext)).toBe(
        true,
      );
      expect(fs.existsSync(dirs.fileDir1.replace(pathRegex, dirs.outPathEncDir) + ext)).toBe(true);
      expect(fs.existsSync(dirs.fileSubDir1.replace(pathRegex, dirs.outPathEncDir) + ext)).toBe(
        true,
      );
      expect(
        fs.existsSync(dirs.fileBlankRootDir.replace(pathRegex, dirs.outPathEncDir) + ext),
      ).toBe(true);

      const decryptCmnd = `${env} ${cliPath} dec -s ${dirs.outPathEncDir} -p ${pswrd} -o ${dirs.outPathDecDir}`;
      await cmd(decryptCmnd);
      expect(fs.existsSync(dirs.rootDir)).toBe(true);

      expect(fs.existsSync(dirs.fileRootDir.replace(pathRegex, dirs.outPathEncDir) + ext)).toBe(
        false,
      );
      expect(fs.existsSync(dirs.fileDir1.replace(pathRegex, dirs.outPathEncDir) + ext)).toBe(false);
      expect(fs.existsSync(dirs.fileSubDir1.replace(pathRegex, dirs.outPathEncDir) + ext)).toBe(
        false,
      );
      expect(
        fs.existsSync(dirs.fileBlankRootDir.replace(pathRegex, dirs.outPathEncDir) + ext),
      ).toBe(false);

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
      const encryptedFile = path.join(dirs.outPathEncDir, path.basename(dirs.fileRootDir) + ext);
      const decryptedFile = path.join(dirs.outPathDecDir, path.basename(dirs.fileRootDir));
      const encryptCmnd = `${env} ${cliPath} encrypt
      --source ${dirs.fileRootDir}
      -p ${pswrd}
      --output ${dirs.outPathEncDir}
      -k`.replace(/(\n|\r)/g, ' ');
      await cmd(encryptCmnd);
      expect(fs.existsSync(dirs.fileRootDir)).toBe(true);
      expect(fs.existsSync(dirs.fileRootDir + ext)).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(true);

      const decryptCmnd = `${env} ${cliPath} decrypt
      -s ${encryptedFile}
      --password ${pswrd}
      -o ${dirs.outPathDecDir}
      --keep`.replace(/(\n|\r)/g, ' ');
      await cmd(decryptCmnd);
      expect(fs.existsSync(encryptedFile.replace(extRegex, ''))).toBe(false);
      expect(fs.existsSync(encryptedFile)).toBe(true);
      expect(fs.existsSync(decryptedFile)).toBe(true);
      expect(fs.readFileSync(decryptedFile, encoding)).toBe(data);
    });
  });
});
