import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
  handleUpdateUser,
  onSignOut,
  temp,
}) => {
  return (
    <div className="profile__container">
      <SideBar
        handleUpdateUser={handleUpdateUser}
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
        temp={temp}
      />
      <EditProfileModal
        isOpen={activeModal === "edit"}
        modalName={modalName}
        closeActiveModal={handleCloseModal}
        onEditProfile={handleUpdateUser}
      />
    </div>
  );
};

export default Profile;
