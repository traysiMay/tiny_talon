import { CONNECTING, CONNECTED, GET_MARKERS } from "../actions";

const socketState = {
  socket: null,
  connected: false,
  status: "disconnected"
};

const socket = (state = socketState, action) => {
  switch (action.type) {
    case CONNECTING:
      return { ...state, status: "connecting..." };
    case CONNECTED:
      const { socket } = action;
      return { ...state, status: "connected", connected: true, socket };
    case GET_MARKERS:
      console.log(state);
      state.socket.emit("get_markers");
      return state;
    default:
      return state;
  }
};

export default socket;
