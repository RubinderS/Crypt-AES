![GitHub](https://img.shields.io/github/license/rubinder25/nodecrypt?style=flat-square) ![GitHub package.json version](https://img.shields.io/github/package-json/v/rubinder25/nodecrypt?style=flat-square) 

# NodeCrypt

Cli tool to encrypt files and folders using AES

## Install

```
npm i nodecrypt -g
```

## Usage

```
nodecrypt encrypt|decrypt [options]
```

or

```
nc enc|dec [options]
```



for example:

```
nodecrypt encrypt --source file.txt --password mypass
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

nodecrypt can also be used as local npm dependency

```javascript
import {ncEncrypt, ncDecrypt} from 'nodecrypt';

ncEncrypt({srcPath: './', pswrd: 'mypass', keepSrc: false, destPath: null});
```

