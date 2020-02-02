import React, { useEffect } from "react";
import { MapContainer } from "./styles";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { connectSocket } from "./actions";

const Map = ({ connectToSocket, places }) => {
  console.log("map render");

  useEffect(() => {
    connectToSocket();
  }, [connectToSocket]);

  return (
    <MapContainer>
      <GoogleMapReact
        defaultCenter={places.ppark}
        defaultZoom={17}
      ></GoogleMapReact>
    </MapContainer>
  );
};

const mapStateToProps = state => state.map;
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket())
});

export default connect(mapStateToProps, mapDipstachToProps)(Map);
