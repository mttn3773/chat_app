import { IApiResponse } from "./../interfaces/api.interface";
import { INotify } from "./../interfaces/notify.interface";
import { IActionState } from "../interfaces/rootState.interface";
import { setNotify } from "../store/Actionst";

interface IOptions {
  errors: boolean;
  success: boolean;
}

export const dispatchNotify = (
  dispatch: React.Dispatch<IActionState<any>>,
  response: IApiResponse,
  notify: INotify,
  options: IOptions = {
    errors: true,
    success: true,
  }
) => {
  if (!response.success) {
    if (response.errors && options.errors) {
      dispatch(setNotify({ ...notify, errors: response.errors }));
    }
    return;
  }
  if (response.msg && options.success) {
    return dispatch(setNotify({ ...notify, success: [{ msg: response.msg }] }));
  }
};
