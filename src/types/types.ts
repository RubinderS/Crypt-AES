interface NodeCryptConfig {
  srcPath: string;
  destPath: string | undefined;
  pswrd: string;
  keepSrc: boolean;
}

interface CLIArgsType {
  option: string;
  val: string;
}

export {NodeCryptConfig, CLIArgsType};
