import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useMemo } from "react";
import { PassCurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";

const ClothesSection = ({
  currentUser,
  items,
  onCreateModal,
  onSelectCard,
  temp,
}) => {
  console.log("temp is ", temp);

  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [temp]);

  const filteredCards = items.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  console.log("clothingItems are ", items);
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
        {filteredCards.map((item) => {
          const isOwn = item.owner === currentUser._id;
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
