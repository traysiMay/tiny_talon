import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
`;
const Button = styled.button`
  background: black;
  color: white;
  width: 100px;
  height: 47px;
  border: 5px solid white;
  font-family: monospace;
  font-weight: bolder;
  opacity: 67%;
`;

const Logout = ({ logout }) => {
  return (
    <Container onClick={logout}>
      <Button>Logout</Button>
    </Container>
  );
};
export default Logout;
