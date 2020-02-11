import React from "react";
import { connect } from "react-redux";
import MapView from "./MapView";
import Status from "../Status";

const MainView = () => {
  return (
    <div>
      <Status />
      <MapView />
    </div>
  );
};

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
