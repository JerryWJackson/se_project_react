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
  handleUpdateUser,
  onSignOut,
  onCardLike,
  temp,
}) => {
  const { activeModal, handleOpenModal, handleCloseModal, modalPayload } =
    useContext(ModalContext);

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
        onCardLike={onCardLike}
        temp={temp}
      />
    </div>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  temp: PropTypes.object,
};

export default Profile;
