import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onClose,
  activeModal,
  onSubmitButtonClick,
  onSecondButtonClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitButtonClick({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      name="signup"
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      activeModal={activeModal}
      onSecondButtonClick={onSecondButtonClick}
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
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          placeholder="Password"
          name="Password"
          value={password}
          onChange={handlePassword}
          minLength="1"
          maxLength="30"
        />
      </label>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={handleName}
        />
      </label>

      <label className="modal__bottomlabel">
        Avatar
        <input
          className="modal__input"
          type="url"
          placeholder="Avatar"
          name="Avatar"
          value={avatar}
          onChange={handleAvatar}
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
