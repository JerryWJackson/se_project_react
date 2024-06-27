import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";
import "./Profile.css";

function Profile({
  isLoggedIn,
  handleCloseModal,
  onCreateModal,
  onEditProfile,
  onAddItem,
  onDeleteItem,
  onSelectCard,
  clothingItems,
  onEditUser,
  onSignOut,
}) {
  return (
    <div className="profile__container">
      <SideBar
        onEditUser={onEditUser}
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
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
      <EditProfileModal isOpen={onEditProfile} onClose={handleCloseModal} />
    </div>
  );
}

export default Profile;
