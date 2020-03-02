import io from "socket.io-client";
import Fingerprint2 from "fingerprintjs2";
import { tRequest, getToken } from "./services";

export const WELCOME = "WELCOME";
export const LOADING = "LOADING";
export const READY = "READY";

export const MAP_KEY = "MAP_KEY";
export const DEVICE_INIT = "DEVICE_INIT";
export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";

export const MAP_INIT = "MAP_INIT";
export const GET_MARKERS = "GET_MARKERS";
export const UPDATE_MAP = "UPDATE_MAP";

export const CONNECTING = "CONNECTING";
export const CONNECTED = "CONNECTED";
export const LISTEN_TO = "LISTEN_TO";

export const ERROR = "ERROR";
export const BAD_TOKEN = "BAD_TOKEN";
export const RESPONSE = "RESPONSE";

export const FOUND = "FOUND";
export const SEND_CODE = "SEND_CODE";

export const deviceInit = () => {
  return async dispatch => {
    dispatch({ type: LOADING });
    if (window.requestIdleCallback) {
      requestIdleCallback(function() {
        Fingerprint2.get(async function(components) {
          var values = components.map(function(component) {
            return component.value;
          });
          const device = Fingerprint2.x64hash128(values.join(""), 31);
          tRequest("auth_device", { device }, dispatch);
          dispatch({ type: DEVICE_INIT, hash: device });
          dispatch(readyDelay(1));
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
          dispatch(readyDelay(1));
        });
      }, 500);
    }
  };
};

export const readyDelay = delay => {
  return dispatch => {
    setTimeout(() => dispatch({ type: READY }), delay);
  };
};

export const registerDevice = email => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    tRequest("register_device", { email, hash }, dispatch);
    dispatch({ type: LOADING });
    dispatch(readyDelay(2000));
  };
};

export const newToken = () => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    getToken(dispatch, hash);
    dispatch({ type: LOADING });
    dispatch(readyDelay(2000));
  };
};

export const logOut = () => {
  return async dispatch => {
    localStorage.setItem("token", "");
    dispatch({ type: LOGOUT });
  };
};

function socketWrap(hash) {
  return io(
    `${process.env.REACT_APP_SOCKET_SERVER}?token=${localStorage.getItem(
      "token"
    )}&device=${hash}`,
    { path: "/socket.io", transport: ["websocket"] }
  );
}

// MARKERS SHOULD HAVE ITS OWN MIDDLEWARE
export const connectSocket = () => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    const socket = await socketWrap(hash);
    socket.on("error", error => dispatch({ type: ERROR, error }));
    socket.on("found", found => dispatch({ type: FOUND, name: found }));
    socket.on("markers", markers => {
      if (markers.length === 0) dispatch({ type: ERROR, error: BAD_TOKEN });
      dispatch({ type: MAP_INIT, markers });
    });
    dispatch({ type: CONNECTED, socket });
  };
};

// these two are a little silly-- this could live in the scan or be more general if
// there is a QR scanner screen
export const socketMessage = message => {
  return dispatch => {
    dispatch({ type: "SOCKET_MESSAGE", message });
  };
};

const listenDispatcher = (dispatch, topic, payload) => {
  if (topic === "markers") {
    dispatch({ type: MAP_INIT, markers: payload });
  }
};

export const listenTo = topic => {
  return async (dispatch, getState) => {
    getState().socket.socket.on(topic, message => {
      listenDispatcher(dispatch, topic, message);
      dispatch(socketMessage(message));
    });
    dispatch({ type: "LISTEN_TO", topic });
  };
};
// ------

export const getMarkers = () => {
  return async dispatch => {
    dispatch({ type: GET_MARKERS });
  };
};

export const connectSocketThenEmit = (emit, value) => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    const socket = await socketWrap(hash);
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
