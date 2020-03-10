import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CMap from "../components/CMap";
import Logout from "../components/Logout";
import {
  logOut,
  connectSocket,
  listenTo,
  joinRoom,
  getMarkersBySeries
} from "../actions";
import Series from "../components/Series";
import Hunt from "../components/Hunt";

const SERIES = "SERIES";
const MAP = "MAP";

const Creator = ({
  connected,
  connectToSocket,
  logout,
  mapKey,
  markers,
  socket,
  getMarkers
}) => {
  const [scene, setScene] = useState(SERIES);
  const [selectedSeries, setSelectedSeries] = useState();

  useEffect(() => {
    if (!connected) {
      connectToSocket();
    }
  }, [connectToSocket, connected]);
  return (
    <div>
      {selectedSeries}
      <Logout logout={logout} />
      {scene === SERIES && (
        <div>
          <Hunt />
          <Series setScene={setScene} setSelectedSeries={setSelectedSeries} />
        </div>
      )}
      {scene === MAP && (
        <CMap
          mapKey={mapKey}
          markers={markers}
          series={selectedSeries}
          setScene={setScene}
          getMarkers={getMarkers}
          socket={socket}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  map: { mapKey, markers },
  socket: { connected, socket }
}) => ({
  connected,
  mapKey,
  markers,
  socket
});
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket()),
  getMarkers: series => dispatch(getMarkersBySeries(series)),
  joinSeries: series => dispatch(joinRoom(series)),
  listenToNewMarker: () => dispatch(listenTo("new_marker")),
  logout: () => dispatch(logOut()),
  dispatch
});

export default connect(mapStateToProps, mapDipstachToProps)(Creator);
