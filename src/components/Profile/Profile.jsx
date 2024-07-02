import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useEffect } from "react";
import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";
import "./Profile.css";

const Profile = ({
  isLoggedIn,
  clothingItems,
  handleOpenModal,
  handleCloseModal,
  onCreateModal,
  activeModal,
  onAddItem,
  onDeleteItem,
  onSelectCard,
  onEditUser,
  onSignOut,
}) => {
  return (
    <div className="profile__container">
      <SideBar
        onEditUser={onEditUser}
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
        handleOpenModal={handleOpenModal}
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
      />
      <EditProfileModal
        isOpen={activeModal === "edit"}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Profile;
