import React, { useContext } from "react";
import { Redirect, useParams } from "react-router";
import { ProfileContent } from "../components/Profile/";
import { DataContext } from "../store/GlobalState";

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { state } = useContext(DataContext);
  const { user } = state;
  console.log(user);

  if (!user) return null;
  return <ProfileContent user={user} />;
};
