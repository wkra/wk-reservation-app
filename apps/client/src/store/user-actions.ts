import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { userActions } from "./user";
import userService from "./../service/user/user.service";

export const fetchUser = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const user = await userService.get();

      dispatch(userActions.setUser(user));
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    window.localStorage.removeItem("token");

    dispatch(userActions.resetUser());
  };
};
