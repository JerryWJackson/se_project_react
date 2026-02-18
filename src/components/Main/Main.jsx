import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import { UserPreferencesContext } from "../../contexts/UserPreferencesContext";
import { ModalContext } from "../../contexts/ModalContext";
import PropTypes from "prop-types";

function Main({ day, weather, temp, clothingItems }) {
  const { handleOpenModal } = useContext(ModalContext);
  const { temperatureUnit } = useContext(UserPreferencesContext);
  const currentTemperatureUnit = temperatureUnit;
  const weatherTemp = temp?.[currentTemperatureUnit];
  
  const onSelectCard = (item) => {
    handleOpenModal("previewItem", item);
  };
  const getWeatherType = () => {
    if (temp.F >= 86) {
      return "hot";
    } else if (temp.F >= 66 && temp.F <= 85) {
      return "warm";
    } else if (temp.F <= 65) {
      return "cold";
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
          Today is {weatherTemp}°{currentTemperatureUnit} / You may want to
          wear:
        </p>
        <div className="card_items">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                item={item}
                key={item._id}
                onSelectCard={onSelectCard}
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
};

export default Main;
