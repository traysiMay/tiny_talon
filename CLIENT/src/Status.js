import React from "react";
import { connect } from "react-redux";

const Status = ({ connected, socket, status }) => {
  console.log("status render");
  return <div>{status}</div>;
};

const mapStateToProps = state => state.socket;
export default connect(mapStateToProps)(Status);
