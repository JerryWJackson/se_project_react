import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import './Profile.css';

function Profile({ handleCloseModal, onCreateModal, onAddItem, onSelectCard }) {
  return (
    <div className="profile__container">
      <SideBar />
      <ClothesSection handleCloseModal={handleCloseModal} onCreateModal={onCreateModal} onAddItem={onAddItem} onSelectCard={onSelectCard} />
    </div>
  );
}

export default Profile;
