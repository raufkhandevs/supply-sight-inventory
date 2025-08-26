import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

async function startApolloServer() {
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error("GraphQL Error:", error);
      return {
        message: error.message,
        path: error.path,
      };
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
    context: async ({ req }) => ({ token: req.headers.token }),
  });

  console.log(`🚀 Apollo Server ready at ${url}`);
  console.log(`🔍 GraphQL Playground: ${url}`);
}

startApolloServer().catch((error) => {
  console.error("Failed to start Apollo Server:", error);
  process.exit(1);
});
