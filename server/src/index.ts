import * as dotenv from "dotenv";
dotenv.config();
import datasource from "./lib/datasource";
import typeDefs from "./typeDefs";
import fs from "fs";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import express from "express";
import http from "http";

import "reflect-metadata";
import cors from "cors";
import { json } from "body-parser";
import resolvers from "./resolvers";
import UserService from "./services/user.service";
import { Server } from "socket.io";

const app = express();
const appIO = express();
const httpServer = http.createServer(app);
const IoHttpServer = http.createServer(appIO);

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
    expressMiddleware(server, {
      context: async ({ req }) => {
        let user = null;
        if (req.headers.authorization) {
          const payload = (await new UserService().getAndCheckToken(
            req.headers.authorization
          )) as any;
          if (payload) {
            const email = payload.email;
            user = await new UserService().findByEmail(email);
          }
        }
        return { user };
      },
    })
  );

  const io = new Server(IoHttpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    // socket.on("join_room", (data) => {
    //   socket.join(data);
    // });
    // socket.on("send_message", (data: any) => {
    //   socket.to(data.room).emit("receive_message", data);
    // });
    // console.log("user join", socket.id);
    console.log("userconnected");
    socket.on("send_message", (data: any) => {
      socket.broadcast.emit("receive_message", data);
    });
  });

  // IoHttpServer.listen(3001);
  await new Promise<void>((resolve) => IoHttpServer.listen(3001, resolve));
  console.log("🚀 Server ready at http://localhost:3001");

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  fs.open("./src/gen.temp", "w", function (err, fd) {
    fs.close(fd);
  });
};

start();
