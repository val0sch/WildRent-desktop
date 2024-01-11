import "reflect-metadata";
import * as dotenv from "dotenv";
import datasource from "./lib/datasource";
import datasourceSqlite from "./lib/datasourceSqlite";
import typeDefs from "./typeDefs";
import fs from "fs";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import express from "express";
import http from "http";

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
import cookieParser from "cookie-parser";
import SessionService from "./services/session.service";

dotenv.config();

// Initialisation des instances Express et des serveurs HTTP
const app = express();
const appIO = express();
const httpServer = http.createServer(app);
const IoHttpServer = http.createServer(appIO);

const start = async () => {
  // Initialisation des sources de données
  await datasource.initialize();
  await datasourceSqlite.initialize();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });
  await server.start();

  // Configuration d'Express avec les middleware nécessaires
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
        // Configuration du contexte Apollo Server avec des informations personnalisées
        // telles que l'utilisateur, la session, etc.
        //configuration du middleware pour Apollo Server dans une application Express.
        // Il définit une fonction de contexte qui sera appelée à chaque requête GraphQL,
        //permettant de configurer le contexte Apollo Server.
        // Le contexte est un objet qui peut être utilisé pour stocker des informations utiles pour le traitement de la requête.
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
          const expireTime = time + 3600 * 24 * 1000;
          date.setTime(expireTime);
          session = await new SessionService().createSession(user?.id);

          res.cookie("sessionId", session.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: date,
          });
        } else {
          // on reinitialise le temps du cookie
          res.cookie("sessionId", req.cookies.sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(Date.now() + 3600 * 24 * 1000),
          });
          const sessionId = req.cookies.sessionId;
          session = await new SessionService().findSession(sessionId);
        }
        return { user, res, session };
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

  const users: {
    userID: string;
    userEmail: string;
    isSelected: boolean;
    messages: any;
  }[] = [];
  // Listing all users ,  we send all existing users to the client:
  io.on("connection", (socket): any => {
    // console.log("ID =========> ", socket.id);
    const newUser = {
      userID: socket.id,
      userEmail: socket.data.userEmail,
      isSelected: false,
      messages: [],
    };

    const userExist = users.find((u) => u.userEmail === socket.data.userEmail);
    console.log("USER =========> ", userExist);
    if (!userExist) {
      users.push(newUser);
    }

    io.emit("users", users);
    // forward the private message to the right recipient
    socket.on("privateMessage", ({ messageData, to }) => {
      console.log("messageData =======>", messageData);

      socket.to(to).emit("privateMessage", {
        messageData,
        from: socket.id,
      });
    });

    // notify users upon disconnection
    socket.on("disconnect", () => {
      const userIndex = users.findIndex((user) => user.userID === socket.id);
      users.splice(userIndex, 1);
      console.log("USERS after disconnected", users);
      // socket.broadcast.emit("userDisconnected", socket.id);
      socket.emit("users", users);
    });
  });

  await new Promise<void>((resolve) => IoHttpServer.listen(3001, resolve));
  console.log("🚀 Server ready at http://localhost:3001");

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);

  // Création d'un fichier temporaire
  fs.open("./src/gen.temp", "w", function (err, fd) {
    fs.close(fd);
  });
};

// Exécution de la fonction de démarrage
start();

// Pour Valérie erreur de processus qui ne s'arrête pas correctement :
// Gestion d'erreurs liées à la sortie standard (stdout) et terminaison du processus
process.stdout.on("error", function (err) {
  // console.log("process error", err);
  if (err.code == "EPIPE") {
    process.exit(0);
    // process.stdin.resume();
  }
});
// Gestion du signal SIGTERM pour la terminaison propre du processus
process.on("SIGTERM", () => {
  process.exit(0);
});
