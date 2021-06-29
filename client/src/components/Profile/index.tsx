import React, { useState } from "react";
import { useContext } from "react";
import { IUser } from "../../interfaces/user.interface";
import { DataContext } from "../../store/GlobalState";
import { ImageUploadDialog } from "../ImageUpload/ImageUploadDialog";
import "./Profile.scss";
interface ProfileContentProps {
  user: IUser;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  const { state } = useContext(DataContext);
  const [imageUploadDialogOpen, setImageUploadDialogOpen] =
    useState<boolean>(false);
  const handleOpenDialog = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setImageUploadDialogOpen(!imageUploadDialogOpen);
  };
  const closeDialog = () => {
    setImageUploadDialogOpen(false);
  };
  return (
    <>
      <ImageUploadDialog isOpen={imageUploadDialogOpen} close={closeDialog} />
      <div className="profile-conteiner">
        <div className="user-avatar">
          <img
            src={`/uploads/profile-pictures/${user.avatar}`}
            width="150px"
            height="200px"
          />
          {state.user?.id === user.id && (
            <button onClick={handleOpenDialog}> Change avatar </button>
          )}
        </div>
        <div className="user-info">
          <p>Username: {user.username}</p>
        </div>
      </div>
    </>
  );
};
