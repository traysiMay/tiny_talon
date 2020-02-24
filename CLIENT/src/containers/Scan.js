import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { emit } from "../actions";
import styled from "styled-components";
import chroma from "chroma-js";
import Raptor from "../graphics/Raptor";

const ScanContainer = styled.div`
  width: 50%;
  margin: 10% auto;
  background: black;
  color: white;
  padding: 10%;
  font-family: Arial;
  font-weight: bold;
  font-size: 3rem;
  box-shadow: 13px 16px #ff0909;
`;

// some sort of socket response for the code

const Scan = ({ match, sendCode }) => {
  const scanTainer = useRef();
  const raptorRef = useRef();

  const myRe = new RegExp(process.env.REACT_APP_REG);
  const meepo = myRe.exec(match.params.code);
  if (!meepo) {
    const {
      params: { code }
    } = match;
    sendCode(code);
  }

  useEffect(() => {
    const text = scanTainer.current;
    const raptor = raptorRef.current;
    const startTime = Date.now();
    const scale = chroma.scale(["black", "red"]);
    let frame;
    const animate = () => {
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
  }, []);
  return (
    <div>
      {!meepo ? (
        <div>
          <ScanContainer ref={scanTainer}>Scaned...</ScanContainer>
          <Raptor reff={raptorRef} />
        </div>
      ) : (
        <ScanContainer ref={scanTainer}>
          This is not a valid request for reasons I cannot explain :)
        </ScanContainer>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  sendCode: code => dispatch(emit("code", code))
});

export default connect(null, mapDispatchToProps)(Scan);
