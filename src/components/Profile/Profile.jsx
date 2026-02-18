import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { useEffect, useState, useContext } from "react";
import "./Profile.css";
import PropTypes from "prop-types";
import { ModalContext } from "../../contexts/ModalContext";

const Profile = ({
  currentUser,
  isLoggedIn,
  clothingItems,
  onAddItem,
  onDeleteItem,
  handleUpdateUser,
  onSignOut,
  temp,
}) => {
  const { activeModal, handleOpenModal, handleCloseModal, modalPayload } = useContext(ModalContext);

  const onCreateModal = () => handleOpenModal("addItem");
  const onSelectCard = (item) => handleOpenModal("previewItem", item);
  const onEditProfile = () => handleOpenModal("editProfile");

  return (
    <div className="profile__container">
      <SideBar
        handleUpdateUser={onEditProfile}
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
      />
      <ClothesSection
        currentUser={currentUser}
        items={clothingItems}
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        temp={temp}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  onCreateModal: PropTypes.func.isRequired,
  activeModal: PropTypes.string,
  isOpen: PropTypes.bool,
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onSelectCard: PropTypes.func,
  handleUpdateUser: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  temp: PropTypes.object,
};

export default Profile;
