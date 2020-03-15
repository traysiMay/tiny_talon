import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GET_MARKERS } from "../actions";

const Status = ({ getMarkers, hunt, status }) => {
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (focus) {
      getMarkers(hunt);
    }
    const toggleFocus = () => {
      setFocus(!focus);
    };
    window.addEventListener("focus", toggleFocus, false);
    window.addEventListener("blur", toggleFocus, false);
    return () => {
      window.removeEventListener("focus", toggleFocus, false);
      window.removeEventListener("blur", toggleFocus, false);
    };
  }, [focus, getMarkers, hunt]);
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
