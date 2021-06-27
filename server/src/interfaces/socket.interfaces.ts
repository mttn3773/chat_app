import { IUser } from "./user.interface";

export interface ISocketUsers {
  roomName: string;
  user: IUser;
  id: string;
}

export interface IMessagePayload {
  isPrivate: boolean;
  body: string;
  user: IUser;
  to: string;
  id: string;
}
