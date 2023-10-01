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
import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../src/index.d";

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

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(IoHttpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // io.on("connection", (socket) => {
  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   console.log("USERJOIN ROOM");
  // });
  // socket.on("send_message", (data: any) => {
  //   socket.to(data.room).emit("receive_message", data);
  //   console.log("USER SEND MESSAGE");
  // });
  // console.log(socket.id);
  // socket.on("send_message", (data: any) => {
  //   socket.broadcast.emit("receive_message", data);
  // });
  // });

  // On the server-side, we register a middleware which checks the username and allows the connection:
  //    The username is added as an attribute of the socket object, in order to be reused later.
  //    You can attach any attribute, as long as you don't overwrite an existing one like socket.id or socket.handshake.
  io.use((socket, next) => {
    const userEmail: string = socket.handshake.auth.userEmail;
    if (!userEmail) {
      return next(new Error("invalid username"));
    }
    socket.data.userEmail = userEmail;
    next();
  });

  // Listing all users ,  we send all existing users to the client:
  io.on("connection", (socket) => {
    // fetch existing users
    const users: { userID: any; userEmail: any }[] = [];
    // We are looping over the io.of("/").sockets object, which is a Map of all currently connected Socket instances, indexed by ID.
    for (let [id, socket] of io.of("/").sockets as any) {
      const newUser = {
        userID: id,
        userEmail: socket.data.userEmail,
      };

      const emailExists = users.some(
        (user) => user.userEmail === newUser.userEmail
      );
      if (!emailExists) {
        users.push(newUser);
      }
    }
    socket.emit("users", users);

    // notify existing users
    socket.broadcast.emit("userConnected", {
      userID: socket.id,
      userEmail: socket.data.userEmail,
    });

    // forward the private message to the right recipient
    socket.on("privateMessage", ({ messageData, to }) => {
      socket.to(to).emit("privateMessage", {
        messageData,
        from: socket.id,
      });
    });

    // notify users upon disconnection
    socket.on("disconnect", () => {
      socket.broadcast.emit("userDisconnected", socket.id);
    });
  });

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

// Pour Valérie erreur de processus qui ne s'arrête pas correctement :
process.stdout.on("error", function (err) {
  console.log("process error", err);
  if (err.code == "EPIPE") {
    process.exit(0);
    // process.stdin.resume();
  }
});

process.on("SIGTERM", () => {
  process.exit(0);
});
