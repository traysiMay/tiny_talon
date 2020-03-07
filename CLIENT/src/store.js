import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ERROR, BAD_TOKEN, DEVICE_NOT_FOUND, deviceInit } from "./actions";

const peelError = ({ getState, dispatch }) => {
  return next => action => {
    console.log(action);
    console.log(getState());
    if (action.type === ERROR) {
      // should this be error or message?
      switch (action.error) {
        case BAD_TOKEN:
          localStorage.removeItem("token");
          break;
        case DEVICE_NOT_FOUND:
          dispatch(deviceInit());
          break;
        default:
      }
    }
    next(action);
  };
};

const store = createStore(reducers, applyMiddleware(thunk, peelError));

export default store;
// what is the balance between monotony and bliss
// what is the need to be differentiated in particular settings and ways
