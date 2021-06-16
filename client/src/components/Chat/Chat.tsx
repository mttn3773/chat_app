import { Form, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { baseUrl } from "../../config";
import { DataContext } from "../../store/GlobalState";
import { InputField } from "../Form/InputField";
import { Message } from "./Message/Message";
import "./Chat.scss";
import { IUser } from "../../interfaces/user.interface";

interface ChatProps {}

interface IMessage {
  body: string;
  id: string;
  user: IUser;
}

export const Chat: React.FC<ChatProps> = ({}) => {
  const [userID, setUserID] = useState<string>();
  const [users, setUsers] = useState<any[]>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { state } = useContext(DataContext);
  const { user } = state;
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  useEffect(() => {
    socketRef.current = io("/");
    socketRef.current.on("your id", (id) => {
      setUserID(id);
    });
    socketRef.current.emit("join server", {
      username: user?.username,
    });
    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    socketRef.current.on("new user", (users) => setUsers(users));
  }, [baseUrl]);
  const sendMessage = (message: string) => {
    const messageObj = {
      body: message,
      user,
      id: userID,
    };
    socketRef.current?.emit("send message", messageObj);
  };
  const initialValues = {
    message: "",
  };
  return (
    <div className="chat-container">
      <p>{users?.map((user) => user.username)}</p>
      <div className="messages-container">
        {messages.map(({ body, user }) => {
          return <Message user={user} body={body} />;
        })}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          sendMessage(values.message);
          return resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="message" />
            <button disabled={isSubmitting} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
