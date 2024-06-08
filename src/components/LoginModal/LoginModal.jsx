import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  activeModal,
  closeActiveModal,
  handleLogin,
  setActivemodal,
  isLoading,
  setIsLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleLogin({ email, password }, setEmail, setPassword);
  };

  const handleOrRegister = () => {
    setActivemodal("register");
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      isOpen={activeModal === "log-in"}
      buttonText={isLoading ? "..." : "Next"}
      title="Log In"
      onSubmit={handleSubmit}
      logIn={true}
      altButton={true}
      altButtonText="or Register"
      handleAltButton={handleOrRegister}
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
