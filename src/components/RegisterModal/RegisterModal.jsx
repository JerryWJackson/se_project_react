import React, { useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  isOpen,
  onClose,
  onRegistration,
  onSecondButtonClick,
  isLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration({ user: values });
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "", avatar: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      closeActiveModal={onClose}
      modalName="register"
      isOpen={isOpen}
      buttonText={isLoading ? "..." : "Next"}
      name="register"
      title="Sign up"
      onSubmit={handleSubmit}
      altButton={true}
      altButtonText="or Login"
      handleAltButton={onSecondButtonClick}
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
            required
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
            required
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
            required
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
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired,
  onSecondButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default RegisterModal;
