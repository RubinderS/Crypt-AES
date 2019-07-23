import * as fs from 'fs';

const packageJSON = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`, `utf-8`));
const versionNumber = packageJSON.version;

function getVersion(): string {
  return `Version: ${versionNumber}`;
}

export {getVersion};
