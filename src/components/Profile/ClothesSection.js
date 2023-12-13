import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import './ClothesSection.css';

function ClothesSection({ onCreateModal, onSelectCard }) {
  return (
    <section className="clothesSection">
      <div className="card_section-title">
        <p>Your Items</p>
        <button
            type="button"
            className="card-section__avatar_button"
            onClick={onCreateModal}
          >
            +Add clothes
          </button>
      </div>
      <div className="card_items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard item={item} key={item._id} onSelectCard={onSelectCard} />
          );
        })}
      </div>
    </section>
  );
}

export default ClothesSection;
