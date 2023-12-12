import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function Main({ day, weather, temp, onSelectCard }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // console.log('Current temp is', temp?.[currentTemperatureUnit])
  const weatherTemp = temp?.[currentTemperatureUnit];
  // console.log(weatherTemp + '°' + currentTemperatureUnit);
  const weatherType = useMemo(() => {
    if (temp.F >= 86) {
      return "hot";
    } else if (temp.F >= 66 && temp.F <= 85) {
      return "warm";
    } else if (temp.F <= 65) {
      return "cold";
    }
  }, [temp]);

  const filteredCards = defaultClothingItems.filter((item) => {
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
