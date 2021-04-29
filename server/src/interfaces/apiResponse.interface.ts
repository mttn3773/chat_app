import { IError } from "./error.interface";
import { Response } from "express";
export interface IErrorResponse {
  res: Response;
  status?: number;
  errors?: IError[];
}

export interface ISuccessResponse {
  res: Response;
  msg?: string;
  status?: number;
  data?: any;
}
