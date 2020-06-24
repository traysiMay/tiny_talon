import React, { useEffect, useState } from "react";
import { Button, ButtonContainer } from "../styles/styles";
import Smiler from "../graphics/Smiler";
import { connect } from "react-redux";
import { getSeries, createRsvp, releaseDevice } from "../services";
import { logOut, deviceInit } from "../actions";

const Rsvp = ({ deviceAuth, email, logout, match }) => {
  const [seriesName, setSeriesName] = useState("");
  const rsvp = () => {
    createRsvp(match.params.seriesId).then(console.log);
  };
  const handleClick = () => {
    releaseDevice().then((data) => {
      if (data.success) {
        logout();
        // forcing the state to barf at auth
        deviceAuth();
      }
    });
  };
  const error = "";

  useEffect(() => {
    getSeries(match.params.seriesId).then((data) => {
      setSeriesName(data.name);
    });
  }, []);
  return (
    <ButtonContainer>
      <div style={{ borderBottom: "none" }}>
        <Smiler
          style={{
            margin: "0 auto",
            display: "block",
            width: "35%",
          }}
        />
      </div>
      <div>Hello! I have your emails as {email}</div>
      <div>You would like to RSVP for {seriesName}?</div>
      <div
        style={{
          color: "#f36060",
          display: error ? "block" : "none",
          borderBottom: "none",
          margin: "7% auto -8%",
          textAlign: "center",
        }}
      >
        {error}
      </div>
      <Button onClick={rsvp}>Yes</Button>
      <div onClick={handleClick} className="alt-center">
        Sign in using a different email
      </div>
    </ButtonContainer>
  );
};

const mapStateToProps = ({ device: { email } }) => ({ email });
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logOut()),
  deviceAuth: () => dispatch(deviceInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rsvp);
