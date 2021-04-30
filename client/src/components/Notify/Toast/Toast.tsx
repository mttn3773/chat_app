import React, { useEffect, useState } from "react";
import { IToast } from "../../../interfaces/notify.interface";
import "./Toast.scss";
interface ToastProps {
  toast: IToast;
  deleteToast: (id: string) => void;
  expiresIn: number;
}

export const Toast: React.FC<ToastProps> = ({
  toast,
  deleteToast,
  expiresIn,
}) => {
  const [onExpireAnimate, setOnExpireAnimate] = useState<boolean>(false);
  const handleDelete = () => {
    setOnExpireAnimate(true);
    setTimeout(() => {
      deleteToast(toast.id);
    }, 1000);
  };
  useEffect(() => {
    setTimeout(handleDelete, expiresIn);
  }, []);
  return (
    <div
      className={`toast ${toast.type} ${
        onExpireAnimate ? "expiration-animate" : null
      } `}
      onClick={handleDelete}
    >
      <p className="toast-title">
        {toast.param ? toast.param : toast.type.toCapitalize()}
      </p>

      <p>{toast.msg}</p>
    </div>
  );
};
