import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

// what is the balance between monotony and bliss
// what is the need to be differentiated in particular settings and ways
