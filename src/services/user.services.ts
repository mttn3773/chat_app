import { hash } from "argon2";
import { Request } from "express";
import { sign, TokenExpiredError, verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../entity/User";
import { IApiResponse } from "../interfaces/apiResponse.interface";
import { IError } from "../interfaces/error.interface";
import { ICreateUser, IUserJwtPayload } from "../interfaces/user.interface";
import { sendResetPasswordEmail } from "../nodemailer/sendResetPasswordEmail";
import { sendVerificationEmail } from "../nodemailer/sendVerificationEmail";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { baseUrl } from "../utils/baseUrl";

export const findUserByEmail = async (email: string): Promise<IApiResponse> => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponse({
        errors: [{ msg: "Couldn't find this user", param: "email" }],
      });
    }
    return successResponse({ data: { user } });
  } catch (error) {
    return errorResponse({});
  }
};

export const sendResetPasswordEmailService = async (
  user: User,
  req: Request
): Promise<IApiResponse> => {
  try {
    const { email, id } = user;
    const token = sign({ id } as IUserJwtPayload, config.jwtSecret!, {
      expiresIn: "1d",
    });
    const url = baseUrl(req);
    await sendResetPasswordEmail(email, token, url);
    return successResponse({
      status: 200,
      msg: "Reset password link has been sent",
    });
  } catch (error) {
    return errorResponse({});
  }
};

export const findUserByIdService = async (
  id: string
): Promise<IApiResponse> => {
  try {
    const user = await User.findOne(id);
    if (!user)
      return errorResponse({
        status: 500,
        errors: [{ msg: "Couldn't fetch the user" }],
      });
    return successResponse({ data: { user } });
  } catch (error) {
    return errorResponse({});
  }
};

export const sendVerificationEmailService = async (
  user: User,
  req: Request
): Promise<IApiResponse> => {
  try {
    const { email, id } = user;
    const token = sign({ id } as IUserJwtPayload, config.jwtSecret!, {
      expiresIn: "1d",
    });
    const url = baseUrl(req);
    await sendVerificationEmail(email, token, url);
    return successResponse({
      status: 200,
      msg: "Verification link has been sent",
    });
  } catch (error) {
    return errorResponse({});
  }
};

export const verifyUserService = async (
  token: string
): Promise<IApiResponse> => {
  try {
    // Recieve token from request body and check if payload has id in it
    const { id } = verify(token, config.jwtSecret!) as IUserJwtPayload;
    if (!id) {
      return errorResponse({
        status: 500,
        errors: [{ msg: "Verification link expired" }],
      });
    }
    // Update user
    const data = await User.update({ id }, { verified: true });
    return successResponse({
      status: 200,
      msg: "Account verified",
      data,
    });
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return errorResponse({
        status: 400,
        errors: [{ msg: "Verification link expired" }],
      });
    }
    return errorResponse({});
  }
};

export const validateUserData = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}): Promise<IError[] | null> => {
  // Check if user with this email already exists
  const isEmailTaken = await User.findOne({ where: { email } });
  if (isEmailTaken) {
    return [{ msg: "Email is already taken", param: "email" }];
  }
  // Check if user with this username already exists
  const isUsernameTaken = await User.findOne({ where: { username } });
  if (isUsernameTaken) {
    return [{ msg: "Username is already taken", param: "username" }];
  }
  return null;
};

export const createUserService = async ({
  email,
  password,
  username,
}: ICreateUser): Promise<IApiResponse> => {
  try {
    const validationErrors = await validateUserData({ username, email });
    if (validationErrors) {
      return errorResponse({ status: 400, errors: validationErrors });
    }
    const hashedPassword = await hash(password);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    user.password = undefined;
    return successResponse({
      msg: "User created",
      data: { user },
    });
  } catch (e) {
    return errorResponse({});
  }
};

export const getAllUsersService = async (): Promise<IApiResponse> => {
  try {
    const users = await User.find();
    return successResponse({ data: { users } });
  } catch (error) {
    console.log(error);

    return errorResponse({});
  }
};

export const deleteUserService = async (): Promise<IApiResponse> => {
  await User.delete({});
  const users = await User.find();
  return successResponse({
    msg: "Users delted",
    data: { users },
  });
};

export const resetPasswordService = async (
  password: string,
  token: string
): Promise<IApiResponse> => {
  try {
    const { id } = verify(token, config.jwtSecret!) as IUserJwtPayload;
    const hashedPassword = await hash(password);
    await User.update({ id }, { password: hashedPassword });
    return successResponse({ msg: "Password updated" });
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return errorResponse({
        status: 400,
        errors: [{ msg: "Verification link expired" }],
      });
    }
    return errorResponse({});
  }
};
