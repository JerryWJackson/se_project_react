

export const weatherOptions = [
  {
    url: "/src/images/day/clear.svg",
    day: true,
    weather: "clear",
  },
  {
    url: "/src/images/day/clouds.svg",
    day: true,
    weather: "clouds",
  },
  {
    url: "/src/images/day/fog.svg",
    day: true,
    weather: "fog",
  },
  {
    // haze has no image so we match fog to it.
    url: "/src/images/day/fog.svg",
    day: true,
    weather: "haze",
  },
  {
    url: "/src/images/day/rain.svg",
    day: true,
    weather: "rain",
  },
  {
    url: "/src/images/day/snow.svg",
    day: true,
    weather: "snow",
  },
  {
    url: "/src/images/day/storm.svg",
    day: true,
    weather: "storm",
  },
  {
    url: "/src/images/night/clear.svg",
    day: false,
    weather: "clear",
  },
  {
    url: "/src/images/night/clouds.svg",
    day: false,
    weather: "clouds",
  },
  {
    url: "/src/images/night/fog.svg",
    day: false,
    weather: "fog",
  },
  {
    url: "/src/images/night/rain.svg",
    day: false,
    weather: "rain",
  },
  {
    url: "/src/images/night/snow.svg",
    day: false,
    weather: "snow",
  },
  {
    url: "/src/images/night/storm.svg",
    day: false,
    weather: "storm",
  },
];

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const latitude = 30.37522;
const longitude = -97.71174;
const units = "Imperial";

export const endpointUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

export const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

