import React from "react";
import { RegisterForm } from "../components/Form/RegisterForm";

interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  return (
    <>
      <RegisterForm />
    </>
  );
};
