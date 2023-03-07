import { client } from "../../ApolloClient/client";
import { CREATE, GET, REMOVE } from "./desk.query";

const methods = {
  async remove(id: number) {
    const response = await client.mutate({
      mutation: REMOVE,
      variables: {
        id,
      },
    });

    return response.data.removeDesk;
  },

  async get() {
    const response = await client.query({
      query: GET,
    });

    return response.data.desks;
  },

  async create(name: string, description: string, order: number) {
    const response = await client.mutate({
      mutation: CREATE,
      variables: {
        name,
        description,
        order,
      },
    });

    return response.data.createDesk;
  },
};
export default methods;
