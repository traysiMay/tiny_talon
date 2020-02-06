import React from "react";
import { Route, Switch } from "react-router-dom";
import Map from "./Map";
import Status from "./Status";
import Scan from "./Scan";
import { connect } from "react-redux";
import { newToken } from "./actions";

function App({ error, getToken, hash, token }) {
  if (!hash) {
    return <div>devicing...</div>;
  }
  if (!token) {
    return (
      <div>
        <button onClick={getToken}>new token?</button>
      </div>
    );
  }
  return (
    <>
      {error && <div>{error}</div>}
      <Switch>
        <Route exact path="/" component={Map} />
        <Route path="/status" component={Status} />
        <Route path="/:code" component={Scan} />
      </Switch>
    </>
  );
}

const mapStateToProps = state => state.device;
const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(newToken())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
