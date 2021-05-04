import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { LoginForm } from "../components/Form/LoginForm";
import { DataContext } from "../store/GlobalState";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  return (
    <>
      <LoginForm />
    </>
  );
};
