import { IApiResponse } from "../interfaces/apiResponse.interface";
import { IError } from "../interfaces/error.interface";

type ErrorResponseProps = {
  status?: number;
  errors?: IError[];
};

export const errorResponse = ({
  status = 500,
  errors = [{ msg: "Something went wrong" }],
}: ErrorResponseProps): IApiResponse => {
  return { status, response: { success: false, errors } };
};

type SuccessResponseProps = {
  status?: number;
  msg?: string;
  data?: any;
};
export const successResponse = ({
  status = 200,
  msg = "Success",
  data,
}: SuccessResponseProps): IApiResponse => {
  return { status, response: { success: true, msg, data } };
};
