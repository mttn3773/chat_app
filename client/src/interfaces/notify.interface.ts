import { IError } from "./error.interface";

export interface INotify {
  errors: IError[];
  success: { msg: string }[];
}

export interface IToast {
  msg: string;
  success: boolean;
  id: string;
}
