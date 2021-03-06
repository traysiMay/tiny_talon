import React, { useState, useEffect } from "react";
import Raptor from "../graphics/Raptor";
const K_SIZE = 70;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  //   border: "5px solid #f44336",
  borderRadius: K_SIZE,
  // backgroundColor: "white",
  textAlign: "center",
  color: "#3f51b5",
  fontSize: 16,
  fontWeight: "bold",
  //   padding: 4,
  cursor: "pointer",
  userSelect: "none"
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle
  //   border: "5px solid #3f51b5",
  //   color: "#f44336"
};

const RaptorMarker = ({ found, r = 200, g = 0, b = 0 }) => {
  const [bg, setBg] = useState(`rgb(${r},${g},${b})`);
  useEffect(() => {
    const startTime = Date.now();
    let frame;
    const animate = () => {
      const diff = Date.now() - startTime;
      const r = 200 + 40 * Math.sin(diff * 0.01);
      const color = `rgb(${Math.floor(r)},${g},${b})`;
      setBg(color);
      if (!found) {
        frame = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(frame);
      }
    };
    animate();
    return () => cancelAnimationFrame(frame);
    //eslint-disable-next-line
  }, [found]);
  return (
    <div style={greatPlaceStyleHover} onPointerDown={console.log}>
      <Raptor
        bg={found ? "#7ffdcb" : bg}
        fill={`${found ? "#FF0000" : "#FFFFFF"}`}
      />
    </div>
  );
};

export default RaptorMarker;
