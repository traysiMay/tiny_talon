import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "../styles/styles";
import RaptorMarker from "../markers/RaptorMarker";
import whiteMap from "../styles/whiteMap.json";
import Smiler from "../graphics/Smiler";

const Map = ({ history, mapKey, markers, places }) => {
  useEffect(() => {
    const startTime = Date.now();
    let frame;
    const animate = () => {
      const diff = Date.now() - startTime;
      try {
        const smiler = document.getElementById("smiler");
        smiler.style.opacity = Math.sin(diff);
        frame = requestAnimationFrame(animate);
      } catch {
        cancelAnimationFrame(frame);
      }
    };

    animate();
  }, [markers]);

  if (markers.length === 0) {
    return (
      <div>
        <Smiler id="smiler" style={{ fill: "red" }} />
      </div>
    );
  }
  return (
    <MapContainer>
      <GoogleMapReact
        defaultCenter={places.ppark}
        defaultZoom={17}
        bootstrapURLKeys={{ key: mapKey }}
        options={{ styles: whiteMap }}
        onChildClick={p => {
          history.push(`/pop/${p}`);
        }}
      >
        {markers.map(m => {
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
