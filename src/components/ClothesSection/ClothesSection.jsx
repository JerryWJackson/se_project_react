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
  temp,
}) => {
  const { temperatureUnit } = useContext(UserPreferencesContext);
  const currentTemp = temp?.[temperatureUnit] || 999;
  
  const weatherType = useMemo(() => {
    if (currentTemp >= 86) {
      return "hot";
    } else if (currentTemp >= 66 && currentTemp <= 85) {
      return "warm";
    } else if (currentTemp <= 65) {
      return "cold";
    }
  }, [currentTemp]);

  const filteredCards = items.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
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

ClothesSection.propTypes = {
  currentUser: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateModal: PropTypes.func.isRequired,
  onSelectCard: PropTypes.func.isRequired,
  temp: PropTypes.number,
};

export default ClothesSection;
