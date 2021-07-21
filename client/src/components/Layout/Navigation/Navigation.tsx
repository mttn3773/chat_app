import React from "react";
import { useContext } from "react";
import { config } from "../../../config";
import { DataContext } from "../../../store/GlobalState";
import { request } from "../../../utils/request";
import "./Navigation.scss";
interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const { state } = useContext(DataContext);
  const handleLogout = async () => {
    await request({ url: config.endpoints.logout, method: "POST" });
    window.location.reload();
  };
  const userLinks = state.user ? (
    <div className="user-links">
      <a href="/profile"> Profile </a>
      <a onClick={handleLogout}> Logout </a>
    </div>
  ) : null;
  return (
    <nav>
      <a className="logo" href="/chat">
        CHAT
      </a>
      {userLinks}
    </nav>
  );
};
