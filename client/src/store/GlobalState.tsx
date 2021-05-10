import React, { createContext, useEffect, useReducer } from "react";
import { IActionState, IRootState } from "../interfaces/rootState.interface";
import { getUser } from "../utils/getUser";
import { setUser } from "./Actionst";
import { reducers } from "./Reducers";

interface GlobalStateProps {}

const initialState: IRootState = {
  notify: {
    errors: [],
    success: [],
  },
  user: undefined,
};

export const DataContext = createContext<{
  state: IRootState;
  dispatch: React.Dispatch<IActionState>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  useEffect(() => {
    getUser(state, dispatch).then((user) => {
      return dispatch(setUser(user));
    });
  }, []);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
