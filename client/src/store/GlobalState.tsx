import React, { createContext, useEffect, useReducer } from "react";
import { useAuth } from "../hooks/useAuth";
import { IActionState, IRootState } from "../interfaces/rootState.interface";
import { IUser } from "../interfaces/user.interface";
import { setUser } from "./Actionst";
import { reducers } from "./Reducers";

interface GlobalStateProps {
  getUser: (
    dispatch: React.Dispatch<IActionState<any>>
  ) => Promise<IUser | null>;
}

const initialState: IRootState = {
  notify: {
    errors: [],
    success: [],
  },
  user: null,
};

export const DataContext = createContext<{
  state: IRootState;
  dispatch: React.Dispatch<IActionState>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const GlobalState: React.FC<GlobalStateProps> = ({
  children,
  getUser,
}) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  useEffect(() => {
    getUser(dispatch).then((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  }, []);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
