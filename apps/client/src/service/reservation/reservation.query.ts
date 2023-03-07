import { gql } from "@apollo/client";

export const GET = gql`
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

export const CREATE = gql`
  mutation CreateReservation($deskId: Float!, $date: DateTime!) {
    createReservation(deskId: $deskId, date: $date) {
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

export const REMOVE = gql`
  mutation RemoveReservation($id: Float!) {
    removeReservation(id: $id)
  }
`;
