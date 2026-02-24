export const weatherOptions = [
  {
    url: new URL("../images/day/clear.svg", import.meta.url).href,
    day: true,
    weather: "clear",
  },
  {
    url: new URL("../images/day/clouds.svg", import.meta.url).href,
    day: true,
    weather: "clouds",
  },
  {
    url: new URL("../images/day/fog.svg", import.meta.url).href,
    day: true,
    weather: "fog",
  },
  {
    // haze has no image so we match fog to it.
    url: new URL("../images/day/fog.svg", import.meta.url).href,
    day: true,
    weather: "haze",
  },
  {
    url: new URL("../images/day/rain.svg", import.meta.url).href,
    day: true,
    weather: "rain",
  },
  {
    url: new URL("../images/day/snow.svg", import.meta.url).href,
    day: true,
    weather: "snow",
  },
  {
    url: new URL("../images/day/storm.svg", import.meta.url).href,
    day: true,
    weather: "storm",
  },
  {
    url: new URL("../images/night/clear.svg", import.meta.url).href,
    day: false,
    weather: "clear",
  },
  {
    url: new URL("../images/night/clouds.svg", import.meta.url).href,
    day: false,
    weather: "clouds",
  },
  {
    url: new URL("../images/night/fog.svg", import.meta.url).href,
    day: false,
    weather: "fog",
  },
  {
    url: new URL("../images/night/rain.svg", import.meta.url).href,
    day: false,
    weather: "rain",
  },
  {
    url: new URL("../images/night/snow.svg", import.meta.url).href,
    day: false,
    weather: "snow",
  },
  {
    url: new URL("../images/night/storm.svg", import.meta.url).href,
    day: false,
    weather: "storm",
  },
];

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const latitude = 30.37522;
const longitude = -97.71174;
const units = "Imperial";

export const endpointUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

export const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
