import React from "react";
import { createPortal } from "react-dom";

const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.4)",
  color: "#FFF",
  fontSize: "40px"
};
const Modal = ({ children, onClick }) => {
  return createPortal(
    <div id="modal-container" style={modalStyle} onClick={onClick}>
      {children}
    </div>,
    document.getElementById("modal_root")
  );
};

export default Modal;
