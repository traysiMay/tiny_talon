import { LOADING, READY, WELCOME } from "../actions";

const initialState = {
  welcome: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WELCOME:
      return { ...state, welcome: true };
    case LOADING:
      return { ...state, loading: true };
    case READY:
      return { ...state, loading: false, welcome: false };
    default:
      return state;
  }
};

export default reducer;
