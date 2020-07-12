import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
import styled from "styled-components";
import { Input, Button } from "../../styles/styles";
import { emit } from "../../actions";

const ModalMessage = styled.div`
  margin: auto;
  background: ${(props) => props.background};
  width: 80%;
  display: block;
  padding: 1rem;
  max-height: ${(props) => `${props.maxHeight}px`};
  overflow: hidden;
  transition: max-height 1s, background 1s;
  font-size: ${window.innerWidth > 600 ? "40px" : "1.5rem"};
`;

const Chodal = ({ history, markers, match, sendCode }) => {
  const [maxHeight, setMaxHeight] = useState(1);
  const [background, setBackground] = useState("red");
  const [input, setInput] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setMaxHeight(1000);
    inputRef.current.focus();
  }, []);

  const m = markers.find((m) => m.id === parseInt(match.params.marker));
  if (!m) {
    history.goBack();
    window.location = "/map/" + window.location.pathname.split("/")[2];
  }

  const handleChange = (e) => setInput(e.target.value);

  const keyPressed = (e) => {
    if (e.key === "Enter") sendIt();
  };

  const sendIt = () => {
    const inputClean = input.replace(/\s/g, "").toLowerCase();
    sendCode({ input: inputClean, id: m.id });
    retract();
  };

  const retract = () => {
    setBackground("white");
    setMaxHeight(0);
    setTimeout(() => history.goBack(), 1000);
  };

  if (m.length === 0) return <div>wtf</div>;
  return (
    <Modal
      onClick={(e) => {
        if (e.target.id === "modal-container") {
          retract();
        }
      }}
    >
      <ModalMessage
        id="message-container"
        background={background}
        maxHeight={maxHeight}
      >
        <div style={{ pointerEvents: "none", textAlign: "center" }}>
          {m.description}
        </div>
        {m.type.includes("input") && (
          <div>
            <Input
              ref={inputRef}
              onChange={handleChange}
              onKeyPress={keyPressed}
              style={{ margin: "1.6rem auto 2.4rem", display: "block" }}
            />
            <Button
              onClick={sendIt}
              style={{ margin: "2rem auto 1.4rem", display: "block" }}
            >
              SEND IT
            </Button>
          </div>
        )}
      </ModalMessage>
    </Modal>
  );
};
const mapStateToProps = ({ map: { markers } }) => ({ markers });
const mapDispatchToProps = (dispatch) => ({
  sendCode: (code) => dispatch(emit("code", { code })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chodal);
