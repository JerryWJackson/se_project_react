import { endpointUrl } from "./constants";

export const getForecastWeather = () => {
  const weatherApi = fetch(endpointUrl).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};


export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = data.weather;
  const conditions = weather && weather[0].main;
  const currentTime = data.dt;
  const misc = data.sys;
  const sunrise = misc && misc.sunrise;
  const sunset = misc&& misc.sunset;
  const weatherData = { temp: Math.ceil(temperature), cond: conditions, time: currentTime, sunrise: sunrise, sunset: sunset}
  console.log(weatherData);
  return weatherData;
}

// const testResponse = {
//   coord: {
//     lon: -97.7117,
//     lat: 30.3752,
//   },
//   weather: [
//     {
//       id: 800,
//       main: "Clear",
//       description: "clear sky",
//       icon: "01n",
//     },
//   ],
//   base: "stations",
//   main: {
//     temp: 55.18,
//     feels_like: 53.6,
//     temp_min: 50.25,
//     temp_max: 58.28,
//     pressure: 1020,
//     humidity: 68,
//   },
//   visibility: 10000,
//   wind: {
//     speed: 8.01,
//     deg: 67,
//     gust: 10,
//   },
//   clouds: {
//     all: 0,
//   },
//   dt: 1701485655,
//   sys: {
//     type: 2,
//     id: 2078494,
//     country: "US",
//     sunrise: 1701436199,
//     sunset: 1701473404,
//   },
//   timezone: -21600,
//   id: 4740584,
//   name: "Wells Branch",
//   cod: 200,
// };

