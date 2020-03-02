import React from "react";
import { Route, Switch } from "react-router-dom";
import Status from "./containers/Status";
import Scan from "./containers/Scan";
import { connect } from "react-redux";
import { newToken, registerDevice } from "./actions";
import MainView from "./containers/MainView";
import Registration from "./containers/Registration";
import { DEVICE_NOT_REGISTERED } from "./statuses";
import Loading from "./animations/Loading";

function App({ hash, status, token, loading, welcome }) {
  if (welcome) return <Loading fill={"yellow"} message={"welcome!"} />;
  if (loading) return <Loading message={"loading ..."} />;
  // this is annoyingly dumb
  if (status === DEVICE_NOT_REGISTERED || !hash || !token) {
    if (!token) {
      return <Registration hash={hash} token={token} status={status} />;
    }
  }
  return (
    <>
      <Switch>
        <Route path="/status" component={Status} />
        <Route path="/code/:code" component={Scan} />
        <Route path="/" component={MainView} />
        <Route path="/" render={() => <div>nope</div>} />
      </Switch>
    </>
  );
}

const mapStateToProps = ({
  device: { error, hash, status, token },
  ui: { loading, welcome }
}) => ({
  error,
  hash,
  loading,
  status,
  token,
  welcome
});

const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(newToken()),
  registerDevice: () => dispatch(registerDevice())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
