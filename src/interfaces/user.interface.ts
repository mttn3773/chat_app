export interface ICreateUser {
  email: string;
  password: string;
  username: string;
}

export interface IUserJwtPayload {
  id: number;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  verified: boolean;
}
