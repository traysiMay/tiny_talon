import React, { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "./SMILE.json";

const SmallSmile = ({ height = 200 }) => {
  useEffect(() => {
    document
      .getElementsByTagName("svg")[0]
      .setAttribute("viewBox", "-30 -200 1080 1080");
  }, []);
  return (
    <div style={{ height }}>
      <Lottie options={{ loop: true, autoplay: true, animationData }} />
    </div>
  );
};

export default SmallSmile;
