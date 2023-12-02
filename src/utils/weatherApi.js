import { endpointUrl } from './constants';

console.log(endpointUrl);

export const getForecastWeather = () => {
  const weatherApi = fetch(endpointUrl).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  })
}
