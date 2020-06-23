import {
  CONNECTING,
  CONNECTED,
  GET_MARKERS,
  LISTEN_TO,
  SOCKET_MESSAGE,
  CODE_RESPONSE
} from "../actions";

const socketState = {
  socket: null,
  connected: false,
  codeResponse: "",
  message: "",
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
    // this should be refactored
    case GET_MARKERS:
      const { hunt } = action;
      state.socket.emit("get_markers", hunt);
      return state;
    case LISTEN_TO:
      const { topic } = action;
      return { ...state, listeners: [...state.listeners, topic] };
    case "CLEAR_LISTENERS":
      return { ...state, listeners: [] };
    case SOCKET_MESSAGE:
      const { message } = action;
      return { ...state, message };
    case CODE_RESPONSE:
      const { payload } = action;
      return {
        ...state,
        codeResponse: payload.message,
        seriesId: payload.seriesId
      };
    case "DISCONNECT":
      return { ...state, status: "disconnected", connected: false };
    default:
      return state;
  }
};

export default socket;
