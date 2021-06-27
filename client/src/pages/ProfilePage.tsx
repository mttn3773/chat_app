import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Redirect, useParams } from "react-router";
import { ProfileContent } from "../components/Profile/";
import { IUser } from "../interfaces/user.interface";
import { DataContext } from "../store/GlobalState";
import { request } from "../utils/request";
import { parse } from "query-string";
import { config } from "../config";
interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { state } = useContext(DataContext);
  const id = window.location.href.split("/").pop();
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (!id) return;
    request({ url: config.endpoints.user(id) }).then((res) => {
      setUser(res.data.user);
    });
  }, []);
  if (!id) return null;
  if (!user) return null;
  return <ProfileContent user={user} />;
};
