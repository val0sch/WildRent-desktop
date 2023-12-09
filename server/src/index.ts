import * as dotenv from "dotenv";
dotenv.config();
import datasource from "./lib/datasource";
import datasourceSqlite from "./lib/datasourceSqlite";
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
import cookieParser from "cookie-parser";
import SessionService from "./services/session.service";
const app = express();
const appIO = express();
const httpServer = http.createServer(app);
const IoHttpServer = http.createServer(appIO);

const start = async () => {
  await datasource.initialize();
  await datasourceSqlite.initialize();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });
  await server.start();
  app.use(cookieParser());
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // console.log("REQUEST", req.cookies);

        // console.log("REQUEST HEADERS", req.headers);
        let session = null;
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
        // console.log("SESSION ID IN COOKIES", req.cookies.sessionId);
        // res.clearCookie("sessionId");
        if (!req.cookies.sessionId) {
          //ça pourra aller plus loin si le user est connecté, on ira récupérer la sessionId depuis la base si elle existe

          //créer la session
          const date = new Date();
          const time = date.getTime();
          const expireTime = time + 3600 * 24;
          date.setTime(expireTime);
          session = await new SessionService().createSession(user?.id);
          // console.log("%c⧭", "color: #ff0000", session);

          res.cookie("sessionId", session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: date,
          });
        } else {
          // reinitialiser le temps du cookie
          const sessionId = req.cookies.sessionId;
          session = await new SessionService().findSession(sessionId);
        }
        return { user, res, session };
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
    //   console.log("USERJOIN ROOM");
    // });
    // socket.on("send_message", (data: any) => {
    //   socket.to(data.room).emit("receive_message", data);
    //   console.log("USER SEND MESSAGE");
    // });
    // console.log("socket", socket.id);
    socket.on("send_message", (data: any) => {
      socket.broadcast.emit("receive_message", data);
    });
  });

  // IoHttpServer.listen(3001);
  await new Promise<void>((resolve) => IoHttpServer.listen(3001, resolve));
  // console.log("🚀 Server ready at http://localhost:3001");

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
