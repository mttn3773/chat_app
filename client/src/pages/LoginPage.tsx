import React from "react";
import { LoginForm } from "../components/Form/LoginForm";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  return (
    <>
      <LoginForm />
    </>
  );
};
