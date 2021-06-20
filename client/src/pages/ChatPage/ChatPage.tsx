import React, { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Chat } from "../../components/Chat/Chat";
import { Rooms } from "../../components/Chat/Rooms/Rooms";
import { baseUrl } from "../../config";
import { IMessage, ISocketUser } from "../../interfaces/socket-io.interfaces";
import { IUser } from "../../interfaces/user.interface";
import { DataContext } from "../../store/GlobalState";
import "./ChatPage.scss";
interface ChatPageProps {}

export const ChatPage: React.FC<ChatPageProps> = ({}) => {
  const [room, setRoom] = useState("");
  const [userID, setUserID] = useState<string>();
  const [users, setUsers] = useState<ISocketUser[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { state } = useContext(DataContext);
  const { user } = state;
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  useEffect(() => {
    socketRef.current = io("/");
    // GET USER ID
    socketRef.current.on("your id", (id) => {
      setUserID(id);
    });
    // JOIN SERVER
    socketRef.current.emit("join server", {
      username: user?.username,
    });

    socketRef.current.emit("join room", "general");
    // RECIEVE MESSAGES FROM SERVER
    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    // KEEP TRACK OF CURRENT USERS
    socketRef.current.on("new user", (users) => setUsers(users));

    // ON JOINING ROOM
    socketRef.current.on("joined", (roomName) => {
      setRoom(roomName);
    });
  }, [baseUrl]);
  const sendMessage = (message: string) => {
    const messageObj = {
      body: message,
      user,
      to: room,
      id: userID,
    };
    socketRef.current?.emit("send message", messageObj);
    if (!user) return;
    setMessages((prev) => [
      ...prev,
      { body: message, user, id: userID || "", room },
    ]);
  };
  const changeRoom = (room: string) => {
    socketRef.current?.emit("join room", room);
  };
  return (
    <div className="chat-page">
      <Rooms setRoom={changeRoom} room={room} />
      <Chat
        room={room}
        messages={messages.filter((msg) => msg.room === room)}
        sendMessage={sendMessage}
        users={users}
      />
    </div>
  );
};
