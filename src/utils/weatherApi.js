import { endpointUrl } from "./constants";
import { checkServerResponse } from "./api";

export const getForecastWeather = () => {
  const weatherApi = fetch(endpointUrl)
    .then(checkServerResponse)
    .then((data) => {
      return parseWeatherData(data);
    });
  return weatherApi;
};

const parseWeatherData = (data) => {
  const location = data.name;
  const main = data.main;
  const temperature = {
    temps: {
      F: Math.round(main.temp),
      C: Math.round(((main.temp - 32) * 5) / 9),
    },
  };
  const weather = data.weather;
  const conditions = weather && weather[0].main;
  const currentTime = data.dt;
  const misc = data.sys;
  const sunrise = misc && misc.sunrise;
  const sunset = misc && misc.sunset;
  const weatherData = {
    location: location,
    temperature: temperature,
    cond: conditions.toLowerCase(),
    time: currentTime,
    sunrise: sunrise,
    sunset: sunset,
  };
  return weatherData;
};
