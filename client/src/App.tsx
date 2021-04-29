import React, { useContext, useEffect } from "react";
import { Notify } from "./components/Notify";
import { useAuth } from "./hooks/useAuth";
import { Routes } from "./pages/Routes";
import { setNotify } from "./store/Actionst";
import { DataContext, GlobalState } from "./store/GlobalState";

function App() {
  const { getUser, isAuthenticated, loading } = useAuth();

  return (
    <GlobalState getUser={getUser}>
      <Notify />;
      <Routes isAuthenticated={isAuthenticated} loading={loading} />
    </GlobalState>
  );
}

export default App;
