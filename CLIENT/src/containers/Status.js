import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GET_MARKERS } from "../actions";

const Status = ({ getMarkers, hunt, status }) => {
  const [focus, setFocus] = useState(false);

  const toggleFocus = () => {
    setFocus(!focus);
  };
  useEffect(() => {
    window.addEventListener("focus", toggleFocus, false);
    window.addEventListener("blur", toggleFocus, false);
    return () => {
      window.removeEventListener("focus", toggleFocus, false);
      window.removeEventListener("blur", toggleFocus, false);
    };
  }, [toggleFocus]);

  // this could do some sort of reselect
  useEffect(() => {
    if (focus) {
      getMarkers(hunt);
    }
    // eslint-disable-next-line
  }, [focus]);

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
