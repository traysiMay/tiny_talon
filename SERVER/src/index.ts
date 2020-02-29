import "reflect-metadata";
const path = require("path");
require("dotenv").config(
  process.env.NODE_ENV === "development" && {
    path: path.resolve(__dirname, "../.env.development")
  }
);

import { createConnection } from "typeorm";

import express from "express";
import session from "express-session";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import io from "socket.io";

import jwt from "jsonwebtoken";
import routes from "./routes";
import sockets from "./sockets";
/*
OTHER USER CENTRIC STUFF
:: CONNECT DEVICE TO GAME OBJECTS
:: GAME OBJECTS DEFINE WHAT A USER HAS FOUND
:: GAME OBJECTS DEFINE GAME STATE FOR A GIVEN HUNT

EVENTS
:: USER FINDS OBJECT
:: USER FINDS ALL OBJECTS
:: USER GETS THEIR OBJECTS - E.G. UPDATE VS LOAD STATE
*/
const app = express();
const server = http.createServer(app);
export const ws = io(server);

app.use(bodyParser.json());
app.use(session({ secret: process.env.SSACRET }));
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true
  })
);

(async () => {
  await createConnection();

  ws.use((socket, next) => {
    try {
      jwt.verify(socket.handshake.query.token, process.env.SACRET);
      return next();
    } catch {
      return next(new Error("authentication error"));
    }
  });

  ws.on("connection", sockets);

  app.use("/hunt", routes);

  server.listen(4000);
})();
