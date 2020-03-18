import React, { useEffect } from "react";
import { connect } from "react-redux";
import MapView from "./MapView";
import WinView from "./WinView";
import { Route } from "react-router-dom";
import Chodal from "./Chodal";
import {
  UNAUTHORIZED,
  listenTo,
  connectSocket,
  joinRoom,
  stopListening
} from "../../actions";
import { seriesReady } from "../../services";
import NotReady from "../../components/NoReady";
import Loading from "../../animations/Loading";

const MainView = ({
  completed,
  connected,
  connectToSocket,
  dispatch,
  history,
  joinSeries,
  listenToReady,
  loading,
  match,
  error,
  name,
  ready,
  stopListening
}) => {
  const { hunt } = match.params;
  if (error === UNAUTHORIZED || error === "NOT_FOUND") {
    history.push("/");
  }
  useEffect(() => {
    if (connected) return;
    connectToSocket();
    //eslint-disable-next-line
  }, [connectToSocket, connect]);

  useEffect(() => {
    seriesReady(dispatch, hunt);

    return () => stopListening(hunt);
  }, []);

  useEffect(() => {
    if (!connected) return;
    listenToReady();
    joinSeries(hunt);
  }, [connected]);
  if (loading)
    return (
      <div>
        <Loading message="to the hunt we go..." />
      </div>
    );
  if (!ready) {
    return <NotReady />;
  }
  return (
    <div>
      <div>
        <Route
          path={`/map/:hunt/pop/:marker`}
          render={({ match }) => <Chodal history={history} match={match} />}
        />
        <MapView history={history} hunt={hunt} name={name} />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  map: { completed, name, ready, loading },
  device: { error },
  socket: { connected }
}) => ({
  completed,
  connected,
  error,
  loading,
  name,
  ready
});

const mapDispatchToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket()),
  listenToReady: () => dispatch(listenTo("ready")),
  joinSeries: hunt => dispatch(joinRoom(hunt)),
  stopListening: hunt => dispatch(stopListening(hunt)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
