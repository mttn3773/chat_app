import { IUser } from "./user.interface";

export interface IMessage {
  body: string;
  id: string;
  user: IUser;
  room: string;
  isPrivate: boolean;
}

export interface ISocketUser {
  roomName: string;
  user: IUser;
  id: string;
}
