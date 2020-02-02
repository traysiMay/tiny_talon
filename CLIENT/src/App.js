import React from "react";
import { Route, Switch } from "react-router-dom";
import Map from "./Map";
import Status from "./Status";
import Scan from "./Scan";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Map} />
        <Route path="/status" component={Status} />
        <Route path="/:code" component={Scan} />
      </Switch>
    </>
  );
}

export default App;
