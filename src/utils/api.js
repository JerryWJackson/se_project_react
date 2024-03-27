import { defaultHeaders,  baseUrl } from './constants'

export function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function makeServerRequest(url, options) {
  return fetch(url, options).then(checkServerResponse);
}

export function fetchAllClothing() {
  return makeServerRequest(`${baseUrl}/${items}`, {
    headers: defaultHeaders,
  });
}

export function addNewItem(item) {
  return makeServerRequest(baseUrl, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    }),
  });
}

export function deleteItem(id) {
  return makeServerRequest(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
}
