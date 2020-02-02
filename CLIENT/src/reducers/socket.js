import { CONNECTING, CONNECTED } from "../actions";

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
    default:
      return state;
  }
};

export default socket;
