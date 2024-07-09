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
      {activeModal === "create" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          modalName="addGarment"
          onAddItem={onAddItem}
        />
      )}
      {activeModal === "edit" && (
        <EditProfileModal
          isOpen={activeModal === "edit"}
          modalName="edit"
          closeActiveModal={handleCloseModal}
          handleUpdateUser={handleUpdateUser}
          handleOpenConfirmationModal={() => handleOpenModal("confirm")}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          name="previewGarment"
          onClose={handleCloseModal}
          handleOpenConfirmationModal={() => handleOpenModal("confirm")}
        />
      )}
    </div>
  );
};

export default Profile;
