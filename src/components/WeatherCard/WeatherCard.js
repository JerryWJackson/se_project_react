import "./WeatherCard.css";

const weatherOptions = [
  { url: require("../images/day/clear.svg").default, day: true, weather: "clear" },
  {
    url: require("../images/day/clouds.svg").default,
    day: true,
    weather: "clouds",
  },
  { url: require("../images/day/fog.svg").default, day: true, weather: "fog" },
  { url: require("../images/day/rain.svg").default, day: true, weather: "rain" },
  { url: require("../images/day/snow.svg").default, day: true, weather: "snow" },
  { url: require("../images/day/storm.svg").default, day: true, weather: "storm" },
  {
    url: require("../images/night/clear.svg").default,
    day: false,
    weather: "clear",
  },
  {
    url: require("../images/night/clouds.svg").default,
    day: false,
    weather: "clouds",
  },
  { url: require("../images/night/fog.svg").default, day: false, weather: "fog" },
  {
    url: require("../images/night/rain.svg").default,
    day: false,
    weather: "rain",
  },
  {
    url: require("../images/night/snow.svg").default,
    day: false,
    weather: "snow",
  },
  {
    url: require("../images/night/storm.svg").default,
    day: false,
    weather: "storm",
  },
];

const WeatherCard = ({ day, weather, temp = "" }) => {
  const imgSrc = weatherOptions.filter((i) => {
    return i.day === day && i.weather === weather;
  });
  console.log(imgSrc);

  const imgSrcUrl = imgSrc[0].url || "";
  console.log(imgSrcUrl);

  return (
    <section className="weather_card" id="weather">
      <div className="weather_card-info">{temp}</div>
      <div>
        <img className="weather_card-image" src={imgSrcUrl} alt="weather conditions banner" />
      </div>
    </section>
  );
};

export default WeatherCard;
