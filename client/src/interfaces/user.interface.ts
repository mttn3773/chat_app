export interface IUser {
  id: string;
  username: string;
  email: string;
  verified: boolean;
}

export interface ICreateUser {
  email: string;
  username: string;
  password: string;
}
