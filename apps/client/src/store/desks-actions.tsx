import { desksActions } from "./desks";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import deskService from "../service/desk/desk.service";

export const fetchDesks = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const desks = await deskService.get();

      dispatch(desksActions.replaceItems(desks));
    } catch (e) {
      console.log("ERROR");
    }
  };
};

export const addDesk = (name: string, description: string, order: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newDesk = await deskService.create(name, description, order);
      dispatch(desksActions.addItem(newDesk));
    } catch (e) {
      console.log("ERROR");
    }
  };
};

export const removeDesk = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const isRemoved = await deskService.remove(id);

      if (isRemoved) {
        dispatch(desksActions.removeItem(id));
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
