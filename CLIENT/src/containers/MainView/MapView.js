import React, { useEffect } from "react";
import { connect } from "react-redux";
import { connectSocket } from "../../actions";
import Map from "../../components/Map";

// when the map socket connects it needs to update it's marker map
const MapView = ({ connectToSocket, history, markers, places }) => {
  useEffect(() => {
    connectToSocket();
  }, [connectToSocket]);

  return (
    <div>
      <Map history={history} markers={markers} places={places} />
    </div>
  );
};

const mapStateToProps = state => state.map;
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket()),
  dispatch
});

export default connect(mapStateToProps, mapDipstachToProps)(MapView);
