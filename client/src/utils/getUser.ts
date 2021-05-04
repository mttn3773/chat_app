import { dispatchNotify } from "./dispatchNotify";
import { IRootState } from "./../interfaces/rootState.interface";
import { config } from "../config";
import { IActionState } from "../interfaces/rootState.interface";
import { IUser } from "../interfaces/user.interface";
import { setNotify } from "../store/Actionst";
import { request } from "./request";

export const getUser = async (
  { notify }: IRootState,
  dispatch: React.Dispatch<IActionState<any>>
): Promise<IUser | null> => {
  try {
    const response = await request({ url: config.endpoints.me });
    dispatchNotify(dispatch, response, notify);
    return response.data.user;
  } catch (error) {
    dispatch(
      setNotify({ ...notify, errors: [{ msg: "Something went wrong" }] })
    );
    return null;
  }
};
