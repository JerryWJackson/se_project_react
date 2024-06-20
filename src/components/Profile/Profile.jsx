import React, { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile__container">
      <SideBar />
      <div className="profile__items">
        <h3 className="profile__items-your">Your Items</h3>
        {isLoggedIn && (
          <button
            className="profile__button"
            type="button"
            onClick={onCreateModal}
          >
            + Add New
          </button>
        )}
        <button
          className="profile__button"
          type="button"
          onClick={onEditProfile}
        >
          Edit Profile
        </button>
        <button className="profile__button" type="button" onClick={onSignOut}>
          Sign Out
        </button>
      </div>
      <ClothesSection
        currentUser={currentUser}
        clothingItems={clothingItems}
        handleCloseModal={handleCloseModal}
        onCreateModal={onCreateModal}
        items={clothingItems.filter((card) => card.owner === currentUser._id)}
        onSelectCard={onSelectCard}
      />
      <EditProfileModal isOpen={onEditProfile} onClose={handleCloseModal} />
    </div>
  );
}

export default Profile;
