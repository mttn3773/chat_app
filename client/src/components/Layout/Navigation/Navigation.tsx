import React from "react";
import { config } from "../../../config";
import { request } from "../../../utils/request";
import "./Navigation.scss";
interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const handleLogout = async () => {
    await request({ url: config.endpoints.logout, method: "POST" });
    window.location.reload();
  };
  return (
    <nav>
      <a className="logo" href="/chat">
        CHAT
      </a>
      <div className="user-links">
        <a href="/profile"> Profile </a>
        <a onClick={handleLogout}> Logout </a>
      </div>
    </nav>
  );
};
