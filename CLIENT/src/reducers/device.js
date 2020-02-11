import { DEVICE_INIT, SET_TOKEN, ERROR, BAD_TOKEN, RESPONSE } from "../actions";

const deviceState = {
  hash: 0x0,
  token: 0x0,
  error: "",
  response: ""
};

const device = (state = deviceState, action) => {
  switch (action.type) {
    case DEVICE_INIT:
      const { hash } = action;
      return { ...state, hash };
    case SET_TOKEN:
      const { token } = action;
      return { ...state, token };
    case ERROR:
      const { message } = action;
      if (message === BAD_TOKEN) localStorage.removeItem("token");
      console.log(message);
      return { ...state, error: message };
    case RESPONSE:
      const { response } = action;
      console.log(response);
      return { ...state, response };
    default:
      return state;
  }
};

export default device;
