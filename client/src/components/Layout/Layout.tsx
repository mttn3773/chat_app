import React from "react";
import { Navigation } from "./Navigation/Navigation";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};
