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
import { Select } from "../components/Series";

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
  const [mapCenter, setMapCenter] = useState("SF");
  const [seriesCenter, setSeriesCenter] = useState();
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
      <Message top={70}>
        <Select
          onChange={(e) => {
            setMapCenter(e.target.value);
          }}
        >
          <option key={"SF"} name={"SF"} value={"SF"}>
            SF
          </option>
          <option key={"NYC"} name={"NYC"} value={"NYC"}>
            NYC
          </option>
          <option key={"MIDWAY"} name={"MIDWAY"} value={"MIDWAY"}>
            MIDWAY
          </option>
        </Select>
      </Message>
      <Message top={460}>
        <div
          onClick={() => {
            const payload = {
              center: { ...seriesCenter },
              series: selectedSeries,
            };
            socket.emit("set_series_center", payload);
          }}
        >
          SET SERIES CENTER
        </div>
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
          mapCenter={mapCenter}
          mapKey={mapKey}
          markers={markers}
          series={selectedSeries}
          setScene={setScene}
          getMarkers={getMarkers}
          setSeriesCenter={setSeriesCenter}
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
