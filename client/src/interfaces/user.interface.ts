export interface IUser {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  avatar: string;
}

export interface ICreateUser {
  email: string;
  username: string;
  password: string;
}
