import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";

const ClothesSection = ({ clothingItems, onCreateModal, onSelectCard }) => {
  return (
    <section className="clothesSection">
      <div className="card_section-title">
        <p>Your Items</p>
        <button
          type="button"
          className="card-section__add-garment_button"
          onClick={onCreateModal}
        >
          +Add clothes
        </button>
      </div>
      <div className="card_items">
        {clothingItems.map((item) => {
          const isOwn = item.owner === PassCurrentUserProvider.currentUser._id;
          if (isOwn) {
            return (
              <ItemCard
                item={item}
                key={item._id}
                onSelectCard={onSelectCard}
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default ClothesSection;
