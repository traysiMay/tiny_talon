import React from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "../styles/styles";
import RaptorMarker from "../markers/RaptorMarker";
import whiteMap from "../styles/whiteMap.json";

const Map = ({ markers, places }) => {
  if (markers.length === 0) {
    return <div>loading markers...</div>;
  }
  return (
    <MapContainer>
      <GoogleMapReact
        defaultCenter={places.ppark}
        defaultZoom={17}
        // bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        options={{ styles: whiteMap }}
        onChildClick={(e, p) => console.log(p)}
      >
        {markers.map((m, i) => {
          return (
            <RaptorMarker
              key={m.hash}
              id={m.hash}
              found={m.found}
              lat={places.ppark.lat}
              lng={places.ppark.lng + i * 0.001}
            />
          );
        })}
      </GoogleMapReact>
    </MapContainer>
  );
};

export default Map;
