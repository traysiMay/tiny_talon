import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "../styles/styles";
import RaptorMarker from "../markers/RaptorMarker";
import whiteMap from "../styles/whiteMap.json";
import Smiler from "../graphics/Smiler";

const sf = {
  lat: 37.78126372769892,
  lng: -122.41344338335298
};

const pewpew = {
  lat: 40.716323,
  lng: -73.989691
};

const Map = ({
  history,
  hunt,
  mapKey,
  markers,
  markersFound,
  places,
  reset
}) => {
  // const [userLocation, setUserLocation] = useState();
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
  // useEffect(() => {
  //   return () => {
  //     reset();
  //     console.log("WAHT");
  //   };
  // }, []);
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(p => {
  //     const { latitude: lat, longitude: lng } = p.coords;
  //     setUserLocation({ lat, lng });
  //   });
  // }, []);
  console.log(markers);
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
        // defaultCenter={userLocation ? userLocation : places.ppark}
        defaultCenter={sf}
        center={sf}
        defaultZoom={15}
        bootstrapURLKeys={{ key: mapKey }}
        options={{ styles: whiteMap }}
        onChildClick={(id, data) => {
          if (data.found) return;
          history.push(`/map/${hunt}/pop/${id}`);
        }}
      >
        {markers.map((m, i) => {
          return (
            <RaptorMarker
              key={m.id}
              id={m.name + m.id}
              type={m.type}
              found={markersFound.includes(`${m.id}`)}
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
