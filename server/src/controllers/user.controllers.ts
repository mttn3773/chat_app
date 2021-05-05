import { NextFunction, Request, Response } from "express";
import { ICreateUser } from "./../interfaces/user.interface";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
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
  return res
    .status(status)
    .json({ ...response })
    .end();
};
