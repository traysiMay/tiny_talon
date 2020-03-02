import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import { HashRouter as Router } from "react-router-dom";
import { deviceInit, WELCOME, MAP_KEY, SET_TOKEN } from "./actions";

import { AES, enc } from "crypto-js";

const token = localStorage.getItem("token");
if (!token) {
  store.dispatch({ type: WELCOME });
  store.dispatch(deviceInit());
} else {
  store.dispatch({ type: SET_TOKEN, token });
}

const bytes = AES.decrypt(process.env.REACT_APP_MAP_KEY, "ilovefroggy");
const mapKey = bytes.toString(enc.Utf8);
store.dispatch({ type: MAP_KEY, mapKey });

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
