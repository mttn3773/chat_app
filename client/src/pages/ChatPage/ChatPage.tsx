import React, { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Chat } from "../../components/Chat/Chat";
import { Rooms } from "../../components/Chat/Rooms/Rooms";
import { Users } from "../../components/Chat/Users/Users";
import { baseUrl } from "../../config";
import { IMessage, ISocketUser } from "../../interfaces/socket-io.interfaces";
import { DataContext } from "../../store/GlobalState";
import "./ChatPage.scss";
interface ChatPageProps {}

export const ChatPage: React.FC<ChatPageProps> = ({}) => {
  const [room, setRoom] = useState("");
  const [userID, setUserID] = useState<string>();
  const [users, setUsers] = useState<ISocketUser[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newPrivateMessages, setNewPrivateMessages] = useState<IMessage[]>([]);
  const [isPrivateMessage, setPrivateMessage] = useState<boolean>(false);
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
    // JOIN ROOM
    socketRef.current.emit("join room", "general");
    // RECIEVE MESSAGES FROM SERVER
    socketRef.current.on("message", (message: IMessage) => {
      if (message.isPrivate && !(message.room === room))
        setNewPrivateMessages((prev) => [...prev, message]);
      setMessages((prev) => [...prev, message]);
    });
    // KEEP TRACK OF CURRENT USERS
    socketRef.current.on("new user", (users) => setUsers(users));

    // ON JOINING ROOM
    socketRef.current.on("joined", (roomName) => {
      setRoom(roomName);
    });
  }, [baseUrl]);
  useEffect(() => {
    setNewPrivateMessages((prev) =>
      prev.filter((message) => message.room !== room)
    );
  }, [messages]);
  const sendMessage = (message: string) => {
    const messageObj = {
      body: message,
      user,
      to: room,
      id: userID,
      isPrivate: isPrivateMessage,
    };
    return socketRef.current?.emit("send message", messageObj);
  };
  const changeRoom = (room: string) => {
    socketRef.current?.emit("join room", room);
  };
  return (
    <div className="chat-page">
      <div className="channels-container">
        <Rooms
          setMessageToChannel={() => setPrivateMessage(false)}
          setRoom={changeRoom}
          room={room}
        />
        <Users
          newMessanges={newPrivateMessages}
          setNewMessanges={setNewPrivateMessages}
          setMessageToUser={() => setPrivateMessage(true)}
          users={users}
          setRoom={changeRoom}
          room={room}
        />
      </div>
      <Chat
        isPrivateMessage={isPrivateMessage}
        room={room}
        messages={messages.filter((msg) => msg.room === room)}
        sendMessage={sendMessage}
        users={users.filter((user) => user.roomName === room)}
      />
    </div>
  );
};
