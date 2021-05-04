import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DataContext } from "../store/GlobalState";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { RegisterPage } from "./RegisterPage";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { state } = useContext(DataContext);
  if (typeof state.user === "undefined") return null;
  console.log(!!state.user);

  return (
    <BrowserRouter>
      {!!state.user ? (
        <Switch>
          <Route exact path="/" />
          <Route path="/profile" component={ProfilePage} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/sign-in" component={LoginPage} />
          <Route path="/sign-up" component={RegisterPage} />
          <Redirect to="/sign-in" />
        </Switch>
      )}
    </BrowserRouter>
  );
};
