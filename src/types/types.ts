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

interface MainOptionsType {
  [key: string]: (val?: string) => void;
}

// not used anymore
interface MainCommandsType {
  encrypt: (src: string, dest: string) => void;
}

export {CryptConfigType, CLIArgsType, MainOptionsType, MainCommandsType};
