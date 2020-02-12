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
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import io from "socket.io";

import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
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
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true
  })
);

(async () => {
  await createConnection();
  const check = async (req, res, next) => {
    if (req.method === "POST" && req.body.device === undefined)
      return res.status(401).send({ error: "no device" });
    const token = req.headers.authorization.replace("Bearer ", "");
    if (token === "null") {
      const deviceRepo = getRepository(Devices);
      const device = await deviceRepo.findOne({
        where: { hash: req.body.device }
      });
      return res.status(401).send({ error: "new tolken needed" });
    }
    jwt.verify(token, process.env.SACRET);
    if (jwt) {
      console.log("APROOVED");
      next();
    } else {
      console.log("failure to verify");
      return res.status(404).send();
    }
  };

  const markers = [
    {
      name: "frogass",
      found: false
    },
    { name: "meepo", found: false },
    { name: "teemo", found: false }
  ];

  ws.use((socket, next) => {
    try {
      jwt.verify(socket.handshake.query.token, process.env.SACRET);
      return next();
    } catch {
      return next(new Error("authentication error"));
    }
  });

  ws.on("connection", socket => {
    console.log("a user has connected");
    socket.join(socket.handshake.query.device);
    socket.on("disconnect", () => console.log("a user has disconnected"));
    socket.on("code", code => {
      console.log("SENDING CODE");
      const newMarkers = markers.map(m => {
        if (m.name === code) {
          m.found = true;
        }
        return m;
      });
      socket.to(socket.handshake.query.device).emit("markers", newMarkers);
    });

    socket.on("get_markers", () => {
      console.log("SENDING MARKERS");
      socket.emit("markers", markers);
    });

    // socket.on("device_hash", async hash => {
    //   const deviceRepo = getRepository(Devices);
    //   const device = await deviceRepo.findOne({ where: { hash } });
    //   if (!device) {
    //     const newDevice = new Devices();
    //     newDevice.hash = hash;
    //     deviceRepo.save(newDevice);
    //     console.log("new usdeviceer");
    //   } else {
    //     console.log("user already exists");
    //   }
    // });
  });

  app.post("/", check, async (req, res) => {
    const { code } = req.body;
    const deviceRepo = getRepository(Devices);
    const devices = await deviceRepo.find();

    const token = jwt.sign({ code }, process.env.SACRET);
    return res.send({ token });
  });

  app.post("/token", async (req, res) => {
    console.log(req.body, "tolken body");
    const token = jwt.sign({ device: req.body.device }, process.env.SACRET);
    return res.send({ token });
  });

  app.post("/auth_device", async (req, res) => {
    const { device } = req.body;
    const deviceRepo = getRepository(Devices);
    const devices = await deviceRepo.findOne({ where: { hash: device } });
    console.log(devices);
    if (!devices) {
      // const newDevice = new Devices();
      // newDevice.hash = device;
      // deviceRepo.save(newDevice);
      // return res.send({ message: "new device created" });
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

  app.post("/register_device", async (req, res) => {
    const { hash } = req.body;
    const deviceRepo = getRepository(Devices);
    const newDevice = new Devices();
    newDevice.hash = hash;
    deviceRepo.save(newDevice);
    return res.send({ message: "new_device_created" });
  });

  app.post("/new_token", async (req, res) => {
    const { hash } = req.body;
    const deviceRepo = getRepository(Devices);
    const device = await deviceRepo.findOne({ where: { hash } });
    if (device) {
      const token = jwt.sign(device.hash, process.env.SACRET);
      return res.send({ token });
    }
    return res.status(500).send({ error: "device not found" });
  });

  server.listen(4000);
})();
