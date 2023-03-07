import { client } from "../../ApolloClient/client";
import { GET, CREATE, REMOVE } from "./reservation.query";

const methods = {
  async get(date: string) {
    const response = await client.query({
      query: GET,
      variables: {
        date,
      },
    });

    return response.data.reservations;
  },

  async create(deskId: number, date: Date) {
    const response = await client.mutate({
      mutation: CREATE,
      variables: {
        deskId,
        date,
      },
    });

    return response.data.createReservation;
  },

  async remove(id: number) {
    const response = await client.mutate({
      mutation: REMOVE,
      variables: {
        id,
      },
    });

    return response.data.removeReservation;
  },
};
export default methods;
