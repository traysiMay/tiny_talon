import io from "socket.io-client";
import Fingerprint2 from "fingerprintjs2";
import { tRequest, getToken } from "./services";

export const DEVICE_INIT = "DEVICE_INIT";
export const SET_TOKEN = "SET_TOKEN";

export const MAP_INIT = "MAP_INIT";

export const CONNECTING = "CONNECTING";
export const CONNECTED = "CONNECTED";

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

export const connectSocket = () => {
  return dispatch => {
    const socket = io(process.env.REACT_APP_SOCKET_SERVER);
    socket.emit("auth", localStorage.getItem("token"));
    dispatch({ type: CONNECTED, socket });
  };
};
