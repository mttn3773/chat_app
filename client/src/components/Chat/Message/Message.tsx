import React from "react";
import { IUser } from "../../../interfaces/user.interface";
import "./Message.scss";

interface MessageProps {
  body: string;
  user: IUser;
}

export const Message: React.FC<MessageProps> = ({ body, user }) => {
  return (
    <div className="message-body">
      <p>{user.username}</p>
      <p>{body}</p>
    </div>
  );
};
