import React from "react";
import { connect } from "react-redux";
import MapView from "./MapView";
import { Route } from "react-router-dom";
import Chodal from "./Chodal";

const MainView = ({ history, match }) => {
  return (
    <div>
      <Route
        path={`${match.url}pop/:marker`}
        render={({ match }) => <Chodal history={history} match={match} />}
      />
      <MapView history={history} />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
