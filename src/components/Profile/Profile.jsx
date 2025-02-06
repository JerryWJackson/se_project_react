import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";
import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = ({
  currentUser,
  isLoggedIn,
  clothingItems,
  handleOpenModal,
  handleCloseModal,
  onCreateModal,
  activeModal,
  isOpen,
  onAddItem,
  onDeleteItem,
  onSelectCard,
  handleUpdateUser,
  onSignOut,
  temp,
}) => {
  // useEffect(() => {
  //   if (currentUser) {
  //     setName(currentUser.name || "");
  //     setAvatarUrl(currentUser.avatar || "");
  //   }
  // }, [isOpen, currentUser]);

  return (
    <div className="profile__container">
      <SideBar
        handleUpdateUser={handleUpdateUser}
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
        handleOpenModal={handleOpenModal("edit")}
      />
      <ClothesSection
        currentUser={PassCurrentUserProvider?.currentUser}
        clothingItems={clothingItems}
        handleCloseModal={handleCloseModal}
        onCreateModal={onCreateModal}
        items={clothingItems.filter(
          (card) => card.owner === PassCurrentUserProvider?.currentUser._id
        )}
        onSelectCard={onSelectCard}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
        temp={temp}
      />
      <AddItemModal
        modalName="addItem"
        activeModal={activeModal}
        isOpen={isOpen}
        closeActiveModal={handleCloseModal}
        onAddItem={onAddItem}
      />
      <EditProfileModal
        modalName="edit"
        activeModal={activeModal}
        closeActiveModal={handleCloseModal}
        handleUpdateUser={handleUpdateUser}
        handleOpenConfirmationModal={() => handleOpenModal("confirm")}
      />
      <ItemModal
        selectedCard={onSelectCard}
        name="previewItem"
        onClose={handleCloseModal}
        handleOpenConfirmationModal={() => handleOpenModal("confirm")}
      />
    </div>
  );
};

export default Profile;
