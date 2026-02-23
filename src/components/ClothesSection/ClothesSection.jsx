import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useMemo, useContext } from "react";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";
import PropTypes from "prop-types";

const ClothesSection = ({
  currentUser,
  items,
  onCreateModal,
  onSelectCard,
  onCardLike,
  temp,
}) => {
  const { temperatureUnit } = useContext(UserPreferencesContext);
  const currentTemp = temp?.[temperatureUnit];

  const weatherType = useMemo(() => {
    if (temperatureUnit === "F") {
      if (currentTemp >= 86) return "hot";
      if (currentTemp >= 66 && currentTemp <= 85) return "warm";
      if (currentTemp <= 65) return "cold";
    } else {
      if (currentTemp >= 30) return "hot";
      if (currentTemp >= 19 && currentTemp <= 29) return "warm";
      if (currentTemp <= 18) return "cold";
    }
  }, [currentTemp, temperatureUnit]);

  const filteredCards = items.filter((item) => {
    return (
      item.weather.toLowerCase() === weatherType &&
      String(item.owner) === String(currentUser?._id)
    );
  });

  return (
    <section className="clothesSection">
      <div className="card_section-title">
        <p>Your Items</p>
        <button
          type="button"
          className="card-section__add-Item_button"
          onClick={onCreateModal}
        >
          +Add clothes
        </button>
      </div>
      <div className="card_items">
        {filteredCards.map((item) => {
          return (
            <ItemCard
              item={item}
              key={item._id}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </section>
  );
};

ClothesSection.propTypes = {
  currentUser: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateModal: PropTypes.func.isRequired,
  onSelectCard: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  temp: PropTypes.object,
};

export default ClothesSection;
