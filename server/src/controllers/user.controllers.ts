import { NextFunction, Request, Response } from "express";
import { ICreateUser } from "./../interfaces/user.interface";
import {
  createUserService,
  deleteUserService,
  findUserByEmail,
  getAllUsersService,
  sendResetPasswordEmailService,
  sendVerificationEmailService,
  verifyUserService,
} from "./../services/user.services";
export const getAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status, response } = await getAllUsersService();
  return res
    .status(status)
    .json({ ...response })
    .end();
};

export const deleteAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status, response } = await deleteUserService();
  return res
    .status(status)
    .json({ ...response })
    .end();
};

export const verifyUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { token } = req.body;
  const { status, response } = await verifyUserService(token);
  return res
    .status(status)
    .json({ ...response })
    .end();
};

export const sendVerificationLink = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email } = req.body;
  const { status, response } = await findUserByEmail(email);
  if (!response.success) {
    return res
      .status(status)
      .json({ ...response })
      .end();
  }
  const user = response.data.user;
  const {
    status: status_,
    response: response_,
  } = await sendVerificationEmailService(user, req);
  return res.status(status_).json({ ...response_ });
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email } = req.body;
  const { status, response } = await findUserByEmail(email);
  if (!response.success) {
    return res
      .status(status)
      .json({ ...response })
      .end();
  }
  const user = response.data.user;
  const {
    status: status_,
    response: response_,
  } = await sendResetPasswordEmailService(user, req);
  return res.status(status_).json({ ...response_ });
};

export const createUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password, username } = req.body as ICreateUser;
  const { status, response } = await createUserService({
    email,
    username,
    password,
  });
  if (response.success) {
    sendVerificationEmailService(response.data.user, req);
  }
  return res
    .status(status)
    .json({ ...response })
    .end();
};
