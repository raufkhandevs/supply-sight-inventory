export const config = {
  apollo: {
    uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:4000/graphql",
  },
  app: {
    name: "SupplySight",
    version: "1.0.0",
  },
} as const;

export type Config = typeof config;
