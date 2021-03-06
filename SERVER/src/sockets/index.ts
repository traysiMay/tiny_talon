import jwt from "jsonwebtoken";
import { getRepository, Migration } from "typeorm";
import { ws } from "../index";
import { Series } from "../entity/Series";
import { getRaptorsMarkers, getRaptorsBySeries } from "./getters";
import { markerCreator } from "./creators";
import { codeReducer, CodeMessage } from "./reducers";
import { setSeriesCenter } from "./setters";

const sockets = async (socket) => {
  console.log("a user has connected");
  const decoded = jwt.verify(socket.handshake.query.token, process.env.SACRET);

  // ** JOIN THEIR ROOM
  socket.join(decoded.id);
  socket.on("disconnect", () => console.log("a user has disconnected"));

  // ** JOIN SERIES ROOM
  // DO THEY NEED TO LEAVE OTHER ROOMS?
  socket.on("join", async (room) => {
    socket.join(`series_${room}`);
  });

  socket.on("leave", async (room) => {
    socket.leave(`series_${room}`);
  });
  // *****
  socket.on("hunt_ready", async (series) => {
    const seriesRepo = getRepository(Series);
    const rSeries = await seriesRepo.findOne(series);
    rSeries.init = true;
    seriesRepo.save(rSeries);
    ws.in(`series_${series}`).emit("ready", true);
  });

  socket.on("hunt_archive", async (series) => {
    const seriesRepo = getRepository(Series);
    const rSeries = await seriesRepo.findOne(series);
    rSeries.archived = true;
    seriesRepo.save(rSeries);
  });
  // ** SENDING A CODE **
  socket.on("code", async (code) => {
    const { id, message, markerMap, completed, unified } = await codeReducer(
      code,
      decoded.id
    );

    if (
      message === CodeMessage.NOT_FOUND ||
      message === CodeMessage.ALREADY_FOUND
    ) {
      return socket.emit("code_response", {
        message,
        seriesId: id,
      });
    }
    if (message === CodeMessage.WIN) {
      // completed could run through here
      ws.in(decoded.id).emit("win", "you_win");
    }

    socket.emit("code_response", { completed, message, seriesId: id });
    // or completed could run through here
    if (!unified) {
      ws.in(decoded.id).emit("marker_found", markerMap);
    } else {
      ws.in(`series_${id}`).emit("marker_found", markerMap);
    }
  });
  // *****
  // ** CREATING A MARKER **
  socket.on("create_marker", async ({ marker, series }) => {
    const newMarker = await markerCreator({ ...marker, series });
    if (newMarker instanceof Error) {
      return socket.emit("create_error", { error: newMarker.message });
    }
    ws.in(`series_${series}`).emit("new_marker", newMarker);
  });
  // *****

  // ** SETTING SERIES CENTER **
  socket.on("set_series_center", async ({ center, series }) => {
    const success = await setSeriesCenter(center, series);
    socket.emit("create_response", { message: success });
  });

  // ** GETTING MARKERS **
  // THERE IS AN API REQUEST THAT CHECKS IF THE HUNT IS READY WITH SOME REDUNDANCY
  socket.on("get_markers", async (hunt) => {
    const {
      markers,
      markerMap,
      name,
      completed,
      ready,
      success,
      lat,
      lng,
    } = await getRaptorsMarkers(socket.handshake.query.token, hunt);
    await socket.emit("markers", {
      markers,
      markerMap,
      name,
      completed,
      ready,
      success,
      lat,
      lng,
    });
  });

  socket.on("get_markers_by_series", async (series) => {
    const { markers } = await getRaptorsBySeries(series);
    socket.emit("markers", { markers, success: true });
  });
};

export default sockets;
