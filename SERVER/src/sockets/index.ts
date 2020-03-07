import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { ws } from "../index";
import { Hunts } from "../entity/Hunts";
import { Series } from "../entity/Series";
import { Markers } from "../entity/Markers";

const getRaptorsMarkers = async (token, id) => {
  // GET THE HUNT.ID FROM THE URL?? OR IN THE BODY??
  const decoded = jwt.verify(token, process.env.SACRET);

  const huntsRepo = getRepository(Hunts);
  const hunt = await huntsRepo
    .createQueryBuilder("hunts")
    .leftJoinAndSelect("hunts.series", "series")
    .leftJoinAndSelect("series.markers", "markers")
    .leftJoinAndSelect("hunts.emails", "emails")
    .where("series.id = :sid", { sid: id })
    .andWhere("emails.id = :eid", { eid: decoded.id })
    .getOne();
  const {
    marker_map,
    series: { markers }
  } = hunt;
  return { markers, markerMap: marker_map };
};

const sockets = async socket => {
  console.log("a user has connected");
  // probably put this in a get request

  const decoded = jwt.verify(socket.handshake.query.token, process.env.SACRET);

  socket.join(decoded.id);
  socket.on("disconnect", () => console.log("a user has disconnected"));
  socket.on("join", async room => {
    console.log("joining ROOM");
    console.log(`series_${room}`);
    socket.join(`series_${room}`);
  });
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
      series: { markers, num_markers }
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
    if (marker_map.length === num_markers) {
      message = "you win!";
    }
    socket.emit("code_response", message);
    ws.in(decoded.id).emit("marker_found", marker_map);
    if (message === "you win!") ws.in(decoded.id).emit("win", "you_win");
  });

  socket.on("create_marker", async ({ marker, series }) => {
    const { name, hash, details, type, lat, lng } = marker;
    const markerRepo = getRepository(Markers);
    const newMarker = new Markers();
    newMarker.name = name;
    newMarker.hash = hash;
    newMarker.description = details;
    newMarker.series = series;
    newMarker.cat = type;
    newMarker.lat = lat;
    newMarker.lng = lng;

    await markerRepo.save(newMarker);

    // there must be a way to do this inside of typeorm
    // but this doesn't necessarily need to be super efficient?
    // but if something breaks in the middle it could be bad I guess
    const seriesRepo = getRepository(Series);
    const updatedSeries = await seriesRepo.findOne({ id: series });
    const markerCount = await markerRepo
      .createQueryBuilder("markers")
      .leftJoin("markers.series", "series")
      .where("series.id = :series", { series })
      .getCount();
    updatedSeries.num_markers = markerCount;
    seriesRepo.save(updatedSeries);

    ws.in(`series_${series}`).emit("new_marker", newMarker);
  });

  socket.on("get_markers", async hunt => {
    const { markers, markerMap } = await getRaptorsMarkers(
      socket.handshake.query.token,
      hunt
    );
    await socket.emit("markers", { markers, markerMap });
  });
};

export default sockets;
