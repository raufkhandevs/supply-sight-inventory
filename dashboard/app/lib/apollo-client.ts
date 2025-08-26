import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { config } from "../config/env";

const httpLink = createHttpLink({
  uri: config.apollo.uri,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});
