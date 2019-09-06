interface CryptAESConfig {
  srcPath: string;
  pswrd: string;
  destPath: string | null;
  keepSrc: boolean;
}

interface CLIArgsType {
  option: string;
  value: string;
}

export {CryptAESConfig, CLIArgsType};
