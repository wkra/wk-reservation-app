import { client } from "../../ApolloClient/client";
import { CREATE, GET, REMOVE } from "./desk.query";

const methods = {
  async remove(id: number) {
    try {
      const response = await client.mutate({
        mutation: REMOVE,
        variables: {
          id,
        },
      });

      return response.data.removeDesk;
    } catch (e: any) {
      console.log(e.message);
    }
  },

  async get() {
    const response = await client.query({
      query: GET,
    });

    return response.data.desks;
  },

  async create(name: string, description: string, order: number) {
    try {
      const response = await client.mutate({
        mutation: CREATE,
        variables: {
          name,
          description,
          order,
        },
      });

      return response.data.createDesk;
    } catch (e: any) {
      console.log(e.message);
    }
  },
};
export default methods;
