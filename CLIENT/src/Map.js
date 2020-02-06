import React, { useEffect } from "react";
import { MapContainer } from "./styles";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { connectSocket } from "./actions";
import Raptor from "./markers/Raptor";
import whiteMap from "./whiteMap.json";

// when the map socket connects it needs to update it's marker map

const Map = ({ connectToSocket, markers, places }) => {
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
        {markers.map((m, i) => {
          return (
            <Raptor
              key={m.name}
              id={m.name}
              found={m.found}
              lat={places.ppark.lat + i * 0.001}
              lng={places.ppark.lng}
            />
          );
        })}
      </GoogleMapReact>
    </MapContainer>
  );
};

const mapStateToProps = state => state.map;
const mapDipstachToProps = dispatch => ({
  connectToSocket: () => dispatch(connectSocket())
});

export default connect(mapStateToProps, mapDipstachToProps)(Map);
