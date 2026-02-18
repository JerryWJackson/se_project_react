import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  activeModal,
  modalName,
  isOpen,
  closeActiveModal,
  handleLogin,
  setActiveModal,
  isLoading,
  setIsLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleLogin(values.email, values.password);
  };

  const handleToggleModal = () => {
    const modalName = "register";
    setActiveModal(modalName);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      modalName={modalName}
      isOpen={isOpen}
      buttonText={isLoading ? "..." : "Next"}
      title="Log In"
      onSubmit={handleSubmit}
      logIn={true}
      altButton={true}
      altButtonText="or Register"
      handleAltButton={handleToggleModal}
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
        />
      </label>
    </ModalWithForm>
  );
};

LoginModal.propTypes = {
  activeModal: PropTypes.string,
  modalName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeActiveModal: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setActiveModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};

export default LoginModal;
