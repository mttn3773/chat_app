import React from "react";
import { Notify } from "./components/Notify/Notify";
import { useAuth } from "./hooks/useAuth";
import { Routes } from "./pages/Routes";
import { GlobalState } from "./store/GlobalState";
import "./utils/prototypes";
import "./styles/global.scss";
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
