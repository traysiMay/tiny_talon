import io from "socket.io-client";
import Fingerprint2 from "fingerprintjs2";
import { tRequest, getToken } from "./services";

export const DEVICE_INIT = "DEVICE_INIT";
export const SET_TOKEN = "SET_TOKEN";

export const MAP_INIT = "MAP_INIT";

export const CONNECTING = "CONNECTING";
export const CONNECTED = "CONNECTED";

export const ERROR = "ERROR";

export const SEND_CODE = "SEND_CODE";

export const deviceInit = () => {
  return async dispatch => {
    if (window.requestIdleCallback) {
      requestIdleCallback(function() {
        Fingerprint2.get(async function(components) {
          var values = components.map(function(component) {
            return component.value;
          });
          const device = Fingerprint2.x64hash128(values.join(""), 31);
          tRequest("auth_device", { device }, dispatch);
          dispatch({ type: DEVICE_INIT, hash: device });
        });
      });
    } else {
      setTimeout(function() {
        Fingerprint2.get(async function(components) {
          var values = components.map(function(component) {
            return component.value;
          });
          const device = Fingerprint2.x64hash128(values.join(""), 31);
          tRequest("auth_device", { device }, dispatch);
          dispatch({ type: DEVICE_INIT, hash: device });
        });
      }, 500);
    }
  };
};

export const newToken = () => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    getToken(dispatch, hash);
  };
};

function socketWrap(hash) {
  return io(
    `${process.env.REACT_APP_SOCKET_SERVER}?token=${localStorage.getItem(
      "token"
    )}&device=${hash}`
  );
}

export const connectSocket = () => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    const socket = socketWrap(hash);
    socket.on("error", error => dispatch({ type: ERROR, error }));
    socket.on("found", found => dispatch({ type: "FOUND", name: found }));
    dispatch({ type: CONNECTED, socket });
  };
};

export const connectSocketThenEmit = (emit, value) => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    const socket = socketWrap(hash);
    socket.on("error", error => dispatch({ type: ERROR, error }));
    dispatch({ type: CONNECTED, socket });
    if (socket) {
      socket.emit(emit, value);
    }
  };
};

// should probably be refactored into just thunk action
export const emit = (emit, value) => {
  return async (dispatch, getState) => {
    const { socket } = getState();
    if (!socket.socket) {
      dispatch(connectSocketThenEmit(emit, value));
    } else {
      socket.socket.emit(emit, value);
    }
  };
};
