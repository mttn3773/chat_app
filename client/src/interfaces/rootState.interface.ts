import { IUser } from "./user.interface";
import { INotify } from "./notify.interface";
import { ACTION } from "../store/Actionst";
export interface IRootState {
  notify: INotify;
  user: IUser | null | undefined;
}

export interface IActionState<K = any> {
  type: ACTION;
  payload: K;
}
