import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { emit, listenTo } from "../actions";

import Scanning from "../components/Scanning";
import { ScanContainer } from "../styles/styles";

//  1 connects socket
// listens for the response
// sends the code
// shows response

const Scan = ({
  connected,
  listenToCodeResponse,
  listenToMarkers,
  listenToWin,
  match,
  message,
  sendCode
}) => {
  const scanTainer = useRef();
  const myRe = new RegExp(process.env.REACT_APP_REG);
  const meepo = myRe.exec(match.params.code);

  useEffect(() => {
    if (!meepo) {
      const {
        params: { code }
      } = match;
      sendCode(code);
    }
  }, [meepo, match, sendCode]);

  useEffect(() => {
    if (!connected) return;
    listenToCodeResponse();
    listenToWin();
    listenToMarkers();
  }, [connected, listenToWin, listenToCodeResponse]);

  return (
    <div style={{ height: "90%" }}>
      {!meepo ? (
        <Scanning scanTainer={scanTainer} message={message} />
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
  listenToCodeResponse: () => dispatch(listenTo("code_response")),
  listenToWin: () => dispatch(listenTo("win")),
  listenToMarkers: () => dispatch(listenTo("markers"))
});

export default connect(mapStatToProps, mapDispatchToProps)(Scan);
