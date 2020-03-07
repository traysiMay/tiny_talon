import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CMap from "../components/CMap";
import Logout from "../components/Logout";
import { logOut, connectSocket, listenTo } from "../actions";
import Series from "../components/Series";
import Hunt from "../components/Hunt";

const SERIES = "series";
const MAP = "MAP";

const Creator = ({ connected, connectToSocket, logout, mapKey, socket }) => {
  const [scene, setScene] = useState(SERIES);
  const [selectedSeries, setSelectedSeries] = useState();

  useEffect(() => {
    if (connected) return;
    connectToSocket();
    //eslint-disable-next-line
  }, [connectToSocket]);

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
        <CMap mapKey={mapKey} series={selectedSeries} socket={socket} />
      )}
    </div>
  );
};

const mapStateToProps = ({
  map: { mapKey },
  socket: { connected, socket }
}) => ({
  connected,
  mapKey,
  socket
});
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket()),
  logout: () => dispatch(logOut()),
  dispatch
});

export default connect(mapStateToProps, mapDipstachToProps)(Creator);
