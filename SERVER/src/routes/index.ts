import { Router } from "express";
import { getRepository } from "typeorm";
import { Devices } from "../entity/Devices";
import jwt from "jsonwebtoken";
import { Emails } from "../entity/Emails";
import { Markers } from "../entity/Markers";

const routes = Router();

const authDevice = async (req, res) => {
  const { device } = req.body;
  const deviceRepo = getRepository(Devices);
  const devices = await deviceRepo.findOne({ where: { hash: device } });
  if (!devices) {
    return res.status(401).send({ error: "device_not_registered" });
  } else {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "no_token" });
    }
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
};

const markers = [
  { name: "frogass", lat: 40.66257, lng: -73.968564, hash: "0xfrogass" },
  { name: "meepo", lat: 40.66257, lng: -73.969564, hash: "0xmeepo" },
  { name: "teemo", lat: 40.66357, lng: -73.968564, hash: "0xteemo" }
];

const registerDevice = async (req, res) => {
  const { email, hash } = req.body;

  const emailRepo = getRepository(Emails);
  let registeredEmail = await emailRepo.findOne({ where: { email } });

  if (!registeredEmail) {
    registeredEmail = new Emails();
    registeredEmail.email = email;
    registeredEmail = await emailRepo.save(registeredEmail);

    const markerRepo = getRepository(Markers);
    markers.map(m => {
      const marker = new Markers();
      marker.cat = "meiosis";
      marker.email = registeredEmail;
      marker.name = m.name;
      marker.hash = m.hash;
      marker.lat = JSON.stringify(m.lat);
      marker.lng = JSON.stringify(m.lng);
      markerRepo.save(marker);
    });
  }

  const deviceRepo = getRepository(Devices);
  const newDevice = new Devices();
  newDevice.hash = hash;
  newDevice.email = registeredEmail;
  deviceRepo.save(newDevice);
  return res.send({ message: "new_device_created" });
};

const newToken = async (req, res) => {
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
};

routes.post("/auth_device", authDevice);
routes.post("/register_device", registerDevice);
routes.post("/new_token", newToken);

export default routes;
