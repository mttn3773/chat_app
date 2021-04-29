import {
  IErrorResponse,
  ISuccessResponse,
} from "src/interfaces/apiResponse.interface";

export const errorResponse = ({
  res,
  status = 500,
  errors = [{ msg: "Something went wrong" }],
}: IErrorResponse) => {
  return res.status(status).json({ success: false, errors }).end();
};

export const successResponse = ({
  res,
  msg,
  status = 200,
  data,
}: ISuccessResponse) => {
  return res.status(status).json({ success: true, msg, data }).end();
};
