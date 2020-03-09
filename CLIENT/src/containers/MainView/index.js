import React from "react";
import { connect } from "react-redux";
import MapView from "./MapView";
import WinView from "./WinView";
import { Route } from "react-router-dom";
import Chodal from "./Chodal";

const MainView = ({ completed, history, match }) => {
  const { hunt } = match.params;
  return (
    <div>
      {completed && <WinView />}
      {!completed && (
        <div>
          <Route
            path={`/map/:hunt/pop/:marker`}
            render={({ match }) => <Chodal history={history} match={match} />}
          />
          <MapView history={history} hunt={hunt} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ map: { completed } }) => ({ completed });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
