import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { emit, listenTo } from "../actions";
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

const Message = styled.div`
  color: white;
  font-size: 1.6rem;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  width: 70%;
  margin: auto;
`;
//  1 connects socket
// listens for the response
// sends the code
// shows response

const Scan = ({
  connected,
  listenToCodeResponse,
  match,
  message,
  sendCode
}) => {
  const scanTainer = useRef();
  const raptorRef = useRef();
  const myRe = new RegExp(process.env.REACT_APP_REG);
  const meepo = myRe.exec(match.params.code);

  useEffect(() => {
    if (!meepo) {
      const {
        params: { code }
      } = match;
      sendCode(code);
    }
  }, []);

  useEffect(() => {
    const text = scanTainer.current;
    const raptor = raptorRef.current;
    raptor.style.margin = "-41px 0 -14px";
    const startTime = Date.now();
    const scale = chroma.scale(["black", "red"]);
    let frame;
    let counter = 0;
    const animate = () => {
      if (message) {
        counter++;
        if (counter > 100) {
          cancelAnimationFrame(frame);
          raptor.getElementsByTagName("path")[1].style.fill = "#67ff67";
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

  useEffect(() => {
    if (!connected) return;
    listenToCodeResponse();
  }, [connected]);

  return (
    <div>
      {!meepo ? (
        <div>
          <ScanContainer ref={scanTainer}>Scaned...</ScanContainer>
          <Raptor reff={raptorRef} />
          <Message>{message}</Message>
        </div>
      ) : (
        <ScanContainer ref={scanTainer}>
          This is not a valid request for reasons I cannot explain :)
        </ScanContainer>
      )}
    </div>
  );
};

const mapStatToProps = state => state.socket;

const mapDispatchToProps = dispatch => ({
  sendCode: code => dispatch(emit("code", code)),
  listenToCodeResponse: () => dispatch(listenTo("code_response"))
});

export default connect(mapStatToProps, mapDispatchToProps)(Scan);
