import React, { useContext, useEffect, useState } from "react";
import { INotify, IToast } from "../interfaces/notify.interface";
import { ACTION, setNotify } from "../store/Actionst";
import { DataContext } from "../store/GlobalState";
import { v4 } from "uuid";
interface NotifyProps {}

export const Notify: React.FC<NotifyProps> = ({}) => {
  const { state, dispatch } = useContext(DataContext);
  const [toasts, setToasts] = useState<IToast[]>([]);
  const { notify } = state;
  const { errors, success } = notify;

  useEffect(() => {
    if (!errors.length) return;
    const toasts_: IToast[] = [];
    errors.map((err) => {
      const id = v4();
      toasts_.push({ msg: err.msg, success: false, id });
    });
    setToasts((prev) => [...prev, ...toasts_]);
    dispatch(setNotify({ ...notify, errors: [] }));
  }, [errors]);
  useEffect(() => {
    if (!success.length) return;
    const toasts_: IToast[] = [];
    success.map((success) => {
      const id = v4();
      toasts_.push({ msg: success.msg, success: false, id });
    });
    setToasts((prev) => [...prev, ...toasts_]);
    dispatch(setNotify({ ...notify, success: [] }));
  }, [success]);
  return <>{toasts.map((toast: any) => toast.id)}</>;
};
