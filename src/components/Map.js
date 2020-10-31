import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer } from "../styles/styles";
import RaptorMarker from "../markers/RaptorMarker";
import whiteMap from "../styles/whiteMap.json";
import Smiler from "../graphics/Smiler";

const sf = {
  lat: 37.78126372769892,
  lng: -122.41344338335298,
};

const pewpew = {
  lat: 40.716323,
  lng: -73.989691,
};

const ny = {
  lat: 40.703741,
  lng: -73.931124,
};

const la = {
  lat: 34.079952,
  lng: -118.269773,
};

const la2 = {
  lat: 34.041662314344194,
  lng: -118.236226156283,
};

const Map = ({
  history,
  hunt,
  mapKey,
  markers,
  markersFound,
  places,
  reset,
  lat,
  lng,
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

  if (markers.length === 0) {
    return (
      <div>
        <Smiler id="smiler" style={{ fill: "red" }} />
      </div>
    );
  }

  const getCenter = () => {
    switch (hunt) {
      case "3":
        return sf;
      case "4":
        return ny;
      case "5":
        return la;
      case "6":
        return la2;
      default:
        return sf;
    }
  };

  const center =
    lat === "999"
      ? getCenter()
      : { lat: parseFloat(lat), lng: parseFloat(lng) };
  return (
    <MapContainer>
      <GoogleMapReact
        center={center}
        defaultZoom={15}
        bootstrapURLKeys={{ key: mapKey }}
        options={{ styles: whiteMap }}
        onChildClick={(id, data) => {
          if (data.found) {
            return alert("This one has already been found.");
          }
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
