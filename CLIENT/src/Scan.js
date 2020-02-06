import React from "react";
import { connect } from "react-redux";
import { emit } from "./actions";

const Scan = ({ match, sendCode }) => {
  const myRe = new RegExp(process.env.REACT_APP_REG);
  const meepo = myRe.exec(match.params.code);
  if (!meepo) {
    const {
      params: { code }
    } = match;
    sendCode(code);
  }
  return (
    <div>
      {meepo ? (
        <div>Scan</div>
      ) : (
        <div>This is not a valid request for reasons I cannot explain :)</div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  sendCode: code => dispatch(emit("code", code))
});

export default connect(null, mapDispatchToProps)(Scan);
