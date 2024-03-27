export const weatherOptions = [
  {
    url: "/se_project_react/src/images/day/clear.svg",
    day: true,
    weather: "clear",
  },
  {
    url: "/se_project_react/src/images/day/clouds.svg",
    day: true,
    weather: "clouds",
  },
  {
    url: "/se_project_react/src/images/day/fog.svg",
    day: true,
    weather: "fog",
  },
  {
    url: "/se_project_react/src/images/day/rain.svg",
    day: true,
    weather: "rain",
  },
  {
    url: "/se_project_react/src/images/day/snow.svg",
    day: true,
    weather: "snow",
  },
  {
    url: "/se_project_react/src/images/day/storm.svg",
    day: true,
    weather: "storm",
  },
  {
    url: "/se_project_react/src/images/night/clear.svg",
    day: false,
    weather: "clear",
  },
  {
    url: "/se_project_react/src/images/night/clouds.svg",
    day: false,
    weather: "clouds",
  },
  {
    url: "/se_project_react/src/images/night/fog.svg",
    day: false,
    weather: "fog",
  },
  {
    url: "/se_project_react/src/images/night/rain.svg",
    day: false,
    weather: "rain",
  },
  {
    url: "/se_project_react/src/images/night/snow.svg",
    day: false,
    weather: "snow",
  },
  {
    url: "/se_project_react/src/images/night/storm.svg",
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
export const BASE_URL = "http://localhost:3000/";
export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
