import React from "react";
import { connect } from "react-redux";
import MapView from "./MapView";
import WinView from "./WinView";
import { Route } from "react-router-dom";
import Chodal from "./Chodal";
import { UNAUTHORIZED } from "../../actions";

const MainView = ({ completed, history, match, error, name }) => {
  const { hunt } = match.params;
  if (error === UNAUTHORIZED) {
    history.push("/");
  }
  return (
    <div>
      {completed && <WinView name={name} />}
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

const mapStateToProps = ({ map: { completed, name }, device: { error } }) => ({
  completed,
  error,
  name
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
