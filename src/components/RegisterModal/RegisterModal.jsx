import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, onSubmitButtonClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitButtonClick(formData);
  };

  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      name="signup"
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      activeModal={"register"}
      onSecondButtonClick={onSecondButtonClick}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          placeholder="Password"
          name="Password"
          value={formData.password}
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
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__bottomlabel">
        Avatar
        <input
          className="modal__input"
          type="url"
          placeholder="Avatar"
          name="Avatar"
          value={formData.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
