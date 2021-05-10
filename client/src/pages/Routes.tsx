import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DataContext } from "../store/GlobalState";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { RegisterPage } from "./RegisterPage";
import { VerifyPage } from "./VerifyPage";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { state } = useContext(DataContext);
  if (typeof state.user === "undefined") return null;

  return (
    <BrowserRouter>
      {!!state.user ? (
        <Switch>
          <Route exact path="/" />
          <Route path="/verify" component={VerifyPage} />
          <Route path="/profile" component={ProfilePage} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/sign-in" component={LoginPage} />
          <Route path="/verify" component={VerifyPage} />
          <Route path="/sign-up" component={RegisterPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Redirect to="/sign-in" />
        </Switch>
      )}
    </BrowserRouter>
  );
};
