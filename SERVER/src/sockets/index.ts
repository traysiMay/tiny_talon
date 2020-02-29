import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Markers } from "../entity/Markers";
import { ws } from "../index";

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

const markers = [
  { name: "frogass", lat: 40.66257, lng: -73.968564, hash: "0xfrogass" },
  { name: "meepo", lat: 40.66257, lng: -73.969564, hash: "0xmeepo" },
  { name: "teemo", lat: 40.66357, lng: -73.968564, hash: "0xteemo" }
];

const sockets = async socket => {
  console.log("a user has connected");
  // probably put this in a get request
  const decoded = jwt.verify(socket.handshake.query.token, process.env.SACRET);

  const isMarkers = await getRaptorsMarkers(socket.handshake.query.token);
  if (isMarkers.length === 0) {
    const markerRepo = getRepository(Markers);
    markers.map(m => {
      const marker = new Markers();
      marker.cat = "meiosis";
      marker.email = decoded.id;
      marker.name = m.name;
      marker.hash = m.hash;
      marker.lat = JSON.stringify(m.lat);
      marker.lng = JSON.stringify(m.lng);
      markerRepo.save(marker);
    });
  }

  socket.join(decoded.id);
  socket.on("disconnect", () => console.log("a user has disconnected"));

  socket.on("code", async code => {
    console.log("SENDING CODE");
    const markerz = await getRaptorsMarkers(socket.handshake.query.token);
    let message = "that aint right";
    let win = true;
    const newMarkers = markerz.map(m => {
      if (m.hash === code) {
        if (m.found === true) {
          message = "you already found this one!";
        } else {
          message = "cool find!";
          m.found = true;
        }
      }
      if (m.found === false) win = false;
      return m;
    });
    console.log(message);
    console.log(win);
    const markerRepo = getRepository(Markers);
    markerRepo.save(newMarkers);
    socket.emit("code_response", message);
    socket.to(decoded.id).emit("markers", newMarkers);
    console.log(decoded.id);
    if (win === true) ws.in(decoded.id).emit("win", "you_win");
  });

  socket.on("get_markers", async () => {
    console.log(decoded.id);
    console.log("SENDING MARKERS");
    const markerz = await getRaptorsMarkers(socket.handshake.query.token);
    socket.emit("markers", markerz);
  });
};

export default sockets;
