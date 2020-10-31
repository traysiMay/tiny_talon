import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/NOTREADY.json";
import SmallSmile from "../animations/SmallSmile";
const NotReady = () => {
  return (
    <div
      style={{ display: "grid", gridTemplateRows: "20% 80%", height: "100%" }}
    >
      <SmallSmile height={""} />
      <Lottie options={{ autoplay: true, loop: true, animationData }} />
    </div>
  );
};
export default NotReady;
