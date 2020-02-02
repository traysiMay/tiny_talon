import { DEVICE_INIT } from "../actions";

const deviceState = {
  hash: 0x0
};

const device = (state = deviceState, action) => {
  switch (action.type) {
    case DEVICE_INIT:
      const { hash } = action;
      return { ...state, hash };
    default:
      return state;
  }
};

export default device;
