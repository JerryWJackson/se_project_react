import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  onClose,
  activeModal,
  onSecondButtonClick,
  onSubmitButtonClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitButtonClick({ email, password });
  };
  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      name="login"
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onSubmitButtonClick={onSubmitButtonClick}
      onSecondButtonClick={onSecondButtonClick}
      activeModal={activeModal}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
      </label>
      <label className="modal__bottomlabel">
        Password
        <input
          className="modal__input"
          type="password"
          placeholder="Password"
          name="Password"
          value={password}
          onChange={handlePassword}
        />
      </label>
    </ModalWithForm>
  );
};
export default LoginModal;