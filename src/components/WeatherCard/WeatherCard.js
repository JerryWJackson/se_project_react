import "./WeatherCard.css";
import { weatherOptions } from '../../utils/constants'

const WeatherCard = ({ day, weather, temp }) => {
  console.log(`day is ${day}, weather is ${weather}, temp is ${temp}`)
  const imgSrc = weatherOptions.find((item) => {
    return item.day === day && item.weather === weather;
  });
  console.log('imgSrc', imgSrc);

  const imgSrcUrl = imgSrc?.url || "";

  console.log('imgSrcUrl', imgSrcUrl);

  return (
    <section className="weather_card" id="weather">
      <div className="weather_card-info">{temp}° F</div>
      <div>
        <img className="weather_card-image" src={imgSrcUrl} alt="weather conditions banner" />
      </div>
    </section>
  );
};

export default WeatherCard;