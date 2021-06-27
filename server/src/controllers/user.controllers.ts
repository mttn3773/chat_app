import { IApiResponse } from "./../interfaces/apiResponse.interface";
import { NextFunction, Request, Response } from "express";
import { upload } from "../utils/multer";
import { ICreateUser } from "./../interfaces/user.interface";
import {
  createUserService,
  deleteUserService,
  findUserByEmail,
  findUserByIdService,
  getAllUsersService,
  resetPasswordService,
  sendResetPasswordEmailService,
  sendVerificationEmailService,
  updateUserAvatar,
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

export const getUserById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { id } = req.params;
  const { status, response } = await findUserByIdService(id);
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
  const { status: status_, response: response_ } =
    await sendVerificationEmailService(user, req);
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
  const { status: status_, response: response_ } =
    await sendResetPasswordEmailService(user, req);
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

export const resetPassword = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { password, token } = req.body;
  const { response, status } = await resetPasswordService(password, token);
  return res
    .status(status)
    .json({ ...response })
    .end();
};
export const setAvatar = (req: Request, res: Response, _next: NextFunction) => {
  upload(req, res, async (err: any) => {
    try {
      // Send errors returned from multer file filtering functions
      if (err) {
        return res
          .status(500)
          .json({ success: false, errors: err } as IApiResponse["response"])
          .end();
      }
      // Check if file exists
      if (!req.file) {
        return res
          .status(500)
          .json({
            success: false,
            errors: [{ msg: "No file selected" }],
          } as IApiResponse["response"])
          .end();
      }
      // Update user avatar in db
      const { response, status } = await updateUserAvatar(
        (req.user as any)!,
        req.file.filename
      );
      return res
        .status(status)
        .json({ ...response })
        .end();
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          errors: [{ msg: "Something went wrong" }],
        } as IApiResponse["response"])
        .end();
    }
  });
};
