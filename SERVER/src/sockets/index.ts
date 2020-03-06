import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { ws } from "../index";
import { Hunts } from "../entity/Hunts";

const getRaptorsMarkers = async (token, id) => {
  // GET THE HUNT.ID FROM THE URL?? OR IN THE BODY??
  const decoded = jwt.verify(token, process.env.SACRET);
  console.log(decoded.id, id);
  const huntsRepo = getRepository(Hunts);
  const hunts = await huntsRepo
    .createQueryBuilder("hunts")
    .leftJoinAndSelect("hunts.series", "series")
    .leftJoinAndSelect("series.markers", "markers")
    .leftJoinAndSelect("hunts.emails", "emails")
    .where("hunts.id = :hid", { hid: id })
    .andWhere("emails.id = :eid", { eid: decoded.id })
    .getOne();
  const {
    series: { markers }
  } = hunts;
  return { markers, markerMap: hunts.marker_map };
};

const sockets = async socket => {
  console.log("a user has connected");
  // probably put this in a get request

  const decoded = jwt.verify(socket.handshake.query.token, process.env.SACRET);

  socket.join(decoded.id);
  socket.on("disconnect", () => console.log("a user has disconnected"));

  socket.on("code", async code => {
    console.log("SENDING CODE");

    const huntsRepo = getRepository(Hunts);
    const hunts = await huntsRepo
      .createQueryBuilder("hunts")
      .leftJoinAndSelect("hunts.series", "series")
      .leftJoinAndSelect("series.markers", "markers")
      .leftJoinAndSelect("hunts.emails", "emails")
      .where("markers.hash = :hash", { hash: code })
      .andWhere("emails.id = :eid", { eid: decoded.id })
      .getOne();
    const {
      series: { markers }
    } = hunts;
    let message = "that aint right";
    let { marker_map } = hunts;
    if (marker_map.includes(`${markers[0].id}`)) {
      message = "you already found";
    } else {
      message = "cool find!";
      marker_map = [...marker_map, `${markers[0].id}`];
      hunts.marker_map = marker_map;
      const huntsRepo = getRepository(Hunts);
      await huntsRepo.save(hunts);
    }
    if (marker_map.length === markers.length) {
      message = "you win!";
    }
    socket.emit("code_response", message);
    ws.in(decoded.id).emit("marker_found", marker_map);
    if (message === "you win!") ws.in(decoded.id).emit("win", "you_win");
  });

  socket.on("get_markers", async hunt => {
    const { markers, markerMap } = await getRaptorsMarkers(
      socket.handshake.query.token,
      hunt
    );
    await socket.emit("markers", markers);
    socket.emit("marker_found", markerMap);
  });
};

export default sockets;
