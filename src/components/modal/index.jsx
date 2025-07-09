import React, { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: null,
    border: "none",
  },
};

export const ModalComponent = ({ isOpen, onRequestClose, children }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsOpen(isOpen);
    }
  }, [isOpen]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};
