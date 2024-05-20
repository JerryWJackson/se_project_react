import "./WeatherCard.css";
import { useContext } from "react";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, weather, temp }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const imgSrc = weatherOptions.find((item) => {
    return item.day === day && item.weather === weather;
  });

  console.log("imgSrc is", imgSrc);
  const imgSrcUrl = imgSrc?.url || "";

  return (
    <section className="weather_card" id="weather">
      <div className="weather_card-info">
        {temp}°{currentTemperatureUnit}
      </div>
      <div>
        <img
          className="weather_card-image"
          src={imgSrcUrl}
          alt="weather conditions banner"
        />
      </div>
    </section>
  );
};

export default WeatherCard;
