import React, { useEffect, useState } from "react";
import Raptor from "../graphics/Raptor";
import styled from "styled-components";

const Message = styled.div`
  color: red;
  font-size: 54px;
  text-align: center;
  font-family: Arial;
  text-shadow: 4px 3px black;
`;

const Loading = ({ fill = "white", message }) => {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    let frame;
    const startTime = Date.now();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const diff = Date.now() - startTime;
      setOpacity(0.5 * (1.5 + Math.sin(diff * 0.003)));
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div>
      <Raptor opacity={opacity} fill={fill} />
      <Message>{message}</Message>
    </div>
  );
};
export default Loading;
