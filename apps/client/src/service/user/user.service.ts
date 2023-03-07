import { client } from "../../ApolloClient/client";
import { CREATE, LOGIN } from "./user.query";

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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  },
};
export default methods;
