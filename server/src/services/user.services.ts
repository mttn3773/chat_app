import { ICreateUser } from "./../interfaces/user.interface";
import { errorResponse, successResponse } from "./../utils/apiResponse";
import { IError } from "./../interfaces/error.interface";
import { User } from "../entity/User";
import { IApiResponse } from "../interfaces/apiResponse.interface";
import { hash } from "argon2";
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
