import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginPage } from "./LoginPage";

interface RoutesProps {
  isAuthenticated: boolean | undefined;
  loading: boolean;
}

export const Routes: React.FC<RoutesProps> = ({ isAuthenticated, loading }) => {
  if (loading) {
    return null;
  }
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Switch>
          <Route path="/" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      )}
    </BrowserRouter>
  );
};
