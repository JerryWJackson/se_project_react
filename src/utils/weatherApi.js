import { endpointUrl } from "./constants";

export const getForecastWeather = () => {
  const weatherApi = fetch(endpointUrl).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }).then((data) => {
    return parseWeatherData(data);
  })
  return weatherApi;
};


const parseWeatherData = (data) => {
  const location = data.name
  const main = data.main;
  const temperature = main && main.temp;
  const weather = data.weather;
  const conditions = weather && weather[0].main;
  const currentTime = data.dt;
  const misc = data.sys;
  const sunrise = misc && misc.sunrise;
  const sunset = misc && misc.sunset;
  const weatherData = { location: location, temp: Math.ceil(temperature), cond: conditions.toLowerCase(), time: currentTime, sunrise: sunrise, sunset: sunset};
  console.log(weatherData);
  return weatherData;
}
