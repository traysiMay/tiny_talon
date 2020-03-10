import React, { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../animations/SMILE.json";
import styled from "styled-components";

const H1 = styled.h1`
  text-align: center;
  font-size: 4rem;
`;

const Paragraph = styled.div`
  margin: 0 10%;
  font-size: 2rem;
`;

const WinView = ({ name }) => {
  console.log(name);

  useEffect(() => {
    document
      .getElementsByTagName("svg")[0]
      .setAttribute("viewBox", "0 -200 1080 1080");
  }, []);
  return (
    <div>
      <div style={{ height: 200 }}>
        <Lottie options={{ loop: true, autoplay: true, animationData }} />
      </div>
      <H1>Yay!</H1>
      <Paragraph>You have completed hunt</Paragraph>
      <div
        style={{ textAlign: "center", margin: "1rem 0 4rem", fontSize: "4rem" }}
      >
        {name}
      </div>
      <Paragraph>Hope it was fun!</Paragraph>
    </div>
  );
};
export default WinView;
