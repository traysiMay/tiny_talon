import React, { useEffect } from "react";
import { connect } from "react-redux";
import { connectSocket, getMarkers, logOut, listenTo } from "../../actions";
import Status from "../Status";
import Map from "../../components/Map";
import Logout from "../../components/Logout";
import WinView from "./WinView";
import Loading from "../../animations/Loading";

// when the map socket connects it needs to update it's marker map
const MapView = ({
  completed,
  connected,
  getMarkers,
  history,
  hunt,
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
  reset,
  lat,
  lng,
}) => {
  useEffect(() => {
    if (!connected) return;
    getMarkers(hunt);
    listenToMarkerFound();
    listenToNewMarker();
    listenToWin();
    //eslint-disable-next-line
  }, [connected, getMarkers]);
  if (loading) return <Loading message="to the hunt we go.." />;
  if (completed) return <WinView name={name} hunt={hunt} />;
  return (
    <div>
      <Status hunt={hunt} />
      <Logout logout={logout} />
      <Map
        lat={lat}
        lng={lng}
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
  map: { completed, markers, markersFound, loading, places, lat, lng },
  socket: { connected },
}) => ({
  completed,
  connected,
  loading,
  mapKey,
  markers,
  markersFound,
  places,
  lat,
  lng,
});
const mapDipstachToProps = (dispatch) => ({
  connectToSocket: () => dispatch(connectSocket()),
  getMarkers: (hunt) => dispatch(getMarkers(hunt)),
  logout: () => dispatch(logOut()),
  listenToNewMarker: () => dispatch(listenTo("new_marker")),
  listenToMarkerFound: () => dispatch(listenTo("marker_found")),
  listenToWin: () => dispatch(listenTo("win")),
  reset: () => dispatch({ type: "RESET" }),
  dispatch,
});

export default connect(mapStateToProps, mapDipstachToProps)(MapView);
