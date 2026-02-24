import React, { useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  isOpen,
  onClose,
  handleLogin,
  onSecondButtonClick,
  isLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      closeActiveModal={onClose}
      modalName="login"
      isOpen={isOpen}
      buttonText={isLoading ? "..." : "Next"}
      title="Log In"
      onSubmit={handleSubmit}
      logIn={true}
      altButton={true}
      altButtonText="or Register"
      handleAltButton={onSecondButtonClick}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          placeholder="email"
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
          required
        />
      </label>
    </ModalWithForm>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  onSecondButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default LoginModal;
