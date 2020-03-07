import React, { useEffect } from "react";
import { connect } from "react-redux";
import { connectSocket, getMarkers, logOut, listenTo } from "../../actions";
import Status from "../Status";
import Map from "../../components/Map";
import Logout from "../../components/Logout";

// when the map socket connects it needs to update it's marker map
const MapView = ({
  connected,
  connectToSocket,
  getMarkers,
  history,
  hunt,
  logout,
  listenToMarkerFound,
  listenToWin,
  mapKey,
  markers,
  markersFound,
  places
}) => {
  useEffect(() => {
    if (connected) return;
    connectToSocket();
    //eslint-disable-next-line
  }, [connectToSocket]);

  useEffect(() => {
    if (!connected) return;
    getMarkers(hunt);
    listenToMarkerFound();
    listenToWin();
  }, [connected, getMarkers]);
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
      />
    </div>
  );
};

const mapStateToProps = ({
  map: { mapKey, markers, markersFound, places },
  socket: { connected }
}) => ({
  connected,
  mapKey,
  markers,
  markersFound,
  places
});
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket()),
  getMarkers: hunt => dispatch(getMarkers(hunt)),
  logout: () => dispatch(logOut()),
  listenToMarkerFound: () => dispatch(listenTo("marker_found")),
  listenToWin: () => dispatch(listenTo("win")),
  dispatch
});

export default connect(mapStateToProps, mapDipstachToProps)(MapView);
