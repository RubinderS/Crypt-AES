interface ICLIOptionsType {
  srcPath: string;
  destPath: string;
  pswrd: string;
  delSrc: boolean;
  needExt: boolean;
}

interface ICLIArgsType {
  option: string;
  val: string;
}

interface IMainOptionsType {
  [key: string]: (val?:string) => void;
}

export {ICLIOptionsType, ICLIArgsType, IOptionsType};
