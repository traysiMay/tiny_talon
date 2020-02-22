import React, { useRef } from "react";
import { DEVICE_NOT_REGISTERED } from "../statuses";
import { Button, Input } from "../styles/styles";
import { newToken, registerDevice } from "../actions";
import { connect } from "react-redux";
import Raptor from "../graphics/Raptor";

const Registration = ({ getToken, hash, registerDevice, status, token }) => {
  const email = useRef();
  console.log("registrations", hash, token, status);
  // if (!hash)
  return (
    <div>
      <Raptor fill={"red"} />
    </div>
  );

  if (status === DEVICE_NOT_REGISTERED) {
    const handleChange = e => (email.current = e.target.value);
    return (
      <div>
        <Input onChange={handleChange} name="email" placeholder="email"></Input>
        <Button onClick={() => registerDevice(email.current)}>
          Register Device
        </Button>
      </div>
    );
  }

  if (!token) {
    return (
      <div>
        <Button onClick={getToken}>Connect</Button>
      </div>
    );
  }
};

const mapStateToProps = state => state.device;
const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(newToken()),
  registerDevice: email => dispatch(registerDevice(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
