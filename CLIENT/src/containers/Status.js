import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GET_MARKERS } from "../actions";

const Status = ({ getMarkers, hunt, status }) => {
  const [focus, setFocus] = useState("lala");

  useEffect(() => {
    window.addEventListener("focus", () => setFocus("focus"));
    window.addEventListener("blur", () => setFocus("nofucs"));
  }, []);

  // this could do some sort of reselect
  useEffect(() => {
    if (focus === "focus") {
      getMarkers(hunt);
    }
  }, [focus, getMarkers]);

  return (
    <div style={{ display: "none" }}>
      {status}-{focus}
    </div>
  );
};

const mapStateToProps = state => state.socket;
const mapDispatchToProps = dispatch => ({
  getMarkers: hunt => dispatch({ type: GET_MARKERS, hunt })
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);
