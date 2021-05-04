import { INotify } from "../interfaces/notify.interface";
import { IUser } from "../interfaces/user.interface";
import { IActionState, IRootState } from "./../interfaces/rootState.interface";
export enum ACTION {
  NOTIFY = "NOTIFY",
  SET_USER = "SET_USER",
}

export const setNotify = (
  payload: IRootState["notify"]
): IActionState<INotify> => {
  return { type: ACTION.NOTIFY, payload };
};

export const setUser = (payload: IUser | null): IActionState<IUser | null> => {
  return { type: ACTION.SET_USER, payload };
};
