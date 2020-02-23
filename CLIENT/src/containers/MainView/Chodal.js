import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";

const ModalMessage = styled.div`
  margin: auto;
  background: ${props => props.background};
  width: 60%;
  display: block;
  padding: 1rem;
  max-height: ${props => `${props.maxHeight}px`};
  overflow: hidden;
  transition: max-height 1s, background 1s;
`;

const Chodal = ({ history, match }) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [background, setBackground] = useState("red");
  useEffect(() => {
    setMaxHeight(1000);
  }, []);

  return (
    <Modal
      onClick={() => {
        setBackground("white");
        setMaxHeight(0);
        setTimeout(() => history.goBack(), 1000);
      }}
    >
      <ModalMessage background={background} maxHeight={maxHeight}>
        {match.params.marker}
      </ModalMessage>
    </Modal>
  );
};
export default Chodal;
