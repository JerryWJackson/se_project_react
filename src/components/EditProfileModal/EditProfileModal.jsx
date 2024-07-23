// src/components/EditProfileModal/EditProfileModal.jsx
import React, { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import { TOKEN_KEY } from "../../utils/token";

const EditProfileModal = ({
  modalName,
  activeModal,
  closeActiveModal,
  handleUpdateUser,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  useEffect(() => {
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(name, avatar)
      .then((updatedUser) => {
        // Update the context or handle updated user data here
        console.log("User profile updated:", updatedUser);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      modalName={modalName}
      isOpen={activeModal == modalName}
      onSubmit={handleUpdateUser}
      title="Edit Profile"
      buttonText="Save"
      name="edit-profile"
      formName="edit-profile"
    >
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Avatar URL:
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
