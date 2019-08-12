![GitHub](https://img.shields.io/github/license/rubinder25/nodecrypt?style=flat-square) ![GitHub package.json version](https://img.shields.io/github/package-json/v/rubinder25/nodecrypt?style=flat-square)

# Crypt-AES

Cli tool to encrypt files and folders using AES

## Install

```
npm i crypt-aes -g
```

## Usage

```
crypt-aes encrypt|decrypt [options]
```

or

```
c-aes enc|dec [options]
```

for example:

```
crypt-aes encrypt --source file.txt --password mypass
```

or

```
c-aes enc -s file.txt -p mypass
```

| Option                          | Description                                                                                      |
| :------------------------------ | :----------------------------------------------------------------------------------------------- |
| --source, -s <source>:          | source file or directory                                                                         |
| --password, -p <password>:      | password to be used                                                                              |
| --keep, -k :                    | keep the original file after the operation <br />(optional, default is delete the original file) |
| --output, -o <ouput directory>: | output directory for the processed files <br />(optional, default is same directory)             |

For help:

```
c-aes -h
```

## Usage as a module

crypt-aes can also be used as local npm dependency

```javascript
import {encrypt, decrypt} from 'crypt-aes';

encrypt({srcPath: './', pswrd: 'mypass', keepSrc: false, destPath: null});
```
