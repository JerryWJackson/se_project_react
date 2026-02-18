import React, { createContext, useState, useCallback } from "react";

export const ModalContext = createContext({
  activeModal: "",
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  modalPayload: null,
});

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");
  const [modalPayload, setModalPayload] = useState(null);

  const handleOpenModal = useCallback((modal, payload = null) => {
    setActiveModal(modal);
    setModalPayload(payload);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal("");
    setModalPayload(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ activeModal, handleOpenModal, handleCloseModal, modalPayload }}
    >
      {children}
    </ModalContext.Provider>
  );
};
