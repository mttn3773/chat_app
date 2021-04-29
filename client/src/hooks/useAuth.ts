import { setNotify } from "./../store/Actionst";
import { DataContext } from "./../store/GlobalState";
import { useState, useContext } from "react";
import { request } from "../utils/request";
import { IUser } from "../interfaces/user.interface";
import { IActionState } from "../interfaces/rootState.interface";

export const useAuth = () => {
  const { state } = useContext(DataContext);
  const { notify } = state;
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const getUser = async (
    dispatch: React.Dispatch<IActionState<any>>
  ): Promise<IUser | null> => {
    try {
      setLoading(true);
      const response = await request({ url: "/api/auth/me" });
      if (response.errors) {
        dispatch(setNotify({ ...notify, errors: response.errors }));
        setLoading(false);
        setIsAuthenticated(false);
        return null;
      }
      if (!response.data.user) {
        dispatch(
          setNotify({ ...notify, errors: [{ msg: "Something went wrong" }] })
        );
        setLoading(false);
        setIsAuthenticated(false);
        return null;
      }
      setLoading(false);
      setIsAuthenticated(true);
      return response.data.user;
    } catch (error) {
      dispatch(
        setNotify({ ...notify, errors: [{ msg: "Something went wrong" }] })
      );
      setLoading(false);
      setIsAuthenticated(false);
      return null;
    }
  };
  return { loading, isAuthenticated, getUser };
};
