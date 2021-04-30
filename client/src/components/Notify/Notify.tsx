import React, { useContext, useEffect, useState } from "react";
import { INotify, IToast } from "../../interfaces/notify.interface";
import { ACTION, setNotify } from "../../store/Actionst";
import { DataContext } from "../../store/GlobalState";
import { v4 } from "uuid";
import { Toast } from "./Toast/Toast";
import "./Notify.scss";
interface NotifyProps {}

export const Notify: React.FC<NotifyProps> = ({}) => {
  const { state, dispatch } = useContext(DataContext);
  const [toasts, setToasts] = useState<IToast[]>([]);
  const { notify } = state;
  const { errors, success } = notify;
  const deleteToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  useEffect(() => {
    if (!success.length && !errors.length) return;
    const successToasts: IToast[] = [];
    success.map((success) => {
      const id = v4();
      successToasts.push({ msg: success.msg, type: "success", id });
    });
    const errorToasts: IToast[] = [];
    errors.map((err) => {
      const id = v4();
      errorToasts.push({
        msg: err.msg,
        type: "error",
        id,
        param: err.param || undefined,
      });
    });
    setToasts((prev) => [...prev, ...successToasts, ...errorToasts]);
    dispatch(setNotify({ errors: [], success: [] }));
  }, [notify]);
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          deleteToast={deleteToast}
          expiresIn={5000}
        />
      ))}
    </div>
  );
};
