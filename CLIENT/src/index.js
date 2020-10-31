import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { deviceInit, WELCOME, MAP_KEY, SET_TOKEN } from "./actions";

import { AES, enc } from "crypto-js";

const token = localStorage.getItem("token");
if (!token) {
  store.dispatch({ type: WELCOME });
}
store.dispatch(deviceInit());
if (token) store.dispatch({ type: SET_TOKEN, token });

const bytes = AES.decrypt(
  process.env.REACT_APP_MAP_KEY,
  process.env.REACT_APP_FROGGY
);
const mapKey = bytes.toString(enc.Utf8);
store.dispatch({ type: MAP_KEY, mapKey });

const isLocalHost = (hostname) =>
  !!(
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

const HttpsRedirect = ({ disabled, children }) => {
  if (
    !disabled &&
    typeof window !== "undefined" &&
    window.location &&
    window.location.protocol === "http:" &&
    !isLocalHost(window.location.hostname)
  ) {
    window.location.href = window.location.href.replace(/^http(?!s)/, "https");
    return null;
  }

  return children;
};
ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <Router basename="/">
        <App />
      </Router>
    </Provider>
  </HttpsRedirect>,
  document.getElementById("root")
);
