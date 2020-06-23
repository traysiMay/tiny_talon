import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CMap from "../components/CMap";
import Logout from "../components/Logout";
import {
  logOut,
  connectSocket,
  listenTo,
  joinRoom,
  getMarkersBySeries,
} from "../actions";
import Series from "../components/Series";
import Hunt from "../components/Hunt";
import Message from "../components/Message";
import JwtDecode from "jwt-decode";

const SERIES = "SERIES";
const MAP = "MAP";

const Creator = ({
  connected,
  connectToSocket,
  message,
  listenToErrors,
  logout,
  mapKey,
  markers,
  socket,
  getMarkers,
  token,
}) => {
  const [scene, setScene] = useState(SERIES);
  const [selectedSeries, setSelectedSeries] = useState();
  useEffect(() => {
    if (!connected) {
      connectToSocket();
    } else {
      listenToErrors();
    }
  }, [connectToSocket, connected, listenToErrors]);

  const { email } = JwtDecode(token);
  // if (email !== "teh@raptor.pizza" && email !== "arielklevecz@gmail.com") {
  //   return <div>no</div>;
  // }
  return (
    <div>
      <Message>
        {selectedSeries}-{message.error}
      </Message>
      <Logout logout={logout} />
      {scene === SERIES && (
        <div>
          <Hunt />
          <Series
            setScene={setScene}
            setSelectedSeries={setSelectedSeries}
            socket={socket}
          />
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
  device: { mapKey, token },
  map: { markers },
  socket: { connected, socket, message },
}) => ({
  connected,
  mapKey,
  markers,
  message,
  socket,
  token,
});
const mapDispatchToProps = (dispatch) => ({
  connectToSocket: () => dispatch(connectSocket()),
  getMarkers: (series) => dispatch(getMarkersBySeries(series)),
  joinSeries: (series) => dispatch(joinRoom(series)),
  listenToNewMarker: () => dispatch(listenTo("new_marker")),
  listenToErrors: () => dispatch(listenTo("create_error")),
  logout: () => dispatch(logOut()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
