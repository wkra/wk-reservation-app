import { gql } from '@apollo/client';
import { client } from '../ApolloClient/client';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { reservationsActions } from './reservations';

const GET_RESERVATIONS = gql`
  query getReservations($date: DateTime!) {
    reservations(date: $date) {
      id
      date
      desk {
        id
        name
        description
        order
      }
      user {
        username
      }
    }
  }
`;

const CREATE_RESERVATION = gql`
  mutation CreateReservation(
    $userId: Float!
    $deskId: Float!
    $date: DateTime!
  ) {
    createReservation(userId: $userId, deskId: $deskId, date: $date) {
      id
      date
      desk {
        id
        name
        description
        order
      }
      user {
        username
      }
    }
  }
`;

const REMOVE_RESERVATION = gql`
  mutation RemoveReservation($id: Float!) {
    removeReservation(id: $id)
  }
`;

export const fetchReservations = (date: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const fetchDesksQuery = async () => {
      const response = await client.query({
        query: GET_RESERVATIONS,
        variables: {
          date,
        },
      });

      return response.data.reservations;
    };

    try {
      const reservations = await fetchDesksQuery();

      dispatch(reservationsActions.replaceItems(reservations));
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const addReservation = (
  userId: number,
  deskId: number,
  date: string
) => {
  const preparedDate = new Date(date);
  preparedDate.setHours(0);

  return async (dispatch: Dispatch<AnyAction>) => {
    const addReservationMutation = async () => {
      const response = await client.mutate({
        mutation: CREATE_RESERVATION,
        variables: {
          userId,
          deskId,
          date: preparedDate,
        },
      });

      return response.data.createReservation;
    };

    try {
      const newReservation = await addReservationMutation();
      dispatch(reservationsActions.addItem(newReservation));
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const removeReservation = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const removeReservationMutation = async () => {
      const response = await client.mutate({
        mutation: REMOVE_RESERVATION,
        variables: {
          id,
        },
      });

      return response.data.removeReservation;
    };

    try {
      const isRemoved = await removeReservationMutation();

      if (isRemoved) {
        dispatch(reservationsActions.removeItem(id));
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
