import "reflect-metadata";
import { startDatabaseConnection } from "./config/database-connection";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import * as express from "express";
import * as http from "http";
import typeDefs from "./type-defs";

async function main() {
  try {
    await startDatabaseConnection();

    const app = express();
    const httpServer = http.createServer(app);

    const { Resolvers } = await import("./resolvers");
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers: Resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    httpServer.listen(process.env.APP_PORT, () => {
      console.log(`🚀 App started on port ${process.env.APP_PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main();

