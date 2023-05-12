import * as dotenv from "dotenv";
dotenv.config();
import datasource from "./lib/datasource";
import typeDefs from "./typeDefs";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import express from "express";
import http from "http";

import "reflect-metadata";
import cors from "cors";
import { json } from "body-parser";
import resolvers from "./resolvers";

const app = express();
const httpServer = http.createServer(app);

const start = async () => {
  await datasource.initialize();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await server.start();

   app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    }),
    json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

start();