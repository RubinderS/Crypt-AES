function getHelp(): string {
  return `
  Usage: crypt-aes encrypt|decrypt [options] 
                    or 
         c-aes enc|dec [options]


  Options:

  --source, -s <source>:           Source file or directory
  --password, -p <password>:       password to be used
  --keep, -k:                      keep the original file after the operation 
                                   (optional, default is delete the original file)
  --output, -o <ouput directory>:  output directory for the processed files 
                                   (default: same directory)

  `;
}

export {getHelp};
