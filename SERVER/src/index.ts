import "reflect-metadata";
const path = require("path");
require("dotenv").config(
  process.env.NODE_ENV === "development" && {
    path: path.resolve(__dirname, "../.env.development")
  }
);

import { createConnection, getRepository } from "typeorm";
import { Devices } from "./entity/Devices";

import express from "express";
import session from "express-session";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import io from "socket.io";

import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
import { Emails } from "./entity/Emails";
import { Markers } from "./entity/Markers";
/*
ORDER OF CHECKING,
CHECK DEVICE
  NO DEVICE, NO NOTHING
CHECK TOKEN
  NO TOKEN, NO DATA
WEB SOCKET - DEVICE & TOKEN
  OR NOTHING

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
const ws = io(server);

app.use(bodyParser.json());
app.use(session({ secret: process.env.SSACRET }));
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true
  })
);

const markers = [{ name: "frogass" }, { name: "meepo" }, { name: "teemo" }];

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

  const getRaptorsMarkers = async token => {
    const decoded = jwt.verify(token, process.env.SACRET);
    const markerRepo = getRepository(Markers);
    const markerz = await markerRepo
      .createQueryBuilder("markers")
      .leftJoinAndSelect("markers.email", "email")
      .where("email.id = :id", { id: decoded.id })
      .getMany();
    return markerz;
  };

  ws.on("connection", async socket => {
    console.log("a user has connected");
    // probably put this in a get request
    const decoded = jwt.verify(
      socket.handshake.query.token,
      process.env.SACRET
    );

    const isMarkers = await getRaptorsMarkers(socket.handshake.query.token);
    if (isMarkers.length === 0) {
      const markerRepo = getRepository(Markers);
      markers.map(m => {
        const marker = new Markers();
        marker.cat = "meiosis";
        marker.email = decoded.id;
        marker.hash = m.name;
        markerRepo.save(marker);
      });
    }

    socket.join(decoded.id);
    socket.on("disconnect", () => console.log("a user has disconnected"));
    socket.on("code", async code => {
      console.log("SENDING CODE");
      const markerz = await getRaptorsMarkers(socket.handshake.query.token);
      const newMarkers = markerz.map(m => {
        if (m.hash === code) {
          m.found = true;
        }
        return m;
      });

      const markerRepo = getRepository(Markers);
      markerRepo.save(newMarkers);
      socket.to(decoded.id).emit("markers", newMarkers);
    });

    socket.on("get_markers", async () => {
      console.log("SENDING MARKERS");
      const markerz = await getRaptorsMarkers(socket.handshake.query.token);
      socket.emit("markers", markerz);
    });
  });

  // fires as client index mounts
  app.post("/auth_device", async (req, res) => {
    const { device } = req.body;
    const deviceRepo = getRepository(Devices);
    const devices = await deviceRepo.findOne({ where: { hash: device } });
    if (!devices) {
      return res.status(401).send({ error: "device_not_registered" });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        try {
          jwt.verify(token, process.env.SACRET);
        } catch {
          return res.status(401).send({ error: "BAD_TOKEN" });
        }
        return res.send({ message: "verified" });
      }
      return res.send({ message: "device_exists" });
    }
  });

  // fires when register device button is pressed
  app.post("/register_device", async (req, res) => {
    const { email, hash } = req.body;

    const emailRepo = getRepository(Emails);
    let registeredEmail = await emailRepo.findOne({ where: { email } });

    if (!registeredEmail) {
      registeredEmail = new Emails();
      registeredEmail.email = email;
      registeredEmail = await emailRepo.save(registeredEmail);
    }

    const deviceRepo = getRepository(Devices);
    const newDevice = new Devices();
    newDevice.hash = hash;
    newDevice.email = registeredEmail;
    deviceRepo.save(newDevice);
    return res.send({ message: "new_device_created" });
  });

  // fires on connect button which might not be necessary
  app.post("/new_token", async (req, res) => {
    const { hash } = req.body;
    const deviceRepo = getRepository(Devices);
    const device = await deviceRepo.findOne({
      where: { hash },
      relations: ["email"]
    });
    if (device) {
      const {
        email: { id }
      } = device;
      const token = jwt.sign({ hash, id }, process.env.SACRET);
      return res.send({ token });
    }
    return res.status(500).send({ error: "device not found" });
  });

  server.listen(4000);
})();
