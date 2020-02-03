import React, { useEffect } from "react";
import { MapContainer } from "./styles";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { connectSocket } from "./actions";
import Raptor from "./markers/Raptor";
import whiteMap from "./whiteMap.json";
const Map = ({ connectToSocket, places }) => {
  console.log("map render");

  useEffect(() => {
    connectToSocket();
  }, [connectToSocket]);
  console.log(process.env.REACT_APP_MAP_KEY);
  return (
    <MapContainer>
      <GoogleMapReact
        defaultCenter={places.ppark}
        defaultZoom={17}
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        options={{ styles: whiteMap }}
        onChildClick={(e, p) => console.log(p)}
      >
        <Raptor
          name="raptor"
          lat={places.ppark.lat + 0.001}
          lng={places.ppark.lng}
        />
        <Raptor lat={places.ppark.lat} lng={places.ppark.lng} />
      </GoogleMapReact>
    </MapContainer>
  );
};

const mapStateToProps = state => state.map;
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket())
});

export default connect(mapStateToProps, mapDipstachToProps)(Map);
