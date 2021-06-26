import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  IMessage,
  ISocketUser,
} from "../../../interfaces/socket-io.interfaces";
import { DataContext } from "../../../store/GlobalState";
import "./Users.scss";
interface UsersProps {
  users: ISocketUser[];
  setRoom: (userID: string) => void;
  setMessageToUser: () => void;
  newMessanges: IMessage[];
  setNewMessanges: React.Dispatch<React.SetStateAction<IMessage[]>>;
  room: string;
}

export const Users: React.FC<UsersProps> = ({
  users,
  setRoom,
  setMessageToUser,
  newMessanges,
  setNewMessanges,
  room,
}) => {
  const { state } = useContext(DataContext);
  const handleClick = (id: string, username: string) => {
    setMessageToUser();
    setRoom(id);
    setNewMessanges((prev) =>
      prev.filter((messange) => messange.user.username !== username)
    );
  };
  const getMessagesFromUser = (username: string) => {
    return newMessanges.filter((message) => message.user.username === username)
      .length;
  };
  const isActive = (roomName: string): string => {
    if (roomName === room) {
      return "active";
    }
    return "";
  };
  return (
    <div className="users-container">
      <h2>USERS</h2>
      {users.map(({ username, id }) => {
        if (state.user?.username === username) {
          return (
            <p className={isActive(id)} key={id}>
              {username}
            </p>
          );
        }
        return (
          <a
            className={isActive(id)}
            onClick={() => handleClick(id, username)}
            key={id}
          >
            {username} {getMessagesFromUser(username)}
          </a>
        );
      })}
    </div>
  );
};
