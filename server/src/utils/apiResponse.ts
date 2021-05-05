import { IApiResponse } from "../interfaces/apiResponse.interface";
import { IError } from "./../interfaces/error.interface";

export const errorResponse = ({
  status = 500,
  errors = [{ msg: "Something went wrong" }],
}: {
  status?: number;
  errors?: IError[];
}): IApiResponse => {
  return { status, response: { success: false, errors } };
};

export const successResponse = ({
  status = 200,
  msg = "Success",
  data,
}: {
  status?: number;
  msg?: string;
  data?: any;
}): IApiResponse => {
  return { status, response: { success: true, msg, data } };
};
