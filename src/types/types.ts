interface NodeCryptConfig {
  srcPath: string;
  destPath: string | undefined;
  pswrd: string;
  delSrc: boolean;
}

interface CLIArgsType {
  option: string;
  val: string;
}

export {NodeCryptConfig, CLIArgsType};
