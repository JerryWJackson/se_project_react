import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function Main({ day, weather, temp, onSelectCard, setClothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherTemp = temp?.[currentTemperatureUnit];
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

  const filteredCards = setClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={day} weather={weather} temp={weatherTemp} />
      <section className="card_section" id="card-section">
        <p className="card_section-title">
          Today is {weatherTemp}°{currentTemperatureUnit} / You may want to wear:
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

export default Main;
