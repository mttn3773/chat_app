import React, { useState } from "react";
import { useContext } from "react";
import { IUser } from "../../interfaces/user.interface";
import { DataContext } from "../../store/GlobalState";
import "./Profile.scss";
interface ProfileContentProps {
  user: IUser;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  return (
    <>
      <div className="profile-conteiner">
        <div className="user-info">
          <p>Username: {user.username}</p>
        </div>
      </div>
    </>
  );
};
