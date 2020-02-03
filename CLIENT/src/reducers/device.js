import { DEVICE_INIT, SET_TOKEN } from "../actions";

const deviceState = {
  hash: 0x0,
  token: 0x0
};

const device = (state = deviceState, action) => {
  switch (action.type) {
    case DEVICE_INIT:
      const { hash } = action;
      return { ...state, hash };
    case SET_TOKEN:
      const { token } = action;
      return { ...state, token };
    default:
      return state;
  }
};

export default device;
