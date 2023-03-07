import { client } from "../../ApolloClient/client";
import { CREATE, LOGIN, GET } from "./user.query";

const methods = {
  async create(username: string, password: string) {
    try {
      const response = await client.mutate({
        mutation: CREATE,
        variables: {
          username,
          password,
        },
      });

      return response.data;
    } catch (e: any) {
      console.log(e.message);
    }
  },

  async login(username: string, password: string) {
    try {
      const response = await client.mutate({
        mutation: LOGIN,
        variables: {
          username,
          password,
        },
      });

      return response.data;
    } catch (e: any) {
      console.log(e.message);
    }
  },

  async get() {
    try {
      const response = await client.query({
        query: GET,
      });

      return response.data.user;
    } catch (e: any) {
      console.log(e.message);
    }
  },
};
export default methods;
