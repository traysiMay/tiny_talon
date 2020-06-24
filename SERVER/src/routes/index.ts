import { Router } from "express";
import { getRepository } from "typeorm";
import { Devices } from "../entity/Devices";
import jwt from "jsonwebtoken";
import { Emails } from "../entity/Emails";
import { Markers } from "../entity/Markers";
import { Series } from "../entity/Series";
import { Hunts } from "../entity/Hunts";
import { Rsvps } from "../entity/Rsvps";
import { release } from "os";

const routes = Router();

const authDevice = async (req, res) => {
  const { device } = req.body;
  console.log(device);
  const deviceRepo = getRepository(Devices);
  const devices = await deviceRepo.findOne({ where: { hash: device } });
  if (!devices) {
    return res.status(401).send({ error: "device_not_registered" });
  } else {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // return res.status(401).send({ error: "no_token" });
      return res.status(401).send({ error: "no_auth_header" });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (token === "null") {
      return res.status(401).send({ error: "no_token" });
    }
    if (token) {
      try {
        jwt.verify(token, process.env.SACRET);
        req.token = token;
      } catch {
        return res.status(401).send({ error: "BAD_TOKEN" });
      }
      return res.send({ message: "verified" });
    }
    return res.send({ message: "device_exists" });
  }
};

const registerDevice = async (req, res) => {
  let { email, hash } = req.body;
  email = email.toLowerCase();
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

  const token = jwt.sign(
    { hash, email, id: registeredEmail.id },
    process.env.SACRET
  );
  return res.send({ message: "new_device_created", token });
};

const releaseDevice = async (req, res) => {
  const { hash, id } = res.locals.jwtInfo;
  const deviceRepo = getRepository(Devices);
  const device = await deviceRepo.findOne({ where: { hash, emailId: id } });
  await deviceRepo.delete(device);
  res.send({ success: true });
};

const newToken = async (req, res) => {
  const { hash } = req.body;
  const deviceRepo = getRepository(Devices);
  const device = await deviceRepo.findOne({
    where: { hash },
    relations: ["email"],
  });
  if (device) {
    const {
      email: { email, id },
    } = device;
    const token = jwt.sign({ email, hash, id }, process.env.SACRET);
    return res.send({ token });
  }
  return res.status(500).send({ error: "DEVICE_NOT_FOUND" });
};

const getSeries = async (req, res) => {
  const seriesId = req.query.seriesId;
  const seriesRepo = getRepository(Series);
  const series = await seriesRepo.findOne(seriesId);
  res.send(series);
};

const getAllSeries = async (_, res) => {
  const seriesRepo = getRepository(Series);
  const series = await seriesRepo.find();
  res.send(series);
};

const getAllUserSeries = async (req, res) => {
  const { id } = res.locals.jwtInfo;
  const seriesRepo = getRepository(Series);
  const globalAndUsers = await seriesRepo
    .createQueryBuilder("series")
    .leftJoin("series.hunts", "hunts")
    .leftJoinAndSelect("hunts.emails", "emails")
    .where("emails.id = :id", { id })
    .orWhere("series.type = 'global'")
    .getMany();

  if (globalAndUsers.length === 0) {
    const emailRepo = getRepository(Emails);
    const user = await emailRepo.findOne(id);
    if (!user) {
      return res.status(500).send({ error: "USER_NOT_FOUND" });
    }
  }
  return res.send(globalAndUsers);
};

const seriesReady = async (req, res) => {
  const { id } = req.body;
  const seriesRepo = getRepository(Series);
  const series = await seriesRepo.findOne(id);
  if (!series) return res.status(404).send({ error: "NOT_FOUND" });
  const { init: ready } = series;
  res.send({ ready });
};

const sendSeries = async (req, res) => {
  const { cat, description, name } = req.body;
  const seriesRepo = getRepository(Series);
  const series = new Series();
  series.type = cat;
  series.description = description;
  series.name = name;
  await seriesRepo.save(series);
  res.send({ message: "SUCCESS" });
};

const createMarker = async (req, res) => {
  const { name, hash, details, series, lat, lng } = req.body;
  const markerRepo = getRepository(Markers);
  const marker = new Markers();
  marker.name = name;
  marker.hash = hash;
  marker.description = details;
  marker.series = series;
  marker.lat = lat;
  marker.lng = lng;

  await markerRepo.save(marker);

  res.send({ message: "SUCCESS" });
};

const createHunt = async (req, res) => {
  const { email, id } = req.body;
  const huntRepo = getRepository(Hunts);
  const emailRepo = getRepository(Emails);
  const seriesRepo = getRepository(Series);
  const hunt = new Hunts();
  hunt.emails = await emailRepo.findOne({ where: { email } });
  hunt.series = await seriesRepo.findOne({ id });
  hunt.marker_map = [];
  if (!hunt.emails) return res.status(404).send({ error: "NO_EMAIL" });
  if (!hunt.series) return res.statu(404).send({ error: "NO_SERIES" });
  await huntRepo.save(hunt);
  return res.send({ message: "yay" });
};

const getPlace = async (req, res) => {
  const { id } = req.body;
  const { id: userId } = res.locals.jwtInfo;
  const huntRepo = getRepository(Hunts);
  const hunts = await huntRepo
    .createQueryBuilder("hunts")
    .leftJoin("hunts.series", "series")
    .leftJoinAndSelect("hunts.emails", "emails")
    .where("series.id = :id", { id })
    .orderBy({ completed_at: "ASC" })
    .getMany();
  const place = hunts.reduce(
    (ac, cv) => {
      if (cv.emails.id === userId) {
        return { place: ac.outof + 1, outof: ac.outof + 1 };
      }
      return { ...ac, outof: ac.outof + 1 };
    },
    { place: 0, outof: 0 }
  );
  return res.send({ place });
};

const createRsvp = async (req, res) => {
  const { id } = res.locals.jwtInfo;
  const { seriesId } = req.body;
  const rsvpRepo = getRepository(Rsvps);
  const rsvp = new Rsvps();
  rsvp.email = id;
  rsvp.series = seriesId;
  rsvpRepo.save(rsvp);
  return res.send({ success: true });
};

const tokenToReq = (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  let jwtInfo;
  try {
    jwtInfo = jwt.verify(token, process.env.SACRET);
    res.locals.jwtInfo = jwtInfo;
  } catch (error) {
    res.status(401).send({ error: "BAD_TOKEN" });
    return;
  }
  next();
};

routes.get("/get_series", getSeries);
routes.get("/all_series", getAllSeries);
routes.get("/all_user_series", [tokenToReq], getAllUserSeries);
routes.post("/get_place", tokenToReq, getPlace);
routes.post("/series_ready", seriesReady);
routes.post("/auth_device", authDevice);
routes.post("/register_device", registerDevice);
routes.post("/new_token", newToken);
routes.post("/send_series", sendSeries);
routes.post("/create_marker", createMarker);
routes.post("/create_hunt", createHunt);
routes.post("/create_rsvp", [tokenToReq], createRsvp);
routes.delete("/release_device", [tokenToReq], releaseDevice);

export default routes;
