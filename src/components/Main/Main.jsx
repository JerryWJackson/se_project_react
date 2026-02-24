import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";
import { ModalContext } from "../../contexts/ModalContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PropTypes from "prop-types";

function Main({ day, weather, temp, clothingItems, onCardLike }) {
  const { handleOpenModal } = useContext(ModalContext);
  const { temperatureUnit } = useContext(UserPreferencesContext);
  const currentUser = useContext(CurrentUserContext);
  const currentTemp = temp?.[temperatureUnit];

  const weatherTemp = currentTemp;

  const onSelectCard = (item) => {
    handleOpenModal("previewItem", item);
  };
  const getWeatherType = () => {
    if (temperatureUnit === "F") {
      if (currentTemp >= 86) {
        return "hot";
      } else if (currentTemp >= 66 && currentTemp <= 85) {
        return "warm";
      } else if (currentTemp <= 65) {
        return "cold";
      }
    } else {
      if (currentTemp >= 30) {
        return "hot";
      } else if (currentTemp >= 19 && currentTemp <= 29) {
        return "warm";
      } else if (currentTemp <= 18) {
        return "cold";
      }
    }
  };
  const weatherType = getWeatherType();

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={day} weather={weather} temp={weatherTemp} />
      <section className="card_section" id="card-section">
        <p className="card_section-title">
          Today is {weatherTemp}°{temperatureUnit} / You may want to wear:
        </p>
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
    </main>
  );
}

Main.propTypes = {
  day: PropTypes.bool,
  weather: PropTypes.string,
  temp: PropTypes.object,
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default Main;
