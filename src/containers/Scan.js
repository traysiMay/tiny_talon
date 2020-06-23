import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { emit, listenTo } from "../actions";

import Scanning from "../components/Scanning";
import { ScanContainer } from "../styles/styles";

const Scan = ({
  connected,
  codeResponse,
  listenToCodeResponse,
  listenToMarkers,
  listenToWin,
  match,
  sendCode,
  seriesId
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
    listenToMarkers();
  }, [connected, listenToWin, listenToCodeResponse, listenToMarkers]);
  return (
    <div style={{ height: "90%" }}>
      {!meepo ? (
        <Scanning
          scanTainer={scanTainer}
          message={codeResponse}
          seriesId={seriesId}
        />
      ) : (
        <ScanContainer ref={scanTainer}>
          This is not a valid request for reasons I cannot explain :)
        </ScanContainer>
      )}
    </div>
  );
};

const mapStateToProps = ({
  socket: { connected, codeResponse, seriesId }
}) => ({
  connected,
  codeResponse,
  seriesId
});

const mapDispatchToProps = dispatch => ({
  sendCode: code => dispatch(emit("code", code)),
  listenToCodeResponse: () => dispatch(listenTo("code_response")),
  listenToWin: () => dispatch(listenTo("win")),
  listenToMarkers: () => dispatch(listenTo("markers"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
