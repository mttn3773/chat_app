import { ICreateUser } from "./../interfaces/user.interface";
import { errorResponse, successResponse } from "./../utils/apiResponse";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { hash } from "argon2";
export const getAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const users = await User.find();
    return successResponse({ res, data: { users } });
  } catch (error) {
    return errorResponse({ res });
  }
};

export const deleteAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  await User.delete({});
  const users = await User.find();
  return successResponse({ res, msg: "Users delted", data: users });
};

export const createUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { email, password, username } = req.body as ICreateUser;
    const isEmailTaken = await User.findOne({ where: { email } });
    if (isEmailTaken) {
      return errorResponse({
        res,
        errors: [{ msg: "Email is already taken", param: "email" }],
      });
    }
    const isUsernameTaken = await User.findOne({ where: { username } });
    if (isUsernameTaken) {
      return errorResponse({
        res,
        errors: [{ msg: "Username is already taken", param: "username" }],
      });
    }
    const hashedPassword = await hash(password);
    const user = User.create({
      password: hashedPassword,
      email,
      username,
    } as ICreateUser);
    await user.save();
    user.password = undefined;
    return successResponse({ res, msg: "User Created", data: { user } });
  } catch (error) {
    return errorResponse({ res });
  }
};
