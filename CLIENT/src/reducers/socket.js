import {
  CONNECTING,
  CONNECTED,
  GET_MARKERS,
  LISTEN_TO,
  socketMessage
} from "../actions";

const socketState = {
  socket: null,
  connected: false,
  status: "disconnected",
  listeners: []
};

const socket = (state = socketState, action) => {
  switch (action.type) {
    case CONNECTING:
      return { ...state, status: "connecting..." };
    case CONNECTED:
      const { socket } = action;
      return { ...state, status: "connected", connected: true, socket };
    case GET_MARKERS:
      state.socket.emit("get_markers");
      return state;
    case LISTEN_TO:
      const { topic } = action;
      return state;
    case "SOCKET_MESSAGE":
      const { message } = action;
      console.log(message, "aa");
      return { ...state, message };
    default:
      return state;
  }
};

export default socket;
