import { IActionState, IRootState } from "./../interfaces/rootState.interface";
import { ACTION } from "./Actionst";
export const reducers = (
  state: IRootState,
  action: IActionState
): IRootState => {
  switch (action.type) {
    case ACTION.NOTIFY:
      return { ...state, notify: action.payload };
    case ACTION.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
