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
  const getNewMessagesFromUser = (username: string) => {
    const newMessagesCount = newMessanges.filter(
      (message) => message.user.username === username
    ).length;
    if (!newMessagesCount) return;
    return <i className="new-messages-icon">{newMessagesCount}</i>;
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
      {users.map(({ user, id }) => {
        if (state.user?.username === user.username) {
          return (
            <p className={isActive(id)} key={id}>
              {user.username}
            </p>
          );
        }
        return (
          <a
            className={isActive(id)}
            onClick={() => handleClick(id, user.username)}
            key={id}
          >
            {user.username} {getNewMessagesFromUser(user.username)}
          </a>
        );
      })}
    </div>
  );
};
