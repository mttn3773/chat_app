import { IError } from "./error.interface";

export interface INotify {
  errors: IError[];
  success: { msg: string }[];
}

export interface IToast {
  param?: string;
  msg: string;
  type: string;
  id: string;
}
