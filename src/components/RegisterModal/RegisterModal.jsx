import React, { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const RegisterModal = ({
  activeModal,
  closeActiveModal,
  onRegistration,
  handleLogin,
  setActiveModal,
  isLoading,
  setIsLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

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
    setIsLoading(true);
    const user = { email, password, name, avatar };
    onRegistration({ user });
    console.log("registered user, now logging in ", user);
    handleLogin(user.email, user.password);
  };

  const handleToggleModal = () => {
    setActiveModal("login");
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [currentUser]);

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      isOpen={activeModal === "register"}
      buttonText={isLoading ? "..." : "Next"}
      name="register"
      title="Sign up"
      onSubmit={handleSubmit}
      altButton={true}
      altButtonText="or Login"
      handleAltButton={handleToggleModal}
    >
      <fieldset className="modal__fieldset">
        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="email"
            placeholder="Email"
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
            name="password"
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
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleName}
          />
        </label>
        <label className="modal__label modal__bottomlabel">
          Avatar
          <input
            className="modal__input"
            type="url"
            placeholder="Avatar"
            name="avatar"
            value={avatar}
            onChange={handleAvatar}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default RegisterModal;
