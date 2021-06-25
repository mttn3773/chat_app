import React from "react";
import { useContext } from "react";
import { ISocketUser } from "../../../interfaces/socket-io.interfaces";
import { DataContext } from "../../../store/GlobalState";
import "./Users.scss";
interface UsersProps {
  users: ISocketUser[];
  setRoom: (userID: string) => void;
  setMessageToUser: () => void;
}

export const Users: React.FC<UsersProps> = ({
  users,
  setRoom,
  setMessageToUser,
}) => {
  const { state } = useContext(DataContext);
  const handleClick = (id: string) => {
    setMessageToUser();
    setRoom(id);
  };
  return (
    <div className="users-container">
      <h2>USERS</h2>
      {users.map(({ username, id }) => {
        if (state.user?.username === username) {
          return <p key={id}>{username}</p>;
        }
        return (
          <a onClick={() => handleClick(id)} key={id}>
            {username}
          </a>
        );
      })}
    </div>
  );
};
