import React, { useState } from "react";
import { connect } from "react-redux";
import CMap from "../components/CMap";
import Logout from "../components/Logout";
import { logOut } from "../actions";
import Series from "../components/Series";
import Hunt from "../components/Hunt";

const SERIES = "series";
const MAP = "MAP";

const Creator = ({ logout, mapKey }) => {
  const [scene, setScene] = useState(SERIES);
  const [selectedSeries, setSelectedSeries] = useState();
  return (
    <div>
      {selectedSeries}
      <Logout logout={logout} />
      {scene === SERIES && (
        <div>
          <Hunt />
          <Series setScene={setScene} setSelectedSeries={setSelectedSeries} />
        </div>
      )}
      {scene === MAP && <CMap mapKey={mapKey} series={selectedSeries} />}
    </div>
  );
};

const mapStateToProps = ({ map: { mapKey } }) => ({
  mapKey
});
const mapDipstachToProps = dispatch => ({
  logout: () => dispatch(logOut()),
  dispatch
});

export default connect(mapStateToProps, mapDipstachToProps)(Creator);
