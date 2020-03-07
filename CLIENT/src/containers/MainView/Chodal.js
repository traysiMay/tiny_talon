import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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

const Chodal = ({ history, markers, match }) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [background, setBackground] = useState("red");
  useEffect(() => {
    setMaxHeight(1000);
  }, []);
  const m = markers.filter(m => m.id === parseInt(match.params.marker));
  if (m.length === 0) return <div>wtf</div>;
  return (
    <Modal
      onClick={() => {
        setBackground("white");
        setMaxHeight(0);
        setTimeout(() => history.goBack(), 1000);
      }}
    >
      <ModalMessage background={background} maxHeight={maxHeight}>
        {m[0].description}
      </ModalMessage>
    </Modal>
  );
};
const mapStateToProps = ({ map: { markers } }) => ({ markers });
export default connect(mapStateToProps)(Chodal);
