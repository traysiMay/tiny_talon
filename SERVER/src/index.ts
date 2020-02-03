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

const app = express();
const server = http.createServer(app);
const ws = io(server);

app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT, credentials: true }));

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

  ws.on("connection", socket => {
    console.log("a user is connected");
    socket.on("auth", token => {
      try {
        jwt.verify(token, process.env.SACRET);
      } catch (error) {
        socket.disconnect();
        console.log("disconnected");
      }
    });
    socket.on("disconnect", () => console.log("a user has disconnected"));
    socket.emit("ping", "pong");

    socket.on("device_hash", async hash => {
      const deviceRepo = getRepository(Devices);
      const device = await deviceRepo.findOne({ where: { hash } });
      if (!device) {
        const newDevice = new Devices();
        newDevice.hash = hash;
        deviceRepo.save(newDevice);
        console.log("new usdeviceer");
      } else {
        console.log("user already exists");
      }
    });
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
    if (!devices) {
      const newDevice = new Devices();
      newDevice.hash = device;
      deviceRepo.save(newDevice);
      return res.send({ message: "new device created" });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        const verify = jwt.verify(token, process.env.SACRET);
        return res.send({ message: "verified" });
      }
      return res.send({ message: "device already exists" });
    }
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
