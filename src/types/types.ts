interface CryptConfigType {
  srcPath: string;
  destPath: string | undefined;
  pswrd: string;
  delSrc: boolean;
}

interface CLIArgsType {
  option: string;
  val: string;
}

export {CryptConfigType, CLIArgsType};
