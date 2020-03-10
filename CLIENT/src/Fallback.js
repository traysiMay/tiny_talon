import React, { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "./animations/SMILE.json";
import styled from "styled-components";

const H1 = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin-top: -70px;
`;

const Paragraph = styled.div`
  margin: 0 10%;
  font-size: 2rem;
`;

const WinView = () => {
  return (
    <div>
      <div style={{ height: 400 }}>
        <Lottie options={{ loop: true, autoplay: true, animationData }} />
      </div>
      <H1>hi!</H1>
      <Paragraph>You must go to a valid hunt URL in order to play</Paragraph>
    </div>
  );
};
export default WinView;
