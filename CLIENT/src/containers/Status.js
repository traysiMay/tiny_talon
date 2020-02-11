import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GET_MARKERS } from "../actions";

const Status = ({ getMarkers, status }) => {
  const [focus, setFocus] = useState("lala");

  useEffect(() => {
    window.addEventListener("focus", () => setFocus("focus"));
    window.addEventListener("blur", () => setFocus("nofucs"));
  }, []);

  useEffect(() => {
    if (focus === "focus") {
      getMarkers();
    }
  }, [focus, getMarkers]);

  return (
    <div>
      {status}-{focus}
    </div>
  );
};

const mapStateToProps = state => state.socket;
const mapDispatchToProps = dispatch => ({
  getMarkers: () => dispatch({ type: GET_MARKERS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);
