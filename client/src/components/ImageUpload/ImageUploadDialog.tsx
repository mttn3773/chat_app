import React from "react";
import { ImageUploadForm } from "../Form/ImageUploadForm/ImageUploadForm";
import "./ImageUploadDialog.scss";
interface ImageUploadDialogProps {
  isOpen: boolean;
  close: () => void;
}

export const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  isOpen,
  close,
}) => {
  const isClosed = isOpen ? "" : "closed";
  return (
    <div className={`dialog-conteiner ${isClosed}`}>
      <ImageUploadForm />
      <button onClick={close} className="close-button">
        X
      </button>
    </div>
  );
};
