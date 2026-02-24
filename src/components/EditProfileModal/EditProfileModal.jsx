import React, { useContext, useEffect } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PropTypes from "prop-types";
import { useForm } from "../../hooks/useForm";

const EditProfileModal = ({ isOpen, closeActiveModal, handleUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values);
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      modalName="edit-profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title="Edit Profile"
      buttonText="Save"
      name="edit-profile"
    >
      <label className="modal__label">
        Name:
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL:
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeActiveModal: PropTypes.func.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
};

export default EditProfileModal;
