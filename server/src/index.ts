import * as dotenv from "dotenv";
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
          // console.log("req.headers.authorization", req.headers.authorization);
          const payload = (await new UserService().getAndCheckToken(
            req.headers.authorization
          )) as any;
          if (payload) {
            // console.log("payload", payload);
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

  // TODO FINIR ET EXTERNALISER Configuration et démarrage du serveur Socket.IO
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
  io.on("connection", (socket): any => {
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
    console.log(" balallala", users);

    // notify existing users
    socket.broadcast.emit("userConnected", {
      userID: socket.id,
      userEmail: socket.data.userEmail,
    });

    // forward the private message to the right recipient
    // socket.on("privateMessage", ({ messageData, to }) => {
    //   socket.to(to).emit("privateMessage", {
    //     messageData,
    //     from: socket.id,
    //   });
    // });
    socket.on("send_private_message", ({ messageData, to }) => {
      socket.to(to).emit("receive_private_message", {
        messageData,
        from: socket.id,
      });
    });

    // notify users upon disconnection
    socket.on("disconnect", () => {
      console.log("diconnected", socket.id);
      socket.broadcast.emit("userDisconnected", socket.id);
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
  console.log("process error", err);
  if (err.code == "EPIPE") {
    process.exit(0);
    // process.stdin.resume();
  }
});
// Gestion du signal SIGTERM pour la terminaison propre du processus
process.on("SIGTERM", () => {
  process.exit(0);
});
