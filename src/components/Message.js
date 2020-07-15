import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 6px;
  z-index: 10;
  left: 10px;
  color: red;
  max-width: 230px;
  font-size: 1.6rem;
  background: black;
  padding: 0.5rem;
  opacity: 0.5;
`;
const Message = ({ children, top }) => {
  return <Container style={{ top }}>{children}</Container>;
};
export default Message;
