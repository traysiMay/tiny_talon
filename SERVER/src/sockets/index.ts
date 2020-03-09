import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { ws } from "../index";
import { Series } from "../entity/Series";
import { getRaptorsMarkers, getRaptorsBySeries } from "./getters";
import { markerCreator } from "./creators";
import { codeReducer, CodeMessage } from "./reducers";

const sockets = async socket => {
  console.log("a user has connected");
  const decoded = jwt.verify(socket.handshake.query.token, process.env.SACRET);

  // ** JOIN THEIR ROOM
  socket.join(decoded.id);
  socket.on("disconnect", () => console.log("a user has disconnected"));

  // ** JOIN SERIES ROOM
  // DO THEY NEED TO LEAVE OTHER ROOMS?
  socket.on("join", async room => {
    socket.join(`series_${room}`);
  });
  // *****

  // ** SENDING A CODE **
  socket.on("code", async code => {
    console.log("SENDING CODE");

    const { id, message, markerMap, completed } = await codeReducer(
      code,
      decoded.id
    );
    if (
      message === CodeMessage.NOT_FOUND ||
      message === CodeMessage.ALREADY_FOUND
    ) {
      return socket.emit("code_response", {
        message,
        seriesId: id
      });
    }
    if (message === CodeMessage.WIN) {
      // completed could run through here
      ws.in(decoded.id).emit("win", "you_win");
    }

    socket.emit("code_response", { completed, message, seriesId: id });
    // or completed could run through here
    ws.in(decoded.id).emit("marker_found", markerMap);
  });
  // *****

  // ** CREATING A MARKER **
  socket.on("create_marker", async ({ marker, series }) => {
    const newMarker = await markerCreator({ ...marker, series });
    ws.in(`series_${series}`).emit("new_marker", newMarker);
  });
  // *****

  // ** GETTING MARKERS **
  socket.on("get_markers", async hunt => {
    const { markers, markerMap, completed, success } = await getRaptorsMarkers(
      socket.handshake.query.token,
      hunt
    );
    await socket.emit("markers", { markers, markerMap, completed, success });
  });

  socket.on("get_markers_by_series", async series => {
    const { markers } = await getRaptorsBySeries(series);
    socket.emit("markers", { markers, success: true });
  });
};

export default sockets;
