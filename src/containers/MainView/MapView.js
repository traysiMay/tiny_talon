import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  connectSocket,
  getMarkers,
  logOut,
  listenTo,
  joinRoom
} from "../../actions";
import Status from "../Status";
import Map from "../../components/Map";
import Logout from "../../components/Logout";
import WinView from "./WinView";
import Loading from "../../animations/Loading";

// when the map socket connects it needs to update it's marker map
const MapView = ({
  completed,
  connected,
  connectToSocket,
  getMarkers,
  history,
  hunt,
  joinSeries,
  logout,
  listenToMarkerFound,
  listenToNewMarker,
  listenToWin,
  name,
  loading,
  mapKey,
  markers,
  markersFound,
  places,
  reset
}) => {
  // useEffect(() => {
  //   if (connected) return;
  //   connectToSocket();
  //   //eslint-disable-next-line
  // }, [connectToSocket]);

  useEffect(() => {
    if (!connected) return;
    getMarkers(hunt);
    listenToMarkerFound();
    listenToNewMarker();
    listenToWin();
    // joinSeries(hunt);
    //eslint-disable-next-line
  }, [connected, getMarkers]);
  if (loading) return <Loading message="to the hunt we go.." />;
  if (completed) return <WinView name={name} hunt={hunt} />;
  return (
    <div>
      <Status hunt={hunt} />
      <Logout logout={logout} />
      <Map
        history={history}
        hunt={hunt}
        mapKey={mapKey}
        markers={markers}
        markersFound={markersFound}
        places={places}
        reset={reset}
      />
    </div>
  );
};

const mapStateToProps = ({
  device: { mapKey },
  map: { completed, markers, markersFound, loading, places },
  socket: { connected }
}) => ({
  completed,
  connected,
  loading,
  mapKey,
  markers,
  markersFound,
  places
});
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket()),
  getMarkers: hunt => dispatch(getMarkers(hunt)),
  // joinSeries: hunt => dispatch(joinRoom(hunt)),
  logout: () => dispatch(logOut()),
  listenToNewMarker: () => dispatch(listenTo("new_marker")),
  listenToMarkerFound: () => dispatch(listenTo("marker_found")),
  listenToWin: () => dispatch(listenTo("win")),
  reset: () => dispatch({ type: "RESET" }),
  dispatch
});

export default connect(mapStateToProps, mapDipstachToProps)(MapView);
