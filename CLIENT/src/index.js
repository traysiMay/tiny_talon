import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import { HashRouter as Router } from "react-router-dom";
import { deviceInit, WELCOME } from "./actions";

const token = localStorage.getItem("token");
if (!token) {
  store.dispatch({ type: WELCOME });
}
store.dispatch(deviceInit());
ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
