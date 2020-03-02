import React, { useEffect } from "react";
import { connect } from "react-redux";
import { connectSocket, getMarkers, logOut } from "../../actions";
import Status from "../Status";
import Map from "../../components/Map";
import Logout from "../../components/Logout";

// when the map socket connects it needs to update it's marker map
const MapView = ({
  connected,
  connectToSocket,
  getMarkers,
  history,
  logout,
  mapKey,
  markers,
  places
}) => {
  useEffect(() => {
    if (connected) return;
    connectToSocket();
    //eslint-disable-next-line
  }, [connectToSocket]);

  useEffect(() => {
    if (!connected) return;
    getMarkers();
  }, [connected, getMarkers]);
  return (
    <div>
      <Status />
      <Logout logout={logout} />
      <Map
        history={history}
        mapKey={mapKey}
        markers={markers}
        places={places}
      />
    </div>
  );
};

const mapStateToProps = ({
  map: { mapKey, markers, places },
  socket: { connected }
}) => ({
  connected,
  mapKey,
  markers,
  places
});
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket()),
  getMarkers: () => dispatch(getMarkers()),
  logout: () => dispatch(logOut()),
  dispatch
});

export default connect(mapStateToProps, mapDipstachToProps)(MapView);
