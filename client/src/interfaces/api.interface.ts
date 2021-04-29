import { IError } from "./error.interface";

export interface RequestProps {
  url: string;
  method?: string;
  headers?: any;
  body?: any;
}

export interface IApiResponse {
  msg?: string;
  success: boolean;
  status?: number;
  data?: any;
  errors?: IError[];
}
