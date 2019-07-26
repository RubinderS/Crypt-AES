# node-crypter

node-crypter

/\*\*
Cli tool to encrypt files using AES (this line to be improved)

Usage:-

node-crypt encrypt --source file.txt --password mypass
or
nc enc -s file.txt -p mypass

--version, -v : Version
--help, -h : help

Commands:-
encrypt, enc 
    --source, -s : Source file or directory
    --password, -p : password to be used
    --keep, -k : keep the original file after the ecnryption(default: delete the original file)
    --output, -o : output directory for the encrypted files (default: same directory)

decrypt, dec 
    --source, -s : Source file or directory
    --password, -p : password to be used
    --keep, -k : keep the original file after the decryption(default: delete the original file)
    --output, -o : output directory for the decrypted files (default: same directory)





(if a directory is selected, all files inside that directory will be encrypted)





- encrypt
- -s <filename or dirname>
- -p <password>
- -d(optional delete the files after finish)
- -noext(optional don't add enc extension and keep the original file name)
- -out (optional ) <output directory>
-
- decrypt
- -s <filename or dirname>
- -p <password>
- -d(optional delete the files after finish)
- -noext(optional check for any file instead of just the -noext files)
- -out
- \*/
