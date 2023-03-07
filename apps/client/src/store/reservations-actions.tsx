import { gql } from "@apollo/client";
import { client } from "../ApolloClient/client";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { reservationsActions } from "./reservations";
import reservationService from "../service/reservation/reservation.service";
import { setMidnight } from "./../helpers/date.helper";

export const fetchReservations = (date: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const reservations = await reservationService.get(date);

      dispatch(reservationsActions.replaceItems(reservations));
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const addReservation = (deskId: number, date: string) => {
  const preparedDate = setMidnight(date);

  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newReservation = await reservationService.create(
        deskId,
        preparedDate
      );
      dispatch(reservationsActions.addItem(newReservation));
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const removeReservation = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const isRemoved = await reservationService.remove(id);

      if (isRemoved) {
        dispatch(reservationsActions.removeItem(id));
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
