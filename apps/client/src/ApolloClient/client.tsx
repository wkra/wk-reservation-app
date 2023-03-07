import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3333/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      // errorPolicy: "ignore",
      errorPolicy: "none",
    },
    query: {
      fetchPolicy: "network-only",
      //   errorPolicy: "all",
      errorPolicy: "none",
    },
    mutate: {
      // errorPolicy: "all",
      errorPolicy: "none",
    },
  },
});
