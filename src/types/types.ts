interface CryptAESConfig {
  srcPath: string;
  pswrd: string;
  destPath: string | null;
  keepSrc: boolean;
}

interface CLIArgsType {
  option: string;
  val: string;
}

export {CryptAESConfig, CLIArgsType};
