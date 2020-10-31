import React, { useEffect, useState } from "react";
import { Button, ButtonContainer, ThankLine } from "../styles/styles";
import Smiler from "../graphics/Smiler";
import { connect } from "react-redux";
import { getSeries, createRsvp, releaseDevice } from "../services";
import { logOut, deviceInit } from "../actions";

const Rsvp = ({ deviceAuth, email, logout, match }) => {
  const [seriesName, setSeriesName] = useState("");
  const [response, setResponse] = useState("");
  const rsvp = () => {
    createRsvp(match.params.seriesId).then((data) => {
      if (data.success) {
        return setResponse("Thanks for signing up!");
      }
      if (data.error === "already_signed_up") {
        return setResponse("Looks like you are already signed up!");
      }
      if (data.error) {
        return setResponse("Oh dear these seems to be an error :(");
      }
    });
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

  if (response) {
    return (
      <div style={{ borderBottom: "none" }}>
        <Smiler
          style={{
            margin: "0 auto",
            display: "block",
            width: "35%",
          }}
        />
        <ThankLine>{response}</ThankLine>
      </div>
    );
  }
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
      <div>
        Hello! I have your emails as <b>{email}</b>
      </div>
      <div>
        You would like to RSVP for <i>{seriesName}</i>?
      </div>
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
