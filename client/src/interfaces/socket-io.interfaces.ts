import { IUser } from "./user.interface";

export interface IMessage {
  body: string;
  id: string;
  user: IUser;
  room: string;
}

export interface ISocketUser {
  roomName: string;
  username: string;
  id: string;
}
