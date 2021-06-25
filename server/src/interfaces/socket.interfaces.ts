import { IUser } from "./user.interface";

export interface ISocketUsers {
  roomName: string;
  username: string;
  id: string;
}

export interface IMessagePayload {
  isPrivate: boolean;
  body: string;
  user: IUser;
  to: string;
  id: string;
}
