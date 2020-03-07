import React from "react";
import { connect } from "react-redux";
import MapView from "./MapView";
import { Route } from "react-router-dom";
import Chodal from "./Chodal";

const MainView = ({ history, match }) => {
  const { hunt } = match.params;
  return (
    <div>
      <Route
        path={`/map/:hunt/pop/:marker`}
        render={({ match }) => <Chodal history={history} match={match} />}
      />
      <MapView history={history} hunt={hunt} />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
