import React, { useRef, useEffect, useState } from "react";
import { DEVICE_NOT_REGISTERED } from "../statuses";
import { Button, Input, ButtonContainer } from "../styles/styles";
import { newToken, registerDevice } from "../actions";
import { connect } from "react-redux";
import Loading from "../animations/Loading";
import { validateEmail } from "../services/utils";

const Registration = ({ getToken, hash, registerDevice, status, token }) => {
  const [error, setError] = useState("");
  const email = useRef();

  const register = () => {
    if (email.current === "") return;
    if (!validateEmail(email.current)) {
      setError("This email is invalid...");
      return;
    }
    registerDevice(email.current);
  };

  useEffect(() => {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        register();
      }
    });
    // eslint-disable-next-line
  }, []);

  if (!hash) return <Loading />;

  if (status === DEVICE_NOT_REGISTERED) {
    const handleChange = e => (email.current = e.target.value);
    return (
      <ButtonContainer>
        <div>hmm I don't recognize this device...</div>
        <div>please register it to your email</div>
        <Input onChange={handleChange} name="email" placeholder="email" />
        <Button onClick={register}>Register</Button>
        <div style={{ color: "#f36060" }}>{error}</div>
      </ButtonContainer>
    );
  }

  if (!token) {
    return (
      <ButtonContainer>
        <div>oh boy! welcome back :)</div>
        <div>you are looking quite nice today</div>
        <div>press connect below to sync</div>
        <Button onClick={getToken}>Connect</Button>
      </ButtonContainer>
    );
  }
};

const mapStateToProps = state => state.device;
const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(newToken()),
  registerDevice: email => dispatch(registerDevice(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
