import { parse } from "query-string";
import React from "react";
import { ResetPasswordForm } from "../components/Form/ResetPasswordForm";

interface ResetPasswordPageProps {}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({}) => {
  return <ResetPasswordForm />;
};
