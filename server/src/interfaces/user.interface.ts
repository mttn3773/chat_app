export interface ICreateUser {
  email: string;
  password: string;
  username: string;
}

export interface IUserJwtPayload {
  id: number;
}
