import "./WeatherCard.css";

const weatherOptions = [
  { url: require("../images/day/clear.svg").default, day: true, type: "clear" },
  {
    url: require("../images/day/clouds.svg").default,
    day: true,
    type: "clouds",
  },
  { url: require("../images/day/fog.svg").default, day: true, type: "fog" },
  { url: require("../images/day/rain.svg").default, day: true, type: "rain" },
  { url: require("../images/day/snow.svg").default, day: true, type: "snow" },
  { url: require("../images/day/storm.svg").default, day: true, type: "storm" },
  {
    url: require("../images/night/clear.svg").default,
    day: false,
    type: "clear",
  },
  {
    url: require("../images/night/clouds.svg").default,
    day: false,
    type: "clouds",
  },
  { url: require("../images/night/fog.svg").default, day: false, type: "fog" },
  {
    url: require("../images/night/rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../images/night/snow.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../images/night/storm.svg").default,
    day: false,
    type: "storm",
  },
];

const WeatherCard = ({ day, type }) => {
  console.log("Weather Card");
  const imgSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imgSrcUrl = imgSrc[0].url || "";
  console.log(imgSrcUrl);

  return (
    <section className="weather_card" id="weather">
      <div className="weather_card-info">63F</div>
      <div>
        <img className="weather_card-image" src={imgSrcUrl} />
      </div>
    </section>
  );
};

export default WeatherCard;
