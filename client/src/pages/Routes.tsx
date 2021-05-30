import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DataContext } from "../store/GlobalState";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { RegisterPage } from "./RegisterPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { VerifyPage } from "./VerifyPage/";
import { Chat } from "../components/Chat/Chat";
import { CustomRedirect } from "../components/CustomRedirect";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { state } = useContext(DataContext);
  if (typeof state.user === "undefined") return null;

  return (
    <BrowserRouter>
      {/* Routes when logged in */}
      {!!state.user ? (
        <Switch>
          <Route exact path="/" />
          <Route path="/verify" component={VerifyPage} />
          <Route exact path="/profile">
            <Redirect to={`/profile/${state.user.id}`} />
          </Route>
          <Route path="/profile/:id" component={ProfilePage} />
          <Route path="/chat" component={Chat} />
          <CustomRedirect to="/" redirectToNext />
        </Switch>
      ) : (
        <Switch>
          {/* Routes when NOT logged in */}
          <Route path="/sign-in" component={LoginPage} />
          <Route path="/verify" component={VerifyPage} />
          <Route path="/sign-up" component={RegisterPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <CustomRedirect to="sign-in" addNextQueryParam />
        </Switch>
      )}
    </BrowserRouter>
  );
};
