import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import { useContext } from "react";
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
  onAddItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  temp: PropTypes.object,
};

export default Profile;
