import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import chroma from "chroma-js";
import Raptor from "../graphics/Raptor";
import { ScanContainer } from "../styles/styles";

const Container = styled.div`
  height: 100%;
  margin: 1rem;
  background: white;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Message = styled.div`
  color: white;
  font-size: 1.6rem;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  width: 70%;
  margin: auto;
  text-shadow: 4px 4px black;
  box-shadow: 7px 11px black;
  background-color: white;
  border: 1px solid black;
  padding: 1rem;
`;

const Scanning = ({ message, scanTainer }) => {
  const [displayMessage, setMessage] = useState("scanning...");
  const raptorRef = useRef();

  useEffect(() => {
    const text = scanTainer.current;
    const raptor = raptorRef.current;
    raptor.getElementsByTagName("path")[0].style.stroke = "red";
    raptor.getElementsByTagName("path")[0].style.strokeWidth = "21px";
    raptor.style.margin = "-64px 0 -14px";
    const startTime = Date.now();
    const scale = chroma.scale(["black", "red"]);
    let frame;
    let counter = 0;

    const found = () => {
      cancelAnimationFrame(frame);
      text.style.color = "black";
      text.style.background = "white";
      text.style.boxShadow = `13px 16px black`;
    };

    const colorMessage = () => {
      const raptorOutline = raptor.getElementsByTagName("path")[0].style;
      if (message === "you already found this one!") {
        raptorOutline.stroke = "yellow";
      } else if (message === "cool find!") {
        raptorOutline.stroke = "#9dff9d";
      } else {
        raptorOutline.stroke = "red";
      }
    };

    const animate = () => {
      if (message) {
        counter++;
        if (counter > 200) {
          found();
          colorMessage();
          setMessage(message);
          return;
        }
      }
      const diff = Date.now() - startTime;
      const colorWave = 0.5 * (2 + Math.sin(diff * 0.001));
      const bgWave = 0.5 * (1 + Math.cos(diff * 0.001));
      text.style.color = scale(colorWave);
      text.style.background = scale(bgWave);
      text.style.boxShadow = `13px 16px ${scale(colorWave)}`;
      const rotateWave = 180 + 360 * Math.sin(diff * 0.001) * 0.5;
      raptor.style.transform = `rotate(${rotateWave}deg)`;
      document.body.style.background = scale(bgWave * 0.8);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [message]);

  return (
    <Container>
      <ScanContainer ref={scanTainer}>
        {displayMessage === "scanning..." ? "Scanning" : "Scanned"}
      </ScanContainer>
      <Raptor reff={raptorRef} />
      <Message>{displayMessage.toUpperCase()}</Message>
    </Container>
  );
};
export default Scanning;
