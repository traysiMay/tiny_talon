import React from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "../styles/styles";
import RaptorMarker from "../markers/RaptorMarker";
import whiteMap from "../styles/whiteMap.json";

const Map = ({ history, markers, places }) => {
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
        onChildClick={(e, p) => {
          history.push(`/pop/${p.id}`);
        }}
      >
        {markers.map((m, i) => {
          return (
            <RaptorMarker
              key={m.hash}
              id={m.hash}
              found={m.found}
              lat={m.lat}
              lng={m.lng}
            />
          );
        })}
      </GoogleMapReact>
    </MapContainer>
  );
};

export default Map;
