import { defaultHeaders, baseUrl } from "./constants";
import { getToken } from "../utils/token";

export function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function makeServerRequest(url, options) {
  return fetch(url, options).then(checkServerResponse);
}

export function fetchAllClothing() {
  return makeServerRequest(`${baseUrl}/items`, {
    headers: defaultHeaders,
  });
}

export function addNewItem(item) {
  return makeServerRequest(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    }),
  });
}

export function deleteItem(id) {
  return makeServerRequest(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function addCardLike(id, token) {
  return makeServerRequest(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(id, token) {
  return makeServerRequest(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
}
