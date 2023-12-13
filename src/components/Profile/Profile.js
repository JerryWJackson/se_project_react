import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import './Profile.css';

function Profile({ clothingItems, handleCloseModal, onCreateModal, onAddItem, onSelectCard }) {
  return (
    <div className="profile__container">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} handleCloseModal={handleCloseModal} onCreateModal={onCreateModal} onAddItem={onAddItem} onSelectCard={onSelectCard} />
    </div>
  );
}

export default Profile;
