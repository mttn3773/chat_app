import { Formik, Form } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { baseUrl } from "../../config";
import { IUser } from "../../interfaces/user.interface";
import { DataContext } from "../../store/GlobalState";
import { InputField } from "../Form/InputField";

interface ChatProps {}

interface IMessage {
  body: string;
  id: string;
}

export const Chat: React.FC<ChatProps> = ({}) => {
  const [userID, setUserID] = useState<string>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { state } = useContext(DataContext);
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  useEffect(() => {
    socketRef.current = io("/");
    socketRef.current.on("your id", (id) => {
      setUserID(id);
    });
    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [baseUrl]);
  const sendMessage = (message: string) => {
    const messageObj = {
      body: message,
      id: userID,
    };
    socketRef.current?.emit("send message", messageObj);
  };
  const initialValues = {
    message: "",
  };
  return (
    <>
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
              Sign In
            </button>
          </Form>
        )}
      </Formik>
      <div>{JSON.stringify(messages)}</div>
    </>
  );
};
