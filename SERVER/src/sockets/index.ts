import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Markers } from "../entity/Markers";

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
  { name: "frogass", lat: 40.66257, lng: -73.968564 },
  { name: "meepo", lat: 40.66257, lng: -73.969564 },
  { name: "teemo", lat: 40.66357, lng: -73.968564 }
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
      marker.hash = m.name;
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
};

export default sockets;
