import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import Fingerprint2 from "fingerprintjs2";
import { DEVICE_INIT } from "./actions";

import { BrowserRouter } from "react-router-dom";

if (window.requestIdleCallback) {
  requestIdleCallback(function() {
    Fingerprint2.get(function(components) {
      var values = components.map(function(component) {
        return component.value;
      });
      var murmur = Fingerprint2.x64hash128(values.join(""), 31);
      store.dispatch({ type: DEVICE_INIT, hash: murmur });
    });
  });
} else {
  setTimeout(function() {
    Fingerprint2.get(function(components) {
      var values = components.map(function(component) {
        return component.value;
      });
      var murmur = Fingerprint2.x64hash128(values.join(""), 31);
      store.dispatch({ type: DEVICE_INIT, hash: murmur });
    });
  }, 500);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
