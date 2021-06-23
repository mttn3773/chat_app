import React from "react";
import { ISocketUser } from "../../../interfaces/socket-io.interfaces";
import "./Users.scss";
interface UsersProps {
  users: ISocketUser[];
}

export const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <div className="users-container">
      <h2>USERS</h2>
      {users.map(({ username, id }) => {
        return <p key={id}>{username}</p>;
      })}
    </div>
  );
};
