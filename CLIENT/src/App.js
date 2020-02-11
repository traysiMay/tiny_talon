import React from "react";
import { Route, Switch } from "react-router-dom";
import Status from "./containers/Status";
import Scan from "./containers/Scan";
import { connect } from "react-redux";
import { newToken, registerDevice } from "./actions";
import MainView from "./containers/MainView";
import { Button } from "./styles/styles";

function App({ error, getToken, hash, registerDevice, token }) {
  if (error) {
    if (error === "device_not_registered") {
      return <Button onClick={registerDevice}>Register Device</Button>;
    }
    return <div>{error}</div>;
  }
  if (!hash) {
    return <div>devicing...</div>;
  }
  if (!token) {
    return (
      <div>
        <Button onClick={getToken}>Connect</Button>
      </div>
    );
  }
  return (
    <>
      {error && <div>{error}</div>}
      <Switch>
        <Route exact path="/" component={MainView} />
        <Route path="/status" component={Status} />
        <Route path="/:code" component={Scan} />
      </Switch>
    </>
  );
}

const mapStateToProps = state => state.device;
const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(newToken()),
  registerDevice: () => dispatch(registerDevice())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
