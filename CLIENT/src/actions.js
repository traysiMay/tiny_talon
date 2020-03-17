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
export const MARKER_FOUND = "MARKER_FOUND";
export const UPDATE_MAP = "UPDATE_MAP";
export const NEW_MARKER = "NEW_MARKER";
export const HUNT_COMPLETED = "HUNT_COMPLETED";
export const RESET = "RESET";

export const CONNECTING = "CONNECTING";
export const CONNECTED = "CONNECTED";
export const LISTEN_TO = "LISTEN_TO";
export const SOCKET_MESSAGE = "SOCKET_MESSAGE";

export const ERROR = "ERROR";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const BAD_TOKEN = "BAD_TOKEN";
export const RESPONSE = "RESPONSE";
export const DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND";
export const UNAUTHORIZED = "UNAUTHORIZED";

export const FOUND = "FOUND";
export const SEND_CODE = "SEND_CODE";
export const CODE_RESPONSE = "CODE_RESPONSE";

export const deviceInit = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOADING });
    if (window.requestIdleCallback) {
      requestIdleCallback(function() {
        Fingerprint2.get(async function(components) {
          var values = components.map(function(component) {
            return component.value;
          });
          const device = Fingerprint2.x64hash128(values.join(""), 31);
          dispatch({ type: DEVICE_INIT, hash: device });
          if (!getState().device.token) {
            tRequest("auth_device", { device }, dispatch);
          }
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
          dispatch({ type: DEVICE_INIT, hash: device });
          if (!getState().device.token) {
            tRequest("auth_device", { device }, dispatch);
          }
          dispatch(readyDelay(1));
        });
      }, 500);
    }
  };
};

export const authenticateDevice = () => {};

export const readyDelay = delay => {
  return dispatch => {
    setTimeout(() => dispatch({ type: READY }), delay);
  };
};

export const dDelay = (type, delay) => {
  return dispatch => {
    setTimeout(() => dispatch({ type }), delay);
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

export const unauthorized = () => {
  return async (dispatch, getState) => {
    console.log("fuck");
  };
};

export const logOut = () => {
  return async dispatch => {
    // localStorage.setItem("token", "");
    localStorage.removeItem("token");
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
// socket connection probably doesn't need to include these listeners
// and they could be moved into the general listener scheme
export const connectSocket = () => {
  return async (dispatch, getState) => {
    const {
      device: { hash }
    } = getState();
    const socket = await socketWrap(hash);
    socket.on("error", error => {
      dispatch({ type: ERROR, error });
    });
    socket.on("found", found => dispatch({ type: FOUND, name: found }));
    socket.on("markers", markers => {
      if (!markers.success)
        return dispatch({ type: ERROR, error: UNAUTHORIZED });
      dispatch({ type: MAP_INIT, markers });
    });
    dispatch({ type: CONNECTED, socket });
  };
};

// ** CONSOLIDATE OR SPLIT UP THE DIFFERENT BETWEEN LISTENERS ON SOCKET CONNECTION
// AND SOCKET CONNECTIONS that are handled by the listendispatcher
export const socketMessage = message => {
  return dispatch => {
    dispatch({ type: SOCKET_MESSAGE, message });
  };
};

const listenDispatcher = (dispatch, topic, payload) => {
  if (topic === "markers") {
    dispatch({ type: MAP_INIT, markers: payload });
  }
  if (topic === "marker_found") {
    dispatch({ type: MARKER_FOUND, markersFound: payload });
  }
  if (topic === "new_marker") {
    dispatch({ type: NEW_MARKER, newMarker: payload });
  }
  if (topic === "code_response") {
    dispatch({ type: CODE_RESPONSE, payload });
  }
  if (topic === "ready") {
    dispatch({ type: "MAP_READY" });
  }
  // ** not great
  if (payload === "you_win") {
    dispatch({ type: "HUNT_COMPLETED" });
  }
};

export const listenTo = topic => {
  return async (dispatch, getState) => {
    const { listeners, socket } = getState().socket;
    if (listeners.includes(topic)) {
      return;
    }
    socket.on(topic, message => {
      listenDispatcher(dispatch, topic, message);
      dispatch(socketMessage(message));
    });
    dispatch({ type: LISTEN_TO, topic });
  };
};

export const joinRoom = room => {
  const topic = "join";
  return async (dispatch, getState) => {
    getState().socket.socket.emit(topic, room);
    dispatch({ type: LISTEN_TO, topic: `series_${room}` });
  };
};
// ------
// GET MARKERS SENDS THE SOCKET EVENT TO REQUEST MARKERS
export const getMarkers = hunt => {
  return async dispatch => {
    dispatch({ type: GET_MARKERS, hunt });
  };
};

export const getMarkersBySeries = series => {
  return async (dispatch, getState) => {
    getState().socket.socket.emit("get_markers_by_series", series);
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

export const stopListening = hunt => {
  return async (dispatch, getState) => {
    const {
      socket: { socket }
    } = getState();
    socket.off();
    socket.disconnect();
    socket.emit("leave", hunt);
    dispatch({ type: "CLEAR_LISTENERS" });
    dispatch({ type: "DISCONNECT" });
  };
};
