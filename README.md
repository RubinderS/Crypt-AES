![GitHub](https://img.shields.io/github/license/rubinder25/node-crypt?style=flat-square) ![GitHub package.json version](https://img.shields.io/github/package-json/v/rubinder25/node-crypt?style=flat-square) 

# Node-Crypt

Cli tool to encrypt files or folders using AES

## Install

```
npm i node-crypt -g
```

## Usage

```
node-crypt encrypt|decrypt <options>
```

or

```
nc enc|dec <options>
```



for example:

```
node-crypt encrypt --source file.txt --password mypass
```

or

```
nc enc -s file.txt -p mypass
```

| Option                          | Description                                                  |
| :------------------------------ | :----------------------------------------------------------- |
| --source, -s <source>:          | source file or directory                                     |
| --password, -p <password>:      | password to be used                                          |
| --keep, -k :                    | keep the original file after the operation <br />(optional, default is delete the original file) |
| --output, -o <ouput directory>: | output directory for the processed files <br />(optional, default is same directory) |

For help:

```
nc -h
```

## Usage as a module

Node-Crypt can also be used as local npm dependency

```javascript
import {ncEncrypt, ncDecrypt} from 'node-crypt';

ncEncrypt({srcPath: './', pswrd: 'mypass', keepSrc: false, destPath: null});
```

