import { DEVICE_INIT, SET_TOKEN, ERROR, RESPONSE, LOGOUT } from "../actions";

const deviceState = {
  hash: 0x0,
  token: 0x0,
  error: "",
  response: "",
  status: ""
};

const device = (state = deviceState, action) => {
  switch (action.type) {
    case DEVICE_INIT:
      const { hash } = action;
      return { ...state, hash };
    case SET_TOKEN:
      const { token } = action;
      return { ...state, token };
    case LOGOUT:
      return { ...state, token: 0x0 };
    case ERROR:
      const { message } = action;
      return { ...state, error: message, status: message };
    case RESPONSE:
      const { response } = action;
      return { ...state, response, status: response };
    default:
      return state;
  }
};

export default device;
