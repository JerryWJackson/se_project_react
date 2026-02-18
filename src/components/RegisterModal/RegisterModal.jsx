import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  activeModal,
  modalName,
  isOpen,
  closeActiveModal,
  onRegistration,
  onLogin,
  setActiveModal,
  isLoading,
  setIsLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onRegistration({ user: values });
  };

  const handleToggleModal = () => {
    const modalName = "login";
    setActiveModal(modalName);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "", avatar: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      modalName={modalName}
      isOpen={isOpen}
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
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <label className="modal__label">
          Password
          <input
            className="modal__input"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
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
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label className="modal__label modal__bottomlabel">
          Avatar
          <input
            className="modal__input"
            type="url"
            placeholder="Avatar"
            name="avatar"
            value={values.avatar}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

RegisterModal.propTypes = {
  activeModal: PropTypes.string,
  modalName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeActiveModal: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  setActiveModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};

export default RegisterModal;
