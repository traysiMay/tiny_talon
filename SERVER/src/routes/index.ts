import { Router } from "express";
import { getRepository } from "typeorm";
import { Devices } from "../entity/Devices";
import jwt from "jsonwebtoken";
import { Emails } from "../entity/Emails";

const routes = Router();

const authDevice = async (req, res) => {
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
};

const registerDevice = async (req, res) => {
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
