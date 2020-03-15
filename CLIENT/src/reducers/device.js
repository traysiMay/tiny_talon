import {
  DEVICE_INIT,
  SET_TOKEN,
  ERROR,
  RESPONSE,
  LOGOUT,
  MAP_KEY,
  CLEAR_ERRORS
} from "../actions";
import jwtDecode from "jwt-decode";

const deviceState = {
  email: "",
  hash: 0x0,
  token: 0x0,
  error: "",
  response: "",
  status: "",
  mapKey: ""
};

const device = (state = deviceState, action) => {
  switch (action.type) {
    case DEVICE_INIT:
      const { hash } = action;
      return { ...state, hash };
    case SET_TOKEN:
      const { token } = action;
      localStorage.setItem("token", token);
      const { email } = jwtDecode(token);
      return { ...state, email, token };
    case MAP_KEY:
      const { mapKey } = action;
      return { ...state, mapKey };
    case LOGOUT:
      return { ...state, token: 0x0 };
    case ERROR:
      const { error } = action;
      return { ...state, error, status: error };
    case CLEAR_ERRORS:
      return { ...state, error: "", status: "" };
    case RESPONSE:
      const { response } = action;
      return { ...state, response, status: response };
    default:
      return state;
  }
};

export default device;
