import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Devices } from "./entity/Devices";

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

import io from "socket.io";
const app = express();
const server = http.createServer(app);
const ws = io(server);
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

(async () => {
  await createConnection();
  ws.on("connection", socket => {
    console.log("a user is connected");
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

  app.post("/", async (req, res) => {
    console.log(req.body.code);
    const deviceRepo = getRepository(Devices);
    const devices = await deviceRepo.find();
    return res.send("heyaaa");
  });

  server.listen(4000);
})();
