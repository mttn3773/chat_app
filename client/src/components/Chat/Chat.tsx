import { Form, Formik } from "formik";
import React from "react";
import { IMessage, ISocketUser } from "../../interfaces/socket-io.interfaces";
import { InputField } from "../Form/InputField";
import "./Chat.scss";
import { Message } from "./Message/Message";

interface ChatProps {
  isPrivateMessage: boolean;
  room: string;
  messages: IMessage[];
  sendMessage: (message: string, isPrivate: boolean) => void;
  users: ISocketUser[];
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  sendMessage,
  users,
  isPrivateMessage,
}) => {
  const initialValues = {
    message: "",
  };
  return (
    <div className="chat-container">
      <p>
        {users?.map((user) => JSON.stringify({ ...user, isPrivateMessage }))}
      </p>
      <div className="messages-container">
        {messages.map(({ body, user }, index) => {
          return <Message key={index} user={user} body={body} />;
        })}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          sendMessage(values.message, isPrivateMessage);
          return resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="message" autoComplete="off" />
            <button disabled={isSubmitting} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
