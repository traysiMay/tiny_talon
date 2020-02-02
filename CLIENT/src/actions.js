import io from "socket.io-client";

export const DEVICE_INIT = "DEVICE_INIT";
export const MAP_INIT = "MAP_INIT";

export const CONNECTING = "CONNECTING";
export const CONNECTED = "CONNECTED";
export const connectSocket = () => {
  return dispatch => {
    const socket = io(process.env.REACT_APP_SOCKET_SERVER);
    dispatch({ type: CONNECTED, socket });
  };
};
