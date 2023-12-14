export const weatherOptions = [
  {
    url: require("../images/day/clear.svg").default,
    day: true,
    weather: "clear",
  },
  {
    url: require("../images/day/clouds.svg").default,
    day: true,
    weather: "clouds",
  },
  {
    url: require("../images/day/fog.svg").default,
    day: true,
    weather: "fog",
  },
  {
    url: require("../images/day/rain.svg").default,
    day: true,
    weather: "rain",
  },
  {
    url: require("../images/day/snow.svg").default,
    day: true,
    weather: "snow",
  },
  {
    url: require("../images/day/storm.svg").default,
    day: true,
    weather: "storm",
  },
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
  {
    url: require("../images/night/fog.svg").default,
    day: false,
    weather: "fog",
  },
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

const apiKey = "d4f7aaf277abe33386f84dc212a69e83";
const latitude = 30.37522;
const longitude = -97.71174;
const units = "Imperial";

export const endpointUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

export const baseUrl = "http://localhost:3001/items";
export const defaultHeaders = { "Content-Type": "application/json" };
