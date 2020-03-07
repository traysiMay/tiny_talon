import React, { Fragment, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { MapContainer, SquareButton } from "../styles/styles";
import RaptorMarker from "../markers/RaptorMarker";
import whiteMap from "../styles/whiteMap.json";
import Smiler from "../graphics/Smiler";
import styled from "styled-components";
import { createMarker } from "../services";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  background: black;
  color: white;
  z-index: 10;
  width: 120px;
  border: 5px white solid;
  padding: 0.5rem;
  opacity: 67%;

  input {
    width: 90%;
    margin: 4px;
    padding: 2px;
  }
`;

const CMap = ({ mapKey, series }) => {
  const [userLocation, setUserLocation] = useState();
  const [marker, setMarker] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    hash: "",
    details: "",
    type: ""
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(p => {
      const { latitude: lat, longitude: lng } = p.coords;
      setUserLocation({ lat, lng });
    });
  }, []);

  const handleChange = e =>
    setInfo({ ...info, [e.target.name]: e.target.value });

  const submitMarker = () => {
    // info.series = series;
    // info.lat = marker.lat;
    // info.lng = marker.lng;
    const payload = { ...info, series, lat: marker.lat, lng: marker.lng };
    createMarker(payload);
  };

  return (
    <MapContainer>
      {!userLocation ? (
        <Smiler id="smiler" style={{ fill: "red" }} />
      ) : (
        <Fragment>
          <Overlay>
            {Object.keys(info).map(i => {
              return (
                <input
                  key={i}
                  placeholder={i}
                  name={i}
                  onChange={handleChange}
                />
              );
            })}
            <SquareButton onClick={submitMarker}>submit</SquareButton>
          </Overlay>
          <GoogleMapReact
            defaultCenter={userLocation}
            defaultZoom={17}
            bootstrapURLKeys={{ key: mapKey }}
            options={{ styles: whiteMap }}
            onClick={e => {
              const marker = {
                key: "frog",
                id: "frog",
                found: false,
                lat: e.lat,
                lng: e.lng
              };
              setMarker(marker);
            }}
            onChildClick={(e, p) => {
              console.log(e);
            }}
          >
            <RaptorMarker
              key={marker.hash}
              id={marker.hash}
              found={marker.found}
              lat={marker.lat}
              lng={marker.lng}
            />
          </GoogleMapReact>
        </Fragment>
      )}
    </MapContainer>
  );
};

export default CMap;
