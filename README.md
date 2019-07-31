https://img.shields.io/github/license/rubinder25/node-crypt?style=flat-square https://img.shields.io/github/package-json/v/rubinder25/node-crypt?style=flat-square

# Node-Crypt

Cli tool to encrypt files or folders using AES

## Install

```
npm i node-crypt -g
```

## Usage:-

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

Options:

> ​    --source, -s <source>:                       source file or directory
>
> ​    --password, -p <password>:            password to be used
>
> ​    --keep, -k :                                               keep the original file after the operation (optional, default is delete the original file)
>
>    --output, -o <ouput directory>:  output directory for the processed files (optional, default is same directory)

For help:

```
nc -h
```

