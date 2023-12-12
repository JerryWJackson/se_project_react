import { endpointUrl } from "./constants";

export const getForecastWeather = () => {
  // const _checkResponse(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   // if the server returns an error, reject the promise
  //   return Promise.reject(`Error: ${res.status}`);
  // }

  // const _request(url, options) {
  //   return await fetch(url, options).then(this._checkResponse);
  // }

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
  // const temperature = main && main.temp;
  // console.log('temp is', temperature);
  const temperature = {temps: {F: Math.round(main.temp), C: Math.round((main.temp -32) * 5/9)}}
  // console.log('temp2 is', temperature);
  const weather = data.weather;
  // console.log('weather is', weather)
  const conditions = weather && weather[0].main;
  const currentTime = data.dt;
  const misc = data.sys;
  const sunrise = misc && misc.sunrise;
  const sunset = misc && misc.sunset;
  const weatherData = { location: location, temperature: temperature, cond: conditions.toLowerCase(), time: currentTime, sunrise: sunrise, sunset: sunset};
  console.log(weatherData);
  return weatherData;
}

// weather.temperature.F = `${Math.round(data.main.temp)}°F`
// weather.temperature.F = `${Math.round((data.main.temp-32) * 5/9)}°C`